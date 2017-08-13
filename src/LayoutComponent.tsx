import * as React from "react";

import { SelectorComponent } from './SelectorComponent';

interface IState {
  columns: string[];
}

export class LayoutComponent extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      columns: []
    }
  }

  public componentDidMount() {
    fetch('/columns')
      .then( (response) => response.json() )
      .then( (columns) => this.setState({
        columns,
      }));
  }

  public render(): JSX.Element {
    return (
      <div>
        <SelectorComponent columns={this.state.columns} />
      </div>
    );
  }
}