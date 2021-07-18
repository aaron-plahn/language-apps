import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DictionaryDataAPI } from './IDictionaryDataAPI';
import { Term } from './term';
import { TermWithValues } from './term-with-values';
import { VocabularyList, VocabularyListSummary } from './vocabulary-list';

@Injectable({
  providedIn: 'root',
})
// @ts-ignore experimental support for decorators
export class MockDictionaryDataService implements DictionaryDataAPI {
  private baseAPIURL: string = 'https://api.tsilhqotinlanguage.ca';

  constructor() {}

  private mockTerms: Term[] = [
    {
      id: '1',
      term: 'mock-term-1-no-english',
    },
    {
      id: '2',
      term: 'mock-term-2-with-english',
      termEnglish: 'mock-term_english-for-term-2',
    },
  ];

  getTermsForListByListID(id: string): Observable<TermWithValues[]> {
    return of([]);
  }

  getAllVocabularyListSummaries(): Observable<VocabularyListSummary[]> {
    return of([]);
  }

  getVocabularyListByID(id: string): Observable<VocabularyList> {
    return of(undefined);
  }

  getAllTerms(): Observable<Term[]> {
    return of(this.mockTerms);
  }

  getTermByID(id: string): Observable<Term> {
    return of(this.mockTerms.find((term) => term.id === id));
  }
}
