import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DictionaryDataService } from '../../../services/dictionary-data/dictionary-data.service';
import { Term } from '../../../services/dictionary-data/term';
import { TableClickEventData } from '../../widgets/table/table-click-event-data';
import { TableData } from '../../widgets/table/table-data';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
})
export class TermsComponent implements OnInit {
  termsTable: TableData<Term>;

  constructor(
    private dictionaryDataService: DictionaryDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dictionaryDataService.getAllTerms().subscribe((data: Term[]) => {
      this.termsTable = this.getTermsTable(data);
    });
  }

  handleCellClick(eventData: TableClickEventData<Term>) {
    console.log({
      eventData,
    });

    const { row, column } = eventData;

    console.log({
      row,
      column,
    });
  }

  // TODO consider moving this higher and making it generic
  getTermsTable(terms: Term[]): TableData<Term> {
    return {
      headings: ['term', 'termEnglish', 'contributor'],
      rows: terms,
    };
  }
}
