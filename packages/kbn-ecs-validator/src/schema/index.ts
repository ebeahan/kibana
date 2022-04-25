/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ECSSchema } from './v1.12.1';
import { MappedFields, SchemaField } from '../types';

const mappedFields: MappedFields = ECSSchema.map((field: SchemaField) => ({
  [field.field]: field,
}));

export const ECSSchemaOptions = ECSSchema.map((ecs) => ({
  label: ecs.field,
  value: ecs,
}));
