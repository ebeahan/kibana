/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { validateTimestampPresent, validateEcsVersionPresent } from './required';
import { getEcsMappingsMock } from './required.mock';

describe('required rule validations', () => {
  test('@timestamp is present', () => {
    const mappings = { ...getEcsMappingsMock() };
    const errors = validateTimestampPresent(mappings);
    expect(errors).toEqual([]);
  });

  test('@timestamp not present', () => {
    const mappings = { ...getEcsMappingsMock() };
    delete mappings['@timestamp'];
    const errors = validateTimestampPresent(mappings);
    expect(errors).toEqual(['@timestamp field must be populated']);
  });

  test('ecs.version is present', () => {
    const mappings = { ...getEcsMappingsMock() };
    const errors = validateEcsVersionPresent(mappings);
    expect(errors).toEqual([]);
  });

  test('ecs.version not present', () => {
    const mappings = { ...getEcsMappingsMock() };
    delete mappings.ecs.version;
    const errors = validateEcsVersionPresent(mappings);
    expect(errors).toEqual(['ecs.version field must be populated']);
  });
});
