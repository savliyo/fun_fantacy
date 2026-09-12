import { FilterData } from '../../../mx-schema/src';

export const OPERATOR_PLACEHOLDER = {
  equals: 'eq',
  'greater than': 'gt',
  'less than': 'lt',
  between: 'bt',
  contains: 'lk',
  'not equal': 'ne',
};

export const INPUT_TYPE_PLACEHOLDER = {
  text: 't',
  number: 'n',
  select: 's',
  date: 'd',
};

export const FILTER_SEPERATOR = '|';

export const truncateFilters = (
  filters: FilterData[]
): Record<string, string> => {
  return filters.reduce((acc: Record<string, string>, curr) => {
    acc[curr.field] = `${
      OPERATOR_PLACEHOLDER[curr.condition]
    }${FILTER_SEPERATOR}${curr.value}${FILTER_SEPERATOR}${
      INPUT_TYPE_PLACEHOLDER[curr.type]
    }`;
    return acc;
  }, {});
};
