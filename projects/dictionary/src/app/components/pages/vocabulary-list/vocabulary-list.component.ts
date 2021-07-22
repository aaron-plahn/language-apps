import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AudioService } from 'audio';
import { MockDictionaryDataService } from '../../../services/dictionary-data/mock-dictionary-data.service';
import { VocabularyListEntry } from '../../../services/dictionary-data/term-with-values';
import { VocabularyList } from '../../../services/dictionary-data/vocabulary-list';
import { DictionarySearchService } from '../../../services/dictionary-search/dictionary-search.service';
import { ListQuery } from '../../../services/dictionary-search/list-query';
import { Parameter } from '../../../services/dictionary-search/parameter';
import { DropdownData } from '../../widgets/dropdown/dropdown-data';
import { DropdownItem } from '../../widgets/dropdown/dropdown-item';
import { ListVariable } from './list-variable';

@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.css'],
})
export class VocabularyListComponent implements OnInit {
  selectedEntry: VocabularyListEntry;
  entries: VocabularyListEntry[];
  vocabularyList: VocabularyList<any>;
  listID: string;
  selectedTermId: string;

  dropboxes: ListVariable<string>[] = [];
  checkboxes: ListVariable<boolean>[] = [];

  constructor(
    private dictionaryData: MockDictionaryDataService,
    private dictionarySearch: DictionarySearchService,
    private route: ActivatedRoute,
    private audio: AudioService
  ) {}

  ngOnInit(): void {
    this.dictionaryData
      .getTermsForListByListID('1')
      .subscribe((entries: VocabularyListEntry[]) => {
        this.entries = entries;
      });

    this.selectedTermId = '1';

    this.dictionaryData.getVocabularyListByID('1').subscribe((list: any) => {
      this.vocabularyList = list;
      this.setDropboxes(list.variables.dropboxes);
      this.setCheckboxes(list.variables.checkboxes);
    });
  }

  handleNewSelection(data: DropdownItem<any>) {
    this.search(this.createSearchQuery());
  }

  private createSearchQuery(): ListQuery<any> {
    let q: ListQuery<any>;
    q = {
      parameters: [],
    };
    if (!(this.dropboxes?.length || this.checkboxes?.length))
      throw new Error(
        `Cannot create search query when both dropboxes and checkboxes are undefined.`
      );
    if (this.dropboxes?.length) {
      for (let d of this.dropboxes) {
        let queryParameter: Parameter<string>;
        queryParameter = {
          name: d.name,
          value: d.currentValue.value,
        };
        q.parameters.push(queryParameter);
      }
    }
    if (this.checkboxes?.length) {
      for (let c of this.checkboxes) {
        let queryParameter: Parameter<boolean>;
        queryParameter = {
          name: c.name,
          value: c.currentValue.value,
        };
        q.parameters.push(queryParameter);
      }
    }
    return q;
  }

  search(q: ListQuery<any>) {
    let result: VocabularyListEntry = this.dictionarySearch.findOneUniqueTerm(
      q,
      this.entries
    );
    this.selectedEntry = result;
    this.selectedTermId = result.term.id;
  }

  private setDropboxes(dropboxes: DropdownData<string>[]) {
    if (typeof dropboxes === 'undefined') {
      return;
    }

    for (let d of dropboxes) {
      this.dropboxes.push(new ListVariable(d, 0, d.prompt, 'dropbox'));
    }
  }

  private setCheckboxes(checkboxes: DropdownData<boolean>[]) {
    if (typeof checkboxes === 'undefined') return;

    for (let c of checkboxes) {
      this.checkboxes.push(new ListVariable(c, 0, c.prompt, 'checkbox'));
    }
  }
}
