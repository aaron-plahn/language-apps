import { Component, OnInit } from '@angular/core';
import { DictionaryDataService } from '../../../services/dictionary-data/dictionary-data.service';
import { Term } from '../../../services/dictionary-data/term';
import { TableData } from '../../widgets/table/table-data';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
})
export class TermsComponent implements OnInit {
  termsTable: TableData<Term>;

  constructor(private dictionaryDataService: DictionaryDataService) {}

  ngOnInit(): void {
    this.dictionaryDataService.getAllTerms().subscribe((data: Term[]) => {
      this.termsTable = this.getTermsTable(data);
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
