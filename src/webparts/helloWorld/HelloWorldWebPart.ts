import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';

import {
  BaseClientSideWebPart,
} from '@microsoft/sp-webpart-base';
import ParentComponent from '../helloWorld/components/HelloWorld';

export default class HelloWorldWebParts extends BaseClientSideWebPart<{}> {

  public render(): void {
    const element: React.ReactElement = React.createElement(
      ParentComponent
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
