import { Component, Input, OnInit } from '@angular/core';
import { MockDictionaryDataService } from '../../../services/dictionary-data/mock-dictionary-data.service';
import { Term } from '../../../services/dictionary-data/term';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css'],
})
export class TermComponent implements OnInit {
  term: Term;

  _id: string;
  @Input() public set termID(id: string) {
    if (typeof id === 'number') id = String(id);
    if (!id && !(id === '0')) {
      throw new Error(`termID is undefined`);
    }
    this._id = id;
  }

  constructor(private dictionaryDataService: MockDictionaryDataService) {}

  ngOnInit(): void {
    this.dictionaryDataService.getTermByID(this._id).subscribe((term: Term) => {
      this.term = term;
    });
  }
}
