import {
  and,
  asc,
  between,
  desc,
  eq,
  getTableColumns,
  gt,
  like,
  lt,
  ne,
} from 'drizzle-orm';
import { db } from '../../../db';
import {
  FilterData,
  ListFilters,
} from '../../../../../../../libs/mx-schema/src';
import { expandFilters } from '../../../../../../../libs/helpers/src';

type Options = Omit<ListFilters, 'page'> & { offset: number };

export const getListQueryWithFilters = (schema, options: Options) => {
  const { filters, limit, offset, fields, sort } = options;

  const _columns: any = getTableColumns(schema);
  let columns = _columns;

  if (fields.length) {
    columns = fields.reduce((acc, curr) => {
      if (_columns[curr]) acc[curr] = _columns[curr];
      return acc;
    }, {});
  }

  const query = db.select(columns).from(schema).$dynamic();
  const expandedFilters: FilterData[] = expandFilters(filters);

  const whereCondition: any[] = [];

  // add where conditions
  if (expandedFilters?.length) {
    for (const filter of expandedFilters) {
      const column = schema[filter.field];
      if (filter.condition === 'equals') {
        whereCondition.push(eq(column, filter.value));
      } else if (filter.condition === 'greater than') {
        whereCondition.push(gt(column, filter.value));
      } else if (filter.condition === 'less than') {
        whereCondition.push(lt(column, filter.value));
      } else if (filter.condition === 'not equal') {
        whereCondition.push(ne(column, filter.value));
      } else if (filter.condition === 'contains') {
        whereCondition.push(like(column, `%${filter.value}%`));
      } else if (filter.condition === 'between') {
        const stringValue = filter.value.toString();
        const [value1, value2] = stringValue.includes('-')
          ? stringValue.split('-')
          : [];
        if (value1 && value2) {
          whereCondition.push(between(column, value1, value2));
        }
      }
    }
  }

  const whereConditionLength = whereCondition.length;

  if (whereConditionLength) {
    if (whereConditionLength >= 1) {
      query.where(and(...whereCondition));
    } else {
      query.where(whereCondition[0]);
    }
  }

  // add sort condition
  if (sort?.Asc) {
    query.orderBy(asc(columns[sort.Asc]));
  } else if (sort.Desc) {
    query.orderBy(desc(columns[sort.Desc]));
  }

  // add pagination
  if (limit ?? offset) {
    query.limit(limit).offset(offset);
  }
  return query;
};
