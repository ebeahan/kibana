/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreSetup, CoreStart, Plugin } from '../../../src/core/public';
import { DeveloperExamplesSetup } from '../../developer_examples/public';

import { Demo } from './components/form';

interface SetupDeps {
  developerExamples: DeveloperExamplesSetup;
}

export class EcsValidatorPlugin implements Plugin {
  public setup(core: CoreSetup, deps: SetupDeps) {
    core.application.register({
      id: 'ecsValidatorExample',
      title: 'ECS Validator Example',
      async mount({ element }: AppMountParameters) {
        ReactDOM.render(<Demo />, element);
        return () => ReactDOM.unmountComponentAtNode(element);
      },
    });

    deps.developerExamples.register({
      appId: 'ecsValidatorExample',
      title: 'ECS Validator Example',
      description: `Build a plugin that demonstrates using the ECS validator package`,
    });
  }
  public start(core: CoreStart) {
    return {};
  }
  public stop() {}
}
