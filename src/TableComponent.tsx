import * as React from "react";

import { IDataElement } from '../server';

interface IProps {
  data: IDataElement[];
}

export class TableComponent extends React.Component<IProps, {}> {
  private createTableRow(row: IDataElement) {
    const style = {
      border: '1px solid black',
      align: 'middle'
    }
    return (
      <tr key={row.columnName}>
        <td style={style}>{ row.columnName }</td>
        <td style={style}>{ row.count }</td>
        <td style={style}>{ row.age }</td>
      </tr>
    );
  }

  public render(): JSX.Element {
    const content = this.props.data.map( (e) => this.createTableRow(e) );
    const style = {
      marginTop: '3%',
      width: '100%',
      border: '1px solid black'
    }
    return (
      <div>
        <table style={style}>
          <tbody>
          <tr>
            <th>Value</th>
            <th>Count</th> 
            <th>Age</th>
          </tr>
          { content }
          </tbody>
        </table>
      </div>
    );
  }
}