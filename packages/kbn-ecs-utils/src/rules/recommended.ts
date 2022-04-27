/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { SchemaFields } from '../types';

export const validateMessagePresent = (mapping: SchemaFields): string[] => {
  if (!('message' in mapping)) {
    return ['message field should be populated'];
  } else {
    return [];
  }
};

export const validateSrcDstPair = (mapping: SchemaFields): string[] => {
  if ('source' in mapping) {
    if (!('destination' in mapping)) {
      return ['destination fields should be populated with source fields'];
    }
  } else if ('destination' in mapping) {
    if (!('source' in mapping)) {
      return ['source fields should be populated with destination fields'];
    }
  }
  return [];
};

export const runRecommendedRules = (mapping: SchemaFields): string[] => {
  return [...validateMessagePresent(mapping), ...validateSrcDstPair(mapping)];
};
