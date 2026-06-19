import {
  createDocument,
  queryCollection
} from '../firebase/firestore.mjs';

import {
  serverTimestamp
} from 'firebase/firestore';

async function recordMatch(uid, entry) {

  return await createDocument(
    'historico',
    {
      uid,
      ...entry,
      createdAt: serverTimestamp()
    }
  );

}

async function getHistory(uid) {

  return await queryCollection(
    'historico',
    'uid',
    '==',
    uid
  );

}

export {
  recordMatch,
  getHistory
};