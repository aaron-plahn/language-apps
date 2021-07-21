import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DictionaryDataAPI } from './IDictionaryDataAPI';
import { Term } from './term';
import { VocabularyListEntry } from './term-with-values';
import { VocabularyList, VocabularyListSummary } from './vocabulary-list';

const wrapMockDataWithLabel = (field: string, label: string): string =>
  `${label.toUpperCase()} ${field}`;

const buildWrapMockStringWithLabel =
  (label: string = '') =>
  (field: string): string =>
    wrapMockDataWithLabel(field, label);

const mockContributor = buildWrapMockStringWithLabel('-CN-')('Jane Buck');
const wrapMockTermStrings = buildWrapMockStringWithLabel('-T-');
const wrapMockTermEnglishStrings = buildWrapMockStringWithLabel('-TE-');
const wrapMockVocabularyListStrings = buildWrapMockStringWithLabel('-VL-');

const positiveCheckbox = {
  name: 'positive',
  validValues: [
    {
      display: 'positive',
      value: true,
    },
    {
      display: 'lha (not)',
      value: false,
    },
  ],
};

const singularPersonDropbox = {
  name: 'person',
  validValues: [
    {
      display: 'I',
      value: '11',
    },
    {
      display: 'You',
      value: '21',
    },
    {
      display: 'She, he, or it',
      value: '31',
    },
  ],
};

const chapterDropbox = {
  name: 'chapter',
  validValues: [
    {
      display: 'Chapter 1',
      value: '1',
    },
    {
      display: 'Chapter 2',
      value: '2',
    },
    {
      display: 'Chapter 3',
      value: '3',
    },
  ],
};

