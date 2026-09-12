import admin, { ServiceAccount } from 'firebase-admin';
import {
  BatchResponse,
  MulticastMessage,
  Notification,
} from 'firebase-admin/lib/messaging/messaging-api';
import { FirebaseConfig } from './firebase.config';
import { APP_SETTINGS } from '../app-settings';

const _thresold = 500 as const;

const { FIREBASE_PRIVATE_KEY_ID } = APP_SETTINGS;

if (FIREBASE_PRIVATE_KEY_ID) {
  admin.initializeApp({
    credential: admin.credential.cert(FirebaseConfig as ServiceAccount),
    databaseURL:
      'https://funfantasy-2ae24-default-rtdb.asia-southeast1.firebasedatabase.app',
  });
}

function _sendNotification(message: MulticastMessage): Promise<BatchResponse> {
  return admin.messaging().sendEachForMulticast(message);
}

export const sendFirebaseNotification = (
  tokens: string[],
  payload: Notification
): Promise<BatchResponse> | Promise<BatchResponse[]> | Promise<string> => {
  const _length = tokens.length;
  if (!_length) {
    return Promise.resolve('token array empty');
  }

  //splitting firebase tokens in chunks because firebase can only send message to notification to 1000 devices at once
  if (_length > _thresold) {
    const promises: Promise<BatchResponse>[] = [];
    for (let i = 0; i < _length; i += _thresold) {
      const _token = tokens.slice(i, i + _thresold);
      const promise = _sendNotification({
        notification: payload,
        tokens: _token,
      });
      promises.push(promise);
    }
    return Promise.all(promises);
  }

  return _sendNotification({ notification: payload, tokens });
};
