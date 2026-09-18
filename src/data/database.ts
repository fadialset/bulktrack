const DB_NAME = 'bulktrack-v2';
const DB_VERSION = 1;

export const KV_STORE = 'kv';
export const PHOTO_STORE = 'photos';

let dbPromise: Promise<IDBDatabase> | null = null;

export function openDatabase(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(KV_STORE)) db.createObjectStore(KV_STORE);
      if (!db.objectStoreNames.contains(PHOTO_STORE)) db.createObjectStore(PHOTO_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return dbPromise;
}

function txDone(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export async function kvGet<T>(key: string): Promise<T | undefined> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(KV_STORE, 'readonly');
    const req = tx.objectStore(KV_STORE).get(key);
    req.onsuccess = () => resolve(req.result as T | undefined);
    req.onerror = () => reject(req.error);
  });
}

export async function kvSet(key: string, value: unknown): Promise<void> {
  const db = await openDatabase();
  const tx = db.transaction(KV_STORE, 'readwrite');
  tx.objectStore(KV_STORE).put(value, key);
  await txDone(tx);
}

export async function kvClear(): Promise<void> {
  const db = await openDatabase();
  const tx = db.transaction(KV_STORE, 'readwrite');
  tx.objectStore(KV_STORE).clear();
  await txDone(tx);
}

export async function photoPut(id: string, blob: Blob): Promise<void> {
  const db = await openDatabase();
  const tx = db.transaction(PHOTO_STORE, 'readwrite');
  tx.objectStore(PHOTO_STORE).put(blob, id);
  await txDone(tx);
}

export async function photoGet(id: string): Promise<Blob | undefined> {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PHOTO_STORE, 'readonly');
    const req = tx.objectStore(PHOTO_STORE).get(id);
    req.onsuccess = () => resolve(req.result as Blob | undefined);
    req.onerror = () => reject(req.error);
  });
}

export async function photoDelete(id: string): Promise<void> {
  const db = await openDatabase();
  const tx = db.transaction(PHOTO_STORE, 'readwrite');
  tx.objectStore(PHOTO_STORE).delete(id);
  await txDone(tx);
}

export async function photoClear(): Promise<void> {
  const db = await openDatabase();
  const tx = db.transaction(PHOTO_STORE, 'readwrite');
  tx.objectStore(PHOTO_STORE).clear();
  await txDone(tx);
}

export async function resetDatabase(): Promise<void> {
  if (dbPromise) {
    const db = await dbPromise;
    db.close();
    dbPromise = null;
  }
  await new Promise<void>((resolve, reject) => {
    const req = indexedDB.deleteDatabase(DB_NAME);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
    req.onblocked = () => resolve();
  });
}
