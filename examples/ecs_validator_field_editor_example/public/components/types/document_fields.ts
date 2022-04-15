/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { FieldConfig } from '../shared_imports';
import { PARAMETERS_DEFINITION } from '../constants';

export interface ParameterDefinition {
  title?: string;
  description?: JSX.Element | string;
  fieldConfig: FieldConfig<any>;
  schema?: any;
  props?: { [key: string]: ParameterDefinition };
  documentation?: {
    main: string;
    [key: string]: string;
  };
  [key: string]: any;
}

export interface AliasOption {
  id: string;
  label: string;
}
