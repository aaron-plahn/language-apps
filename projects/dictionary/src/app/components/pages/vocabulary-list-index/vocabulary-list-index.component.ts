import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DictionaryDataService } from '../../../services/dictionary-data/dictionary-data.service';
import { VocabularyListSummary } from '../../../services/dictionary-data/vocabulary-list';
import { TableClickEventData } from '../../widgets/table/table-click-event-data';
import { TableData } from '../../widgets/table/table-data';

@Component({
  selector: 'app-vocabulary-lists',
  templateUrl: './vocabulary-list-index.component.html',
  styleUrls: ['./vocabulary-list-index.component.css'],
})
export class VocabularyListIndexComponent implements OnInit {
  listSummaryTable: TableData<VocabularyListSummary>;

  constructor(private data: DictionaryDataService, private router: Router) {}

  ngOnInit(): void {
    this.data
      .getAllVocabularyListSummaries()
      .subscribe((data: VocabularyListSummary[]) => {
        this.listSummaryTable = this.buildListSummaryTable(data);
      });
  }

  handleCellClick({ row }: TableClickEventData<VocabularyListSummary>) {
    this.router.navigateByUrl(`/lists/${this.listSummaryTable.rows[row].id}`);

    // TODO if column === 'contributor' navigate to the contributor's bio page
  }

  private buildListSummaryTable(
    allListSummaries: VocabularyListSummary[]
  ): TableData<VocabularyListSummary> {
    return {
      headings: ['name', 'name_english'],
      rows: allListSummaries,
    };
  }
}
