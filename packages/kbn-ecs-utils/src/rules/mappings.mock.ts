/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const getEcsMappingsMock = () => ({
  '@timestamp': '2022-03-31T18:48:35.000Z',
  ecs: {
    version: '8.0.0',
  },
  message: 'Test',
  source: {
    address: '10.42.42.42',
    ip: '10.42.42.42',
  },
  destination: {
    address: '10.42.42.42',
    ip: '10.42.42.42',
  },
  client: {
    address: '10.42.42.42',
    ip: '10.42.42.42',
  },
  server: {
    address: '10.42.42.42',
    ip: '10.42.42.42',
  },
});

export const getEcsDomainMappingsMock = () => ({
  '@timestamp': '2022-03-31T18:48:35.000Z',
  ecs: {
    version: '8.0.0',
  },
  source: {
    address: 'host.example.com',
    domain: 'host.example.com',
  },
  destination: {
    address: 'server.example.com',
    domain: 'server.example.com',
  },
});
