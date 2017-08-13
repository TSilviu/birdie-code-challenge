import * as React from "react";

interface IProps {
  columns: string[];
  getDataForValue: (option: string) => {};
}

export class SelectorComponent extends React.Component<IProps, {}> {
  private onChange(e: React.FormEvent<HTMLSelectElement>) {
    const selectedValue = e.currentTarget.value;
    this.props.getDataForValue(selectedValue);
  }

  private createListOptions(value: string): JSX.Element {
    return <option key={value} value={value}> { value } </option>
  }

  public render(): JSX.Element {
    const content = this.props.columns.map( (e) => this.createListOptions(e) );
    return (
      <div>
        Select variable: <select id="selectBox" onChange={this.onChange.bind(this)}> { content } </select>
      </div>
    );
  }
}