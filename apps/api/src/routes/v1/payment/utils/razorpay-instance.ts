import Razorpay from 'razorpay';
import { APP_SETTINGS } from '../../../../shared/app-settings';

let razorpay = undefined;
if (APP_SETTINGS.RAZORPAY_KEY && APP_SETTINGS.RAZORPAY_SECRET) {
  razorpay = new Razorpay({
    key_id: APP_SETTINGS.RAZORPAY_KEY,
    key_secret: APP_SETTINGS.RAZORPAY_SECRET,
  });
}

export default razorpay;
