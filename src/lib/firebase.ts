import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  updateDoc,
  getDocFromServer
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { RsvpGuest } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const currentUser = auth ? auth.currentUser : null;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo: currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  return errInfo;
}

// Check if Firebase is fully configured
export const isFirebaseConfigured = !!(firebaseConfig && firebaseConfig.projectId);

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// CRITICAL: Initialize Firestore with the exact Database ID from firebase-applet-config.json
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Test Firestore Connection on Boot
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore client is offline or connecting...');
    }
    return false;
  }
}

// Run test connection
testConnection().catch(() => {});

// COLLECTION NAME
const COLLECTION_NAME = 'rsvps';

// LOCAL STORAGE FALLBACK HELPERS
const getLocalRsvps = (): RsvpGuest[] => {
  return JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
};

const saveLocalRsvps = (rsvps: RsvpGuest[]) => {
  localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps));
  window.dispatchEvent(new Event('rsvp_database_updated'));
};

const getSeedData = (): RsvpGuest[] => {
  return [
    {
      id: 'rsvp-seed-1',
      fullName: 'Christopher Mwangi',
      phoneNumber: '+254 712 345 678',
      willAttend: 'yes',
      adultsCount: 2,
      childrenCount: 1,
      submittedAt: '2026-08-15T12:30:00.000Z',
      eCardCode: 'JM-26-X83A',
      notes: 'Delighted to celebrate with Jacinta and Maurice!',
    },
    {
      id: 'rsvp-seed-2',
      fullName: 'Mercy Wanjiku',
      phoneNumber: '+254 722 987 654',
      willAttend: 'yes',
      adultsCount: 1,
      childrenCount: 0,
      submittedAt: '2026-08-16T09:15:00.000Z',
      eCardCode: 'JM-26-K92B',
      notes: 'Congratulations! Elegant and classy wear ready.',
    },
    {
      id: 'rsvp-seed-3',
      fullName: 'David Omondi',
      phoneNumber: '+254 733 444 555',
      willAttend: 'no',
      adultsCount: 0,
      childrenCount: 0,
      submittedAt: '2026-08-18T16:45:00.000Z',
      eCardCode: 'JM-26-R15C',
      notes: 'Sending warmest blessings from abroad on your special day.',
    },
  ];
};

/**
 * Clean and normalize phone numbers for deduplication checks
 */
export function normalizePhoneNumber(phone: string): string {
  if (!phone) return '';
  let cleaned = phone.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+254')) {
    cleaned = '0' + cleaned.slice(4);
  } else if (cleaned.startsWith('254')) {
    cleaned = '0' + cleaned.slice(3);
  }
  return cleaned;
}

/**
 * Check if a phone number has already submitted an RSVP
 */
export async function hasPhoneAlreadyRsvped(phone: string): Promise<boolean> {
  const normInput = normalizePhoneNumber(phone);
  if (!normInput || normInput.length < 5) return false;

  const allRsvps = await getRsvps();
  return allRsvps.some((r) => normalizePhoneNumber(r.phoneNumber) === normInput);
}

/**
 * Save or update an RSVP entry in Firestore
 */
export async function saveRsvp(rsvp: RsvpGuest): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, rsvp.id);
    await setDoc(docRef, rsvp);
    // Sync to local as backup cache
    const existing = getLocalRsvps();
    const updated = existing.filter((item) => item.id !== rsvp.id && item.phoneNumber !== rsvp.phoneNumber);
    updated.push(rsvp);
    saveLocalRsvps(updated);
    return;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${rsvp.id}`);
    // Local storage fallback
    const existing = getLocalRsvps();
    const updated = existing.filter((item) => item.id !== rsvp.id && item.phoneNumber !== rsvp.phoneNumber);
    updated.push(rsvp);
    saveLocalRsvps(updated);
  }
}

/**
 * Fetch all RSVPs from Firestore. Auto-seeds initial sample records if empty.
 */
export async function getRsvps(): Promise<RsvpGuest[]> {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('submittedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const rsvps: RsvpGuest[] = [];
    querySnapshot.forEach((docSnap) => {
      rsvps.push(docSnap.data() as RsvpGuest);
    });

    // If Firestore database is brand new and completely empty, auto-seed it with sample RSVP entries
    if (rsvps.length === 0) {
      const seed = getSeedData();
      for (const item of seed) {
        await setDoc(doc(db, COLLECTION_NAME, item.id), item);
        rsvps.push(item);
      }
    }
    return rsvps;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    // Local storage fallback
    let local = getLocalRsvps();
    if (local.length === 0) {
      local = getSeedData();
      saveLocalRsvps(local);
    }
    return local.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  }
}

/**
 * Delete an RSVP entry
 */
export async function deleteRsvp(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
  }

  const existing = getLocalRsvps();
  const updated = existing.filter((item) => item.id !== id);
  saveLocalRsvps(updated);
}

/**
 * Toggle RSVP attendance status or change seat count
 */
export async function updateRsvpStatus(
  id: string, 
  willAttend: 'yes' | 'no', 
  adultsCount: number, 
  childrenCount: number = 0
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      willAttend,
      adultsCount,
      childrenCount,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${COLLECTION_NAME}/${id}`);
  }

  const existing = getLocalRsvps();
  const updated = existing.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        willAttend,
        adultsCount,
        childrenCount,
      };
    }
    return item;
  });
  saveLocalRsvps(updated);
}

/**
 * Real-time RSVP updates subscription using onSnapshot
 */
export function subscribeToRsvps(onUpdate: (rsvps: RsvpGuest[]) => void): () => void {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('submittedAt', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const rsvps: RsvpGuest[] = [];
        snapshot.forEach((docSnap) => {
          rsvps.push(docSnap.data() as RsvpGuest);
        });
        if (rsvps.length > 0) {
          onUpdate(rsvps);
        } else {
          // If Firestore is empty, auto-seed
          getRsvps().then(onUpdate);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, COLLECTION_NAME);
      }
    );
  } catch (e) {
    console.warn('Real-time listener setup failed, using local polling fallback:', e);
  }

  // Local storage listener fallback
  const handleLocalUpdate = () => {
    onUpdate(getLocalRsvps().sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()));
  };

  window.addEventListener('rsvp_database_updated', handleLocalUpdate);
  handleLocalUpdate();

  return () => {
    window.removeEventListener('rsvp_database_updated', handleLocalUpdate);
  };
}
