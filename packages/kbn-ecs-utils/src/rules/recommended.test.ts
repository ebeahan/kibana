/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { omit } from 'lodash';

import {
  runRecommendedRules,
  validateIpWithAddr,
  validateMessagePresent,
  validateSrcDstPair,
  validateClientSrcPair,
  validateServerDstPair,
} from './recommended';
import { getEcsMappingMock } from './mappings.mock';

describe('recommended rule validations', () => {
  let mapping;

  beforeEach(() => {
    mapping = { ...getEcsMappingMock() };
  });

  test('message field is present', () => {
    const errors = validateMessagePresent(mapping);
    expect(errors).toEqual([]);
  });

  test('message field not present', () => {
    delete mapping.message;
    const errors = validateMessagePresent(mapping);
    expect(errors).toEqual(['message field should be populated']);
  });

  test('destination not present with source object', () => {
    delete mapping.destination;
    const errors = validateSrcDstPair(mapping);
    expect(errors).toEqual(['destination fields should be populated with source fields']);
  });

  test('source not present with destination object', () => {
    delete mapping.source;
    const errors = validateSrcDstPair(mapping);
    expect(errors).toEqual(['source fields should be populated with destination fields']);
  });

  test('source and destination both present', () => {
    const errors = validateSrcDstPair(mapping);
    expect(errors).toEqual([]);
  });

  test('source not present with client', () => {
    delete mapping.source;
    const errors = validateClientSrcPair(mapping);
    expect(errors).toEqual(['source fields should be populated alongside client fields']);
  });

  test('destination not present with server', () => {
    delete mapping.destination;
    const errors = validateServerDstPair(mapping);
    expect(errors).toEqual(['destination fields should be populated alongside server fields']);
  });

  test('source.address without source.ip', () => {
    delete mapping.source.ip;
    const errors = validateIpWithAddr(mapping);
    expect(errors).toEqual(['source.ip expected with source.address']);
  });

  test('run all recommended validations', () => {
    const incompleteMapping = omit(mapping, ['message', 'source']);
    const errors = runRecommendedRules(incompleteMapping);
    expect(errors).toEqual([
      'message field should be populated',
      'source fields should be populated with destination fields',
      'source fields should be populated alongside client fields',
    ]);
  });
});
