import * as React from "react";

import { SelectorComponent } from './SelectorComponent';

interface IState {
  columns: string[];
  values: any[];
}

export class LayoutComponent extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      columns: [],
      values: []
    }
  }

  private getDataForValue(value: string): void {
    fetch('/values')
      .then( (response) => response.json() )
      .then( (values) => this.setState({ values }));
  }

  public componentDidMount() {
    fetch('/columns')
      .then( (response) => response.json() )
      .then( (columns) => this.setState({ columns }));
  }

  public render(): JSX.Element {
    return (
      <div>
        <SelectorComponent columns={this.state.columns} getDataForValue={this.getDataForValue.bind(this)}/>
      </div>
    );
  }
}