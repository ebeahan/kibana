/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  validateIpWithAddr,
  validateMessagePresent,
  validateSrcDstPair,
  validateClientSrcPair,
  validateServerDstPair,
} from './recommended';
import { getEcsMappingsMock } from './mappings.mock';

describe('recommended rule validations', () => {
  let mappings;

  beforeEach(() => {
    mappings = { ...getEcsMappingsMock() };
  });

  test('message field is present', () => {
    const errors = validateMessagePresent(mappings);
    expect(errors).toEqual([]);
  });

  test('message field not present', () => {
    delete mappings.message;
    const errors = validateMessagePresent(mappings);
    expect(errors).toEqual(['message field should be populated']);
  });

  test('destination not present with source object', () => {
    delete mappings.destination;
    const errors = validateSrcDstPair(mappings);
    expect(errors).toEqual(['destination fields should be populated with source fields']);
  });

  test('source not present with destination object', () => {
    delete mappings.source;
    const errors = validateSrcDstPair(mappings);
    expect(errors).toEqual(['source fields should be populated with destination fields']);
  });

  test('source and destination both present', () => {
    const errors = validateSrcDstPair(mappings);
    expect(errors).toEqual([]);
  });

  test('source not present with client', () => {
    delete mappings.source;
    const errors = validateClientSrcPair(mappings);
    expect(errors).toEqual(['source fields should be populated alongside client fields']);
  });

  test('destination not present with server', () => {
    delete mappings.destination;
    const errors = validateServerDstPair(mappings);
    expect(errors).toEqual(['destination fields should be populated alongside server fields']);
  });

  test('source.address without source.ip', () => {
    delete mappings.source.ip;
    const errors = validateIpWithAddr(mappings);
    expect(errors).toEqual(['source.ip expected with source.address']);
  });
});
