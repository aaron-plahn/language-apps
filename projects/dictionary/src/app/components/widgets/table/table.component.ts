import { Component, Input, OnInit } from '@angular/core';
import { Term } from '../../../services/dictionary-data/term';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  _terms: Term[];

  @Input() public set terms(terms: Term[]) {
    this._terms = terms;
  }

  constructor() {}

  ngOnInit(): void {}

  // myFunction2(data) {
  //   console.log({ data });
  // }

  myFunction2(data) {
    document.getElementById('demo').style.color = 'red';
  }
}
