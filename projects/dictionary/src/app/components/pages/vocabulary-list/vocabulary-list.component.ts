import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DictionaryDataService } from '../../../services/dictionary-data/dictionary-data.service';
import { VocabularyListEntry } from '../../../services/dictionary-data/term-with-values';
import { VocabularyList } from '../../../services/dictionary-data/vocabulary-list';
import { DictionarySearchService } from '../../../services/dictionary-search/dictionary-search.service';
import { ListQuery } from '../../../services/dictionary-search/list-query';
import { DropdownData } from '../../widgets/dropdown/dropdown-data';
import { ListVariable } from '../../widgets/list-control/list-variable';

@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.css'],
})
export class VocabularyListComponent implements OnInit {
  selectedEntry: VocabularyListEntry;
  entries: VocabularyListEntry[];
  vocabularyList: VocabularyList<any>;
  listId: string;
  selectedTermId: string;

  dropboxes: ListVariable<string>[] = [];
  checkboxes: ListVariable<boolean>[] = [];

  constructor(
    private dictionaryData: DictionaryDataService,
    private dictionarySearch: DictionarySearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.listId = params.get('id');
          return forkJoin([
            this.dictionaryData.getTermsForListByListID(this.listId),
            this.dictionaryData.getVocabularyListByID(this.listId),
          ]);
        })
      )
      .subscribe((results) => {
        this.entries = results[0];
        this.vocabularyList = results[1];
        this.selectedTermId = this.entries[0].term.id;
        this.setDropboxes(this.vocabularyList.variables.dropboxes);
        this.setCheckboxes(this.vocabularyList.variables.checkboxes);
      });
  }

  handleNewSelection(data: ListQuery<boolean | string>) {
    this.search(data);
    console.log({
      message: 'got some data',
      data,
    });
  }

  search(q: ListQuery<any>) {
    const result: VocabularyListEntry = this.dictionarySearch.findOneUniqueTerm(
      q,
      this.entries
    );
    this.selectedEntry = result;
    this.selectedTermId = result?.term?.id;
  }

  private setDropboxes(dropboxes: DropdownData<string>[]) {
    if (typeof dropboxes === 'undefined') {
      return;
    }

    for (const d of dropboxes) {
      this.dropboxes.push(new ListVariable(d, 0, d.prompt, 'dropbox'));
    }
  }

  private setCheckboxes(checkboxes: DropdownData<boolean>[]) {
    if (typeof checkboxes === 'undefined') {
      return;
    }

    for (const c of checkboxes) {
      this.checkboxes.push(new ListVariable(c, 0, c.prompt, 'checkbox'));
    }
  }
}
