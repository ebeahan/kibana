/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { validateMessagePresent } from './recommended';
import { getEcsMappingsMock } from './mappings.mock';

describe('recommended rule validations', () => {
  test('message field is present', () => {
    const mappings = { ...getEcsMappingsMock() };
    const errors = validateMessagePresent(mappings);
    expect(errors).toEqual([]);
  });

  test('message field not present', () => {
    const mappings = { ...getEcsMappingsMock() };
    delete mappings.message;
    const errors = validateMessagePresent(mappings);
    expect(errors).toEqual(['message field should be populated']);
  });
});
