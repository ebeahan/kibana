/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { has } from 'lodash';

import { SchemaFields } from '../../types';

export const validateTimestampPresent = (mapping: SchemaFields): string[] => {
  if (!('@timestamp' in mapping)) {
    return ['@timestamp field must be populated'];
  } else {
    return [];
  }
};

export const validateEcsVersionPresent = (mapping: SchemaFields): string[] => {
  if (!has(mapping, 'ecs.version')) {
    return ['ecs.version field must be populated'];
  } else {
    return [];
  }
};

export const runRequiredRules = (mapping: SchemaFields): string[] => {
  return [...validateTimestampPresent(mapping), ...validateEcsVersionPresent(mapping)];
};
