/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */
import { Discover } from './discover';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createDiscoverDirective(reactDirective: any) {
  return reactDirective(Discover, [
    ['fetch', { watchDepth: 'reference' }],
    ['fetchCounter', { watchDepth: 'reference' }],
    ['fetchError', { watchDepth: 'reference' }],
    ['fieldCounts', { watchDepth: 'reference' }],
    ['histogramData', { watchDepth: 'reference' }],
    ['hits', { watchDepth: 'reference' }],
    ['indexPattern', { watchDepth: 'reference' }],
    ['opts', { watchDepth: 'reference' }],
    ['resetQuery', { watchDepth: 'reference' }],
    ['resultState', { watchDepth: 'reference' }],
    ['fetchStatus', { watchDepth: 'reference' }],
    ['rows', { watchDepth: 'reference' }],
    ['savedSearch', { watchDepth: 'reference' }],
    ['searchSource', { watchDepth: 'reference' }],
    ['showSaveQuery', { watchDepth: 'reference' }],
    ['state', { watchDepth: 'reference' }],
    ['topNavMenu', { watchDepth: 'reference' }],
    ['updateQuery', { watchDepth: 'reference' }],
    ['updateSavedQueryId', { watchDepth: 'reference' }],
    ['unmappedFieldsConfig', { watchDepth: 'value' }],
    ['refreshAppState', { watchDepth: 'reference' }],
  ]);
}
