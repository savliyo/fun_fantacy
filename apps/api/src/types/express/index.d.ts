declare namespace Express {
  export interface Request {
    user: import('../user').UserTokenPayload;
    sqlQuery: any;
  }
}
