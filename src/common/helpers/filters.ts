import { SelectQueryBuilder, ObjectLiteral, WhereExpressionBuilder } from "typeorm";
import { isArray } from 'class-validator';

export function applyExactFilter<T extends ObjectLiteral>(
    qb: SelectQueryBuilder<T>,
    value: string | number | boolean,
    property: string,
    tableName: string
) {
    qb.andWhere(`${tableName}.${property} = :${property}`, {[property]: value});
}

export function applyArrayFilter<T extends ObjectLiteral>(
  qb: SelectQueryBuilder <T> | WhereExpressionBuilder,
  value: number[] | string[],
  property: string,
  tableName: string,
) {
  if (!isArray(value)) value = [value];
  qb.andWhere(`${tableName}.${property} IN (:...${property})`, {
    [property]: value,
  });
}

export const convertBooleanType = (param: string) => {
  let paramReturned: boolean;
  if (param === 'false') {
    paramReturned = false;
  } else {
    paramReturned = true;
  }
  return paramReturned;
};