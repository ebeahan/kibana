/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { EuiFlexGroup, EuiFlexItem, EuiHorizontalRule } from '@elastic/eui';
import styled from 'styled-components';
import { useAppIndexPatternContext } from '../../hooks/use_app_index_pattern';
import { useSeriesStorage } from '../../hooks/use_series_storage';
import { CustomReportField } from '../custom_report_field';
import { DataSeries, URLReportDefinition } from '../../types';
import { SeriesChartTypesSelect } from './chart_types';
import { OperationTypeSelect } from './operation_type_select';
import { DatePickerCol } from './date_picker_col';
import { parseCustomFieldName } from '../../configurations/lens_attributes';
import { ReportDefinitionField } from './report_definition_field';

function getColumnType(dataView: DataSeries, selectedDefinition: URLReportDefinition) {
  const { reportDefinitions } = dataView;
  const customColumn = reportDefinitions.find((item) => item.custom);
  if (customColumn?.field && selectedDefinition[customColumn?.field]) {
    const { columnType } = parseCustomFieldName(customColumn.field, dataView, selectedDefinition);

    return columnType;
  }
  return null;
}

export function ReportDefinitionCol({
  dataViewSeries,
  seriesId,
}: {
  dataViewSeries: DataSeries;
  seriesId: string;
}) {
  const { indexPattern } = useAppIndexPatternContext();

  const { getSeries, setSeries } = useSeriesStorage();

  const series = getSeries(seriesId);

  const { reportDefinitions: selectedReportDefinitions = {} } = series ?? {};

  const { reportDefinitions, defaultSeriesType, hasOperationType, yAxisColumns } = dataViewSeries;

  const onChange = (field: string, value?: string[]) => {
    if (!value?.[0]) {
      delete selectedReportDefinitions[field];
      setSeries(seriesId, {
        ...series,
        reportDefinitions: { ...selectedReportDefinitions },
      });
    } else {
      setSeries(seriesId, {
        ...series,
        reportDefinitions: { ...selectedReportDefinitions, [field]: value },
      });
    }
  };

  const columnType = getColumnType(dataViewSeries, selectedReportDefinitions);

  return (
    <FlexGroup direction="column" gutterSize="s">
      <EuiFlexItem>
        <DatePickerCol seriesId={seriesId} />
      </EuiFlexItem>
      <EuiHorizontalRule margin="xs" />
      {indexPattern &&
        reportDefinitions.map(({ field, custom, options }) => (
          <EuiFlexItem key={field}>
            {!custom ? (
              <ReportDefinitionField
                seriesId={seriesId}
                dataSeries={dataViewSeries}
                field={field}
                onChange={onChange}
              />
            ) : (
              <CustomReportField field={field} options={options} seriesId={seriesId} />
            )}
          </EuiFlexItem>
        ))}
      {(hasOperationType || columnType === 'operation') && (
        <EuiFlexItem>
          <OperationTypeSelect
            seriesId={seriesId}
            defaultOperationType={yAxisColumns[0].operationType}
          />
        </EuiFlexItem>
      )}
      <EuiFlexItem>
        <SeriesChartTypesSelect
          seriesId={seriesId}
          defaultChartType={defaultSeriesType}
          seriesTypes={dataViewSeries.seriesTypes}
        />
      </EuiFlexItem>
    </FlexGroup>
  );
}

const FlexGroup = styled(EuiFlexGroup)`
  width: 100%;
`;
