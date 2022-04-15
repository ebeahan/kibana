/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ComboBoxOption } from '../types';
import { MAIN_DATA_TYPE_DEFINITION } from './data_types_definition';

import { DataType } from '../types';

export const TYPE_ONLY_ALLOWED_AT_ROOT_LEVEL: DataType[] = ['join'];

export const TYPE_NOT_ALLOWED_MULTIFIELD: DataType[] = [
  ...TYPE_ONLY_ALLOWED_AT_ROOT_LEVEL,
  'object',
  'nested',
  'alias',
];

export const FIELD_TYPE_OPTIONS = Object.entries(MAIN_DATA_TYPE_DEFINITION).map(
  ([dataType, { label }]) => ({
    value: dataType,
    label,
  })
) as ComboBoxOption[];
