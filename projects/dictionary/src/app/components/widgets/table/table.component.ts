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

  @Input() public set data(data: TableData<T>) {
    this._data = data;
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
}
