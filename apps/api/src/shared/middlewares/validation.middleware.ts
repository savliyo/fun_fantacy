import { RequestHandler } from 'express';
import { ZodIssue, ZodSchema } from 'zod';
import { other } from '../api-response/response-handler';

type RequestValidation<TParams, TQuery, TBody, TFiles, TFile> = {
  params?: ZodSchema<TParams>;
  query?: ZodSchema<TQuery>;
  body?: ZodSchema<any>;
  files?: ZodSchema<TFiles>;
  file?: ZodSchema<TFile>;
};

export const validate: <
  TParams = any,
  TQuery = any,
  TBody = any,
  TFiles = any,
  TFile = any
>(
  _schemas: RequestValidation<TParams, TQuery, TBody, TFiles, TFile>
) => RequestHandler<TParams, any, TBody, TQuery, TFiles> =
  ({ params, query, body, files, file }) =>
  (req, res, next) => {
    const errors: any = [];
    if (params) {
      const parsed = params.safeParse(req.params);
      if (!parsed.success) {
        errors.push({ type: 'Params', errors: flattenError(parsed.error) });
      }
    }
    if (query) {
      const parsed = query.safeParse(req.query);
      if (!parsed.success) {
        errors.push({ type: 'Query', errors: flattenError(parsed.error) });
      }
    }
    if (body) {
      const parsed = body.safeParse(req.body);
      if (!parsed.success) {
        errors.push({
          type: 'Body',
          errors: flattenError(parsed.error),
        });
      }
    }
    // if (files) {
    //   const parsed = files.safeParse(req.files);
    //   if (!parsed.success) {
    //     errors.push({ type: 'Files', errors: parsed.error });
    //   }
    // }

    // if (file) {
    //   const parsed = file.safeParse(req.file);
    //   if (!parsed.success) {
    //     errors.push({ type: 'Files', errors: parsed.error });
    //   }
    // }
    if (errors.length > 0) {
      return other(res, errors);
    }
    return next();
  };

function flattenError(error) {
  return error.flatten((issue: ZodIssue) => ({
    message: issue.message,
    errorCode: issue.code,
  }));
}
