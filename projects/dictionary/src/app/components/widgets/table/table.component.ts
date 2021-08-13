import { Component, Input, OnInit } from '@angular/core';
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

  constructor() {}

  ngOnInit(): void {}

  myFunction2(_data) {
    document.getElementById('demo').style.color = 'red';
  }
}
