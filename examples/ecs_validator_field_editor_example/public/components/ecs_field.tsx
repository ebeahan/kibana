/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState, useCallback } from 'react';
import {
  EuiComboBox,
  EuiComboBoxOptionOption,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
} from '@elastic/eui';
import { FieldIcon } from '@kbn/react-field';
import { ECSSchemaOptions } from '@kbn/ecs-validator';

import { DisplayToggles } from './display_toggles';
import { getFieldValidityAndErrorMessage } from '../../../../src/plugins/es_ui_shared/static/forms/hook_form_lib';
import { UseField } from './shared_imports';

const typeMap = {
  binary: 'binary',
  half_float: 'number',
  scaled_float: 'number',
  float: 'number',
  integer: 'number',
  long: 'number',
  short: 'number',
  byte: 'number',
  text: 'string',
  match_only_text: 'string',
  keyword: 'string',
  '': 'string',
  geo_point: 'geo_point',
  date: 'date',
  ip: 'ip',
  boolean: 'boolean',
  constant_keyword: 'string',
};

type ECSSchemaOption = typeof ECSSchemaOptions[0];

const singleSelection = { asPlainText: true };

export const EcsField = () => (
  <UseField<ComboBoxOption[]> path="field">
    {(typeField) => {
      const [options, setOptions] = useState(ECSSchemaOptions);
      const [selectedOptions, setSelected] = useState([]);

      const onChange = (selectedOptions) => {
        setSelected(selectedOptions);
        typeField.setValue(selectedOptions);
      };

      const onCreateOption = (searchValue, flattenedOptions = []) => {
        const normalizedSearchValue = searchValue.trim().toLowerCase();

        if (!normalizedSearchValue) {
          return;
        }

        const newOption = {
          label: searchValue,
        };

        // Create the option if it doesn't exist.
        if (
          flattenedOptions.findIndex(
            (option) => option.label.trim().toLowerCase() === normalizedSearchValue
          ) === -1
        ) {
          setOptions([...options, newOption]);
        }

        // Select the option.
        setSelected([...selectedOptions, newOption]);
      };

      const renderOption = useCallback(
        (option, searchValue, contentClassName) => (
          <EuiFlexGroup
            className={`${contentClassName} euiSuggestItem`}
            alignItems="center"
            gutterSize="xs"
          >
            <EuiFlexItem grow={false}>
              {<FieldIcon type={typeMap[option.value.type] ?? option.value.type} />}
            </EuiFlexItem>
            <EuiFlexItem grow={false}>{option.value.field}</EuiFlexItem>

            <EuiFlexItem grow={false}>{option.value.description}</EuiFlexItem>
          </EuiFlexGroup>
        ),
        []
      );

      return (
        <EuiFormRow label="ECS Field" fullWidth>
          <EuiComboBox
            aria-label="Accessible screen reader label"
            placeholder="Select or create options"
            options={options}
            selectedOptions={selectedOptions}
            onChange={onChange}
            onCreateOption={onCreateOption}
            renderOption={renderOption}
            singleSelection={singleSelection}
            isClearable={false}
            data-test-subj="demoComboBox"
            autoFocus
          />
        </EuiFormRow>
      );
    }}
  </UseField>
);
