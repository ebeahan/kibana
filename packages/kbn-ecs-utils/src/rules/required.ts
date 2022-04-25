/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { get } from 'lodash';

import { SchemaField, SchemaFields } from '../types';

export const validateTimestampPresent = (mapping: SchemaFields): string[] => {
  if (!('@timestamp' in mapping)) {
    return ['@timestamp field must be populated'];
  } else {
    return [];
  }
};

export const validateEcsVersionPresent = (mapping: SchemaFields): string[] => {
  if (!get(mapping, 'ecs.version')) {
    return ['ecs.version field must be populated'];
  } else {
    return [];
  }
};

export const validEcsTypeMapping = (entry: SchemaField, type: string): boolean => {
  return entry?.field === type;
};
