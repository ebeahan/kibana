/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { omit } from 'lodash';

import { validateTimestampPresent, validateEcsVersionPresent, runRequiredRules } from './required';
import { getEcsMappingMock } from './mappings.mock';

describe('required rule validations', () => {
  let mapping;

  beforeEach(() => {
    mapping = { ...getEcsMappingMock() };
  });

  test('@timestamp is present', () => {
    const errors = validateTimestampPresent(mapping);
    expect(errors).toEqual([]);
  });

  test('@timestamp not present', () => {
    delete mapping['@timestamp'];
    const errors = validateTimestampPresent(mapping);
    expect(errors).toEqual(['@timestamp field must be populated']);
  });

  test('ecs.version is present', () => {
    const errors = validateEcsVersionPresent(mapping);
    expect(errors).toEqual([]);
  });

  test('ecs.version not present', () => {
    delete mapping.ecs.version;
    const errors = validateEcsVersionPresent(mapping);
    expect(errors).toEqual(['ecs.version field must be populated']);
  });

  test('run all required validations', () => {
    const incompleteMapping = omit(mapping, ['@timestamp', 'ecs.version']);
    const errors = runRequiredRules(incompleteMapping);
    expect(errors).toEqual([
      '@timestamp field must be populated',
      'ecs.version field must be populated',
    ]);
  });
});
