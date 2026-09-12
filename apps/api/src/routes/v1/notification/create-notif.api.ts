import { Router } from 'express';
import { other, success } from '../../../shared/api-response/response-handler';
import { db } from '../../../db/db';
import {
  TB_customerFcm,
  TB_notification,
  Z_notification_insert,
} from '../../../../../../libs/mx-schema/src';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { firebaseNotificationQueue } from '../../../shared/queue/firebase-notification/firebase-notification.queue';
import { ImageUpload } from '../../../shared/middlewares/multer.middleware';
import { sendFirebaseNotification } from '../../../shared/firebase/notification.fire';

export default Router().post(
  '/create',
  ImageUpload.single('notificationImage'),
  // validate({ body: Z_notification_insert }),
  async (req, res) => {
    const customerTokens = await db.select().from(TB_customerFcm);
    if (!customerTokens.length) {
      return other(res, 'No Customer tokens found');
    }
    const tokens = customerTokens.map((c) => c.token);
    const payload = {
      title: req.body.title,
      body: req.body.body,
    };
    if (req?.file?.filename) {
      payload[
        'image'
      ] = `https://server.funfantasy11.com/static/${req.file.filename}`;
    }

    await sendFirebaseNotification(tokens, payload);

    const results = await db
      .insert(TB_notification)
      .values(payload)
      .returning();
    success(res, results, 'success');
  }
);
