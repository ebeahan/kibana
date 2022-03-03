/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

 export interface EcsFieldInfo {
   fieldset: string;
   description?: string;
   name: string;
   type: string;
 }

  export interface EcsValidationResp {
   value: EcsFieldInfo,
   error: string;
   warning: string;
 }

 export interface CandidateField {
   name: string;
   type: string;
 }

 export type EcsFields = Record<string, EcsFieldInfo>;
