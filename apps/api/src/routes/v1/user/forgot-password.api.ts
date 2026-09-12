import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import handler from '../../../shared/async-handler.util';

export default Router().post(
  '/forgot-password',
  handler(async (req, res) => {
    //implement forgot password functionality
    success(res, null, 'success');
  })
);
