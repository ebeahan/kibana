/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export interface ComboBoxOption {
  label: string;
  value?: unknown;
}

export type MainType =
  | 'text'
  | 'match_only_text'
  | 'keyword'
  | 'numeric'
  | 'binary'
  | 'boolean'
  | 'range'
  | 'object'
  | 'nested'
  | 'alias'
  | 'completion'
  | 'dense_vector'
  | 'flattened'
  | 'ip'
  | 'join'
  | 'percolator'
  | 'rank_feature'
  | 'rank_features'
  | 'shape'
  | 'search_as_you_type'
  | 'date'
  | 'date_nanos'
  | 'geo_point'
  | 'geo_shape'
  | 'token_count'
  | 'point'
  | 'histogram'
  | 'constant_keyword'
  | 'version'
  | 'wildcard'
  /**
   * 'other' is a special type that only exists inside of MappingsEditor as a placeholder
   * for undocumented field types.
   */
  | 'other';

export type NumericType =
  | 'long'
  | 'integer'
  | 'short'
  | 'byte'
  | 'double'
  | 'float'
  | 'half_float'
  | 'scaled_float';

export type RangeType =
  | 'integer_range'
  | 'float_range'
  | 'long_range'
  | 'ip_range'
  | 'double_range'
  | 'date_range';

export type SubType = NumericType | RangeType;

export type DataType = MainType | SubType;

export type ParameterName =
  | 'name'
  | 'type'
  | 'store'
  | 'index'
  | 'fielddata'
  | 'fielddata_frequency_filter'
  | 'fielddata_frequency_filter_percentage'
  | 'fielddata_frequency_filter_absolute'
  | 'doc_values'
  | 'doc_values_binary'
  | 'coerce'
  | 'coerce_shape'
  | 'ignore_malformed'
  | 'null_value'
  | 'null_value_numeric'
  | 'null_value_boolean'
  | 'null_value_geo_point'
  | 'null_value_ip'
  | 'null_value_point'
  | 'copy_to'
  | 'dynamic'
  | 'dynamic_toggle'
  | 'dynamic_strict'
  | 'enabled'
  | 'boost'
  | 'locale'
  | 'format'
  | 'analyzer'
  | 'search_analyzer'
  | 'search_quote_analyzer'
  | 'index_options'
  | 'index_options_flattened'
  | 'index_options_keyword'
  | 'eager_global_ordinals'
  | 'eager_global_ordinals_join'
  | 'index_prefixes'
  | 'index_phrases'
  | 'positive_score_impact'
  | 'norms'
  | 'norms_keyword'
  | 'term_vector'
  | 'position_increment_gap'
  | 'similarity'
  | 'normalizer'
  | 'ignore_above'
  | 'split_queries_on_whitespace'
  | 'scaling_factor'
  | 'max_input_length'
  | 'preserve_separators'
  | 'preserve_position_increments'
  | 'ignore_z_value'
  | 'enable_position_increments'
  | 'orientation'
  | 'points_only'
  | 'path'
  | 'dims'
  | 'depth_limit'
  | 'relations'
  | 'max_shingle_size'
  | 'value'
  | 'meta';
