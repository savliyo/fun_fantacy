import { Router } from 'express';
import ah from '../../../shared/async-handler.util';
import {
  success,
  unauthorized,
} from '../../../shared/api-response/response-handler';
import { db } from '../../../db/db';
import { eq } from 'drizzle-orm';
import { validate } from '../../../shared/middlewares/validation.middleware';
import { checkPassword } from '../../../shared/password-hash';
import { generateToken } from '../../../shared/jwt/token-utils';
import { TB_menu, TB_user, Z_user } from '../../../../../../libs/mx-schema/src';

export default Router().post(
  '/login',
  validate({ body: Z_user.pick({ email: true, password: true }) }),
  ah(async (req, res) => {
    const user = await db.query.TB_user.findFirst({
      where: eq(TB_user.email, req.body.email),
    });

    if (!user) {
      return unauthorized(res, 'Incorrect credentials');
    }

    if (!checkPassword(req.body.password, user.password)) {
      return unauthorized(res, 'Incorrect credentials');
    }
    const menu = await db.query.TB_menu.findMany({
      where: eq(TB_menu.active, true),
    });
    const token = generateToken({ email: user.email, id: user.id });
    success(res, { token, menu }, 'login success');
  })
);
