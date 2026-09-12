import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import handler from '../../../shared/async-handler.util';
import razorpay from './utils/razorpay-instance';

export default Router().post(
  '/create',
  handler(async (req, res) => {
    const { amount, currency, receipt, offerID } = req.body;

    const order = await razorpay.orders.create({ amount, currency, receipt });

    success(res, order, 'Razorpay order created');
  })
);
