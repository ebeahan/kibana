/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useMemo, useState } from 'react';
import {
  EuiBadge,
  EuiButton,
  EuiFlexItem,
  EuiFlexGroup,
  EuiFormLabel,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiSpacer,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n-react';
import { validEcsTypeMapping } from '@kbn/ecs-validator';

import { useForm, Form, FormDataProvider } from './shared_imports';
import { EcsField } from './ecs_field';
import { TypeField } from './type_field';
// import { validEcsMapping } from './lib';

const formWrapper = (props: any) => <form {...props} />;

export const Demo = () => {
  const { form } = useForm({
    options: { stripEmptyFields: false },
  });

  const renderFormFields = () => (
    <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween">
      <EuiFlexItem>
        <EcsField />
      </EuiFlexItem>

      <EuiFlexItem>
        <TypeField />
      </EuiFlexItem>

      <FormDataProvider pathsToWatch={['type', 'field']}>
        {({ type, field }) => {
          if (field) {
            const validMapping = validEcsTypeMapping(field, type);

            return (
              <EuiFlexItem grow={false}>
                {!validMapping ? (
                  <>
                    <EuiBadge color="warning" iconType="alert" iconSide="left">
                      Mapping differs from ECS
                    </EuiBadge>
                    <EuiSpacer size="s" />
                  </>
                ) : null}
              </EuiFlexItem>
            );
          }
          return null;
        }}
      </FormDataProvider>
    </EuiFlexGroup>
  );

  return (
    <EuiPage>
      <EuiPageBody style={{ maxWidth: 1200, margin: '0 auto' }}>
        <EuiPageHeader>
          <EuiPageHeaderSection>
            <EuiTitle size="l">
              <h1>ECS Validator Usage Example</h1>
            </EuiTitle>
          </EuiPageHeaderSection>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentBody style={{ maxWidth: 800, margin: '0 auto' }}>
            <section>
              <Form form={form} FormWrapper={formWrapper} data-test-subj="createFormField">
                <EuiFlexGroup gutterSize="s" alignItems="center" justifyContent="spaceBetween">
                  <EuiFlexItem>{renderFormFields()}</EuiFlexItem>
                </EuiFlexGroup>

                <EuiSpacer />

                <EuiFlexGroup gutterSize="s" alignItems="center" justifyContent="spaceBetween">
                  <EuiFlexItem>
                    <div>
                      <EuiButton type="submit" fill>
                        Submit
                      </EuiButton>
                    </div>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </Form>
            </section>
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};
