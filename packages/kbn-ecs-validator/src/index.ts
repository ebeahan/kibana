/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import isEmpty from 'lodash/isEmpty';

import { CandidateField, EcsValidationResp } from './types';
import { ecsFields } from './schema';

export const validateEcsField = (
  field: CandidateField,
): EcsValidationResp => {
  const fieldName = field.name;
  const ecsIndex = ecsFields[fieldName] ?? {};
  if (isEmpty(ecsIndex)) {
    return {
      value: ecsIndex,
      error: 'undefined',
      warning: 'none',
    }
  }
  return {
    value: ecsIndex,
    error: 'none',
    warning: 'none',
  };
};

const result = validateEcsField({
  name: 'message',
  type: 'text'
});

console.log(result);
