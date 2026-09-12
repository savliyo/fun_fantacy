import { NextFunction, Request, Response } from 'express';
import { getListQueryWithFilters } from './list-filters';
import {
  c_pagination,
  v_list_filters,
} from '../../../../../../../libs/mx-schema/src';

export const listFiltersToQuery = (schema) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const { filters, sort, limit, page, fields } = v_list_filters.parse(
      req.query
    );

    const pagination = c_pagination({
      limit,
      page,
    });

    req.sqlQuery = getListQueryWithFilters(schema, {
      filters,
      sort,
      fields,
      limit: pagination.limit,
      offset: pagination.offset,
    });
    next();
  };
};