const unitDropbox = {
  name: 'unit',
  validValues: [
    {
      display: 'Unit 1',
      value: '1',
    },
    {
      display: 'Unit 2',
      value: '2',
    },
  ],
};

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
      term: wrapMockTermStrings('term with no english'),
      contributor: mockContributor,
    },
    {
      id: '2',
      term: wrapMockTermStrings('term with english (in language)'),
      termEnglish: wrapMockTermEnglishStrings('term with english (english)'),
    },
    {
      id: '3',
      term: wrapMockTermStrings('I am walking (in language)'),
      termEnglish: wrapMockTermEnglishStrings('I am walking (in English)'),
    },
    {
      id: '4',
      term: wrapMockTermStrings('You are walking (in language)'),
      termEnglish: wrapMockTermEnglishStrings('You are walking (in English)'),
    },
    {
      id: '5',
      term: wrapMockTermStrings('He is walking (in language)'),
      termEnglish: wrapMockTermEnglishStrings('He is walking (in English)'),
    },
    {
      id: '6',
      term: wrapMockTermStrings('I am not walking (in language)'),
      termEnglish: wrapMockTermEnglishStrings('I am not walking (in English)'),
    },
    {
      id: '7',
      term: wrapMockTermStrings('You are not walking (in language)'),
      termEnglish: wrapMockTermEnglishStrings(
        'You are not walking (in English)'
      ),
    },
    {
      id: '8',
      term: wrapMockTermStrings('He is not walking (in language)'),
      termEnglish: wrapMockTermEnglishStrings('He is not walking (in English)'),
    },
    {
      id: '9',
      term: wrapMockTermStrings('unit 1 chapter 1 term (in language)'),
      termEnglish: wrapMockTermEnglishStrings(
        'unit 1 chapter 1 term (in English)'
      ),
    },
    {
      id: '10',
      term: wrapMockTermStrings('unit 1 chapter 2 term (in language)'),
      termEnglish: wrapMockTermEnglishStrings(
        'unit 2 chapter 2 term (in English)'
      ),
    },
    {
      id: '11',
      term: wrapMockTermStrings('unit 1 chapter 3 term (in language)'),
      termEnglish: wrapMockTermEnglishStrings(
        'unit 1 chapter 3 term (in English)'
      ),
    },
    {
      id: '12',
      term: wrapMockTermStrings('unit 2 chapter 1 term (in language)'),
      termEnglish: wrapMockTermEnglishStrings(
        'unit 2 chapter 1 term (in English)'
      ),
    },
    {
      id: '13',
      term: wrapMockTermStrings('unit 2 chapter 2 term (in language)'),
      termEnglish: wrapMockTermEnglishStrings(
        'unit 2 chapter 2 term (in English)'
      ),
    },
    {
      id: '14',
      term: wrapMockTermStrings('unit 2 chapter 3 term (in language)'),
      termEnglish: wrapMockTermEnglishStrings(
        'unit 2 chapter 3 term (in English)'
      ),
    },
    {
      id: '15',
      term: wrapMockTermStrings('term that is not in a list (in language)'),
    },
  ];

  private mockVocabularyLists: VocabularyList[] = [
    {
      id: '1',
      name: wrapMockVocabularyListStrings('Test Vocabulary List 1: Paradigm'),
      name_english: wrapMockVocabularyListStrings(
        'test vocabulary list 1 ENGLISH NAME'
      ),
      variables: {
        dropboxes: [singularPersonDropbox],
        checkboxes: [positiveCheckbox],
      },
      credits: {
        contributor1: 'Contributor 1 contribution to test vocabulary list 1',
      },
      comments: 'Comments for test vocabulary list 1',
    },
    {
      id: '2',
      name: wrapMockVocabularyListStrings(
        'Test Vocabulary List 2 (no English name)'
      ),
      variables: {
        dropboxes: [unitDropbox, chapterDropbox],
        checkboxes: [],
      },
      credits: {
        contributor2: 'Contributor 2 contribution to test vocabulary list 2',
      },
      comments: 'Comments for test vocabulary list 2',
    },
  ];

  mockTermsInList1: VocabularyListEntry[] = [
    {
      term: this.mockTerms[2],
      variableValues: {
        person: '11',
        positive: true,
      },
    },
    {
      term: this.mockTerms[3],
      variableValues: {
        person: '21',
        positive: true,
      },
    },
    {
      term: this.mockTerms[4],
      variableValues: {
        person: '31',
        positive: true,
      },
    },
    {
      term: this.mockTerms[5],
      variableValues: {
        person: '11',
        positive: false,
      },
    },
    {
      term: this.mockTerms[6],
      variableValues: {
        person: '21',
        positive: false,
      },
    },
    {
      term: this.mockTerms[7],
      variableValues: {
        person: '31',
        positive: false,
      },
    },
  ];

  mockTermsInList2: VocabularyListEntry[] = [
    {
      term: this.mockTerms[8],
      variableValues: {
        unit: '1',
        chapter: '1',
      },
    },
    {
      term: this.mockTerms[9],
      variableValues: {
        unit: '1',
        chapter: '2',
      },
    },
    {
      term: this.mockTerms[10],
      variableValues: {
        unit: '1',
        chapter: '3',
      },
    },
    {
      term: this.mockTerms[11],
      variableValues: {
        unit: '2',
        chapter: '1',
      },
    },
    {
      term: this.mockTerms[12],
      variableValues: {
        unit: '2',
        chapter: '2',
      },
    },
    {
      term: this.mockTerms[13],
      variableValues: {
        unit: '2',
        chapter: '3',
      },
    },
  ];

  mockTermsForLists: Record<string, VocabularyListEntry[]> = {
    '1': this.mockTermsInList1,
    '2': this.mockTermsInList2,
  };

  getTermsForListByListID(id: string): Observable<VocabularyListEntry[]> {
    const result = this.mockTermsForLists[id];
    console.log(`get terms for list by id results ${result}`);
    return of(result);
  }

  getAllVocabularyListSummaries(): Observable<VocabularyListSummary[]> {
    return of(
      this.mockVocabularyLists.map((vl) => ({
        id: vl.id,
        name: vl.name,
        name_english: vl.name_english,
        credits: vl.credits,
      }))
    );
  }

  getVocabularyListByID(id: string): Observable<VocabularyList> {
    return of(this.mockVocabularyLists.find((vl) => vl.id === id));
  }

  getAllTerms(): Observable<Term[]> {
    return of(this.mockTerms);
  }

  getTermByID(id: string): Observable<Term> {
    return of(this.mockTerms.find((term) => term.id === id));
  }
}
