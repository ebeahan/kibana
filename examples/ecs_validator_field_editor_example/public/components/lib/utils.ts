/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { FieldConfig } from '../shared_imports';
import { ComboBoxOption, ParameterName } from '../types';

import {
  PARAMETERS_DEFINITION,
  TYPE_NOT_ALLOWED_MULTIFIELD,
  TYPE_ONLY_ALLOWED_AT_ROOT_LEVEL,
} from '../constants';

import ECSSchema from '../../common/schemas/ecs/v1.12.1.json';

const mappedFields = ECSSchema.map((field) => ({
  [field.field]: field,
}));

export const ECSSchemaOptions = Object.assign({}, ...mappedFields);

export const validEcsMapping = (field, type) => {
  return field?.[0].value.type === type?.[0].value;
};

export const getFieldConfig = <T = unknown>(
  param: ParameterName,
  prop?: string
): FieldConfig<T> => {
  if (prop !== undefined) {
    if (
      !(PARAMETERS_DEFINITION[param] as any).props ||
      !(PARAMETERS_DEFINITION[param] as any).props[prop]
    ) {
      throw new Error(`No field config found for prop "${prop}" on param "${param}" `);
    }
    return (PARAMETERS_DEFINITION[param] as any).props[prop]?.fieldConfig || {};
  }

  return (PARAMETERS_DEFINITION[param] as any)?.fieldConfig || {};
};

export const filterTypesForMultiField = <T extends string = string>(
  options: ComboBoxOption[]
): ComboBoxOption[] =>
  options.filter(
    (option) => TYPE_NOT_ALLOWED_MULTIFIELD.includes(option.value as MainType) === false
  );

export const filterTypesForNonRootFileds = <T extends string = string>(
  options: ComboBoxOption[]
): ComboBoxOption[] =>
  options.filter(
    (option) => TYPE_ONLY_ALLOWED_AT_ROOT_LEVEL.includes(option.value as MainType) === false
  );
