import { Component, OnInit } from '@angular/core';
import { MockDictionaryDataService } from '../../../services/dictionary-data/mock-dictionary-data.service';
import { VocabularyList } from '../../../services/dictionary-data/vocabulary-list';

@Component({
  selector: 'app-vocabulary-lists',
  templateUrl: './vocabulary-lists.component.html',
  styleUrls: ['./vocabulary-lists.component.css'],
})
export class VocabularyListsComponent implements OnInit {
  lists: VocabularyList[];

  constructor(private data: MockDictionaryDataService) {}

  ngOnInit(): void {
    this.data.getAllVocabularyListSummaries().subscribe((data: any) => {
      this.lists = data;
    });
  }
}
