import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableClickEventData } from './table-click-event-data';
import { TableData } from './table-data';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent<T extends Record<string, string>>
  implements OnInit
{
  _data: TableData<T>;

  _selectedData: TableData<T>;

  @Input() public set data(data: TableData<T>) {
    this._data = data;
    this._selectedData = data;
  }

  @Output() public onClick = new EventEmitter<TableClickEventData<T>>();
  emitClickData(eventData: TableClickEventData<T>) {
    this.onClick.emit(eventData);
  }

  constructor() {}

  ngOnInit(): void {}

  // TODO add types, avoid passing event data
  handleCellClick(event) {
    const target = event.target || event.srcElement || event.currentTarget;
    const rowIndexAttr = target.getAttribute('rowIndex');
    const fieldAttr = target.getAttribute('class');

    this.emitClickData({ row: rowIndexAttr, column: fieldAttr });
  }

  filterData(event, heading: keyof T) {
    const target = event.target || event.srcElement || event.currentTarget;
    const value = String(target.value);

    console.log(`type of value: ${typeof value}`);

    const filteredRows = this._data.rows.filter((row) => {
      console.log({
        row,
        heading,
        value: row[heading],
      });

      return this.like(row[heading], value);
    });
    this._selectedData = {
      ...this._selectedData,
      rows: filteredRows,
    };
  }

  private like<T extends string>(target: T, input: T): boolean {
    if (typeof target === 'undefined' || target === null) return false;

    if (!(typeof input === 'string'))
      // TODO support non-string input
      throw new Error(`Like does not support non-string data: ${input}`);

    if (!(typeof target === 'string'))
      throw new Error(`Like does not support non-string data: ${input}`);

    return (target as string).includes(input);
  }
}
