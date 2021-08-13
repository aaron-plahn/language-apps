import { Component, OnInit } from '@angular/core';
import { DictionaryDataService } from '../../../services/dictionary-data/dictionary-data.service';
import { VocabularyList } from '../../../services/dictionary-data/vocabulary-list';

@Component({
  selector: 'app-vocabulary-lists',
  templateUrl: './vocabulary-list-index.component.html',
  styleUrls: ['./vocabulary-list-index.component.css'],
})
export class VocabularyListIndexComponent implements OnInit {
  lists: VocabularyList<any>[];

  constructor(private data: DictionaryDataService) {}

  ngOnInit(): void {
    this.data.getAllVocabularyListSummaries().subscribe((data: any) => {
      this.lists = data;
    });
  }
}
