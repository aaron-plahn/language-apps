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

  handleCellClick({ row, column }: TableClickEventData<Term>) {
    if (column === 'term' || column === 'termEnglish')
      this.router.navigateByUrl(`/terms/${this.termsTable.rows[row].id}`);

    // TODO if column === 'contributor' navigate to the contributor's bio page
  }

  // TODO consider moving this higher and making it generic
  getTermsTable(terms: Term[]): TableData<Term> {
    return {
      headings: ['term', 'termEnglish', 'contributor'],
      rows: terms,
    };
  }
}
