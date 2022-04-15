/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { EuiFormRow, EuiComboBox, EuiText, EuiLink } from '@elastic/eui';
import { i18n } from '@kbn/i18n';

import { documentationService } from '../services/documentation';
import { getFieldConfig } from './lib';

import { UseField } from './shared_imports';
import { ComboBoxOption, DataType } from './types';
import { FIELD_TYPE_OPTIONS } from './constants';

interface Props {
  showDockLink?: boolean;
}

export const TypeField = ({ showDocLink = false }: Props) => (
  <UseField<ComboBoxOption[]> path="type" config={getFieldConfig<ComboBoxOption[]>('type')}>
    {(typeField) => {
      let docLink = null;
      if (showDocLink && typeField.value.length > 0) {
        const selectedType = typeField.value[0].value as DataType;
        docLink = documentationService.getTypeDocLink(selectedType);
      }

      return (
        <EuiFormRow
          label={typeField.label}
          helpText={
            docLink ? (
              <EuiText size="xs">
                <EuiLink href={docLink} target="_blank">
                  {i18n.translate('xpack.ecsValidatorExample.typeField.documentationLabelLink', {
                    defaultMessage: '{typeName} documentation',
                    values: {
                      typeName:
                        typeField.value && typeField.value[0] ? typeField.value[0].label : '',
                    },
                  })}
                </EuiLink>
              </EuiText>
            ) : null
          }
        >
          <EuiComboBox
            placeholder={i18n.translate(
              'xpack.ecsValidatorExample.mappingsEditor.typeField.placeholderLabel',
              {
                defaultMessage: 'Select a type',
              }
            )}
            singleSelection={{ asPlainText: true }}
            selectedOptions={typeField.value}
            options={FIELD_TYPE_OPTIONS}
            onChange={(value) => {
              if (value.length === 0) {
                return;
              }
              typeField.setValue(value);
            }}
            isClearable={false}
            data-test-subj="fieldType"
          />
        </EuiFormRow>
      );
    }}
  </UseField>
);
