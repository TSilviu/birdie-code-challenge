import * as React from "react";

interface IProps {
  name: string;
}

class Hello extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    return <div>Hello, {this.props.name}</div>;
  }
}

export default Hello;