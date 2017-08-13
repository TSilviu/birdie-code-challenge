import * as React from "react";

interface IProps {
  columns: string[];
}

export class SelectorComponent extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    return (
      <div>
        This is where the selector is going to be
      </div>
    );
  }
}