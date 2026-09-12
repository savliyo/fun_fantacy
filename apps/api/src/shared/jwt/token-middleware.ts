import { unauthorized } from "../api-response/response-handler";
import * as jwt from 'jsonwebtoken';
import { APP_SETTINGS } from "../app-settings";

export const   tokenMiddleWare = (req: any, res: any, next: any) => {
    try {
      const token = req.header('Authorization');

      if (!token) {
        return unauthorized(res, 'Invalid token');
      }
      const decoded: any = jwt.verify(token, APP_SETTINGS.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
        unauthorized(res, 'token expired');
    }
  };
