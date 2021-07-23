import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { vocabularyListAdapter } from './dictionary-data.service';
import { DictionaryDataAPI } from './IDictionaryDataAPI';
import { Term } from './term';
import { VocabularyListEntry } from './term-with-values';
import {
  RawVocabularyList,
  VocabularyList,
  VocabularyListSummary,
} from './vocabulary-list';

const mockAudioUrl =
  'https://api.tsilhqotinlanguage.ca/uploads/5673485_411465d958.wav';

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

const positivecheckbox = {
  name: 'positive',
  type: 'checkbox',
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
  type: 'dropbox',
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
  type: 'dropbox',
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
  type: 'dropbox',
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
  private baseAPIURL = 'https://api.tsilhqotinlanguage.ca';

  constructor() {}

  private mockTerms: Term[] = [
    {
      id: '1',
      term: wrapMockTermStrings('term with no english'),
      contributor: mockContributor,
      audioURL: mockAudioUrl,
    },
    {
      id: '2',
      term: wrapMockTermStrings('term with english '),
      termEnglish: wrapMockTermEnglishStrings('term with english (english)'),
      contributor: mockContributor,
      audioURL: mockAudioUrl,
    },
    {
      id: '3',
      term: wrapMockTermStrings('I am walking '),
      termEnglish: wrapMockTermEnglishStrings('I am walking (in English)'),
      contributor: mockContributor,
      audioURL: mockAudioUrl,
    },
    {
      id: '4',
      term: wrapMockTermStrings('You are walking '),
      termEnglish: wrapMockTermEnglishStrings('You are walking (in English)'),
      contributor: mockContributor,
      audioURL: mockAudioUrl,
    },
    {
      id: '5',
      term: wrapMockTermStrings('He is walking '),
      termEnglish: wrapMockTermEnglishStrings('He is walking (in English)'),
      contributor: mockContributor,
      audioURL: mockAudioUrl,
    },
    {
      id: '6',
      term: wrapMockTermStrings('I am not walking '),
      termEnglish: wrapMockTermEnglishStrings('I am not walking (in English)'),
      contributor: mockContributor,
      audioURL: mockAudioUrl,
    },
    {
      id: '7',
      term: wrapMockTermStrings('You are not walking '),
      termEnglish: wrapMockTermEnglishStrings(
        'You are not walking (in English)'
      ),
      contributor: mockContributor,
      audioURL: mockAudioUrl,
    },
    {
      id: '8',
      term: wrapMockTermStrings('He is not walking '),
      termEnglish: wrapMockTermEnglishStrings('He is not walking (in English)'),
      contributor: mockContributor,
      audioURL: mockAudioUrl,
    },
    {
      id: '9',
      term: wrapMockTermStrings('unit 1 chapter 1 term '),
      termEnglish: wrapMockTermEnglishStrings(
        'unit 1 chapter 1 term (in English)'
      ),
      contributor: mockContributor,
      audioURL: mockAudioUrl,
    },
    {
      id: '10',
      term: wrapMockTermStrings('unit 1 chapter 2 term '),
      termEnglish: wrapMockTermEnglishStrings(
        'unit 2 chapter 2 term (in English)'
      ),
      contributor: mockContributor,
      audioURL: mockAudioUrl,
    },
    {
      id: '11',
      term: wrapMockTermStrings('unit 1 chapter 3 term '),
      termEnglish: wrapMockTermEnglishStrings(
        'unit 1 chapter 3 term (in English)'
      ),
      contributor: mockContributor,
      audioURL: mockAudioUrl,
    },
    {
      id: '12',
      term: wrapMockTermStrings('unit 2 chapter 1 term '),
      termEnglish: wrapMockTermEnglishStrings(
        'unit 2 chapter 1 term (in English)'
      ),
      contributor: mockContributor,
      audioURL: mockAudioUrl,
    },
    {
      id: '13',
      term: wrapMockTermStrings('unit 2 chapter 2 term '),
      termEnglish: wrapMockTermEnglishStrings(
        'unit 2 chapter 2 term (in English)'
      ),
      contributor: mockContributor,
      audioURL: mockAudioUrl,
    },
    {
      id: '14',
      term: wrapMockTermStrings('unit 2 chapter 3 term '),
      termEnglish: wrapMockTermEnglishStrings(
        'unit 2 chapter 3 term (in English)'
      ),
      contributor: mockContributor,
      audioURL: mockAudioUrl,
    },
    {
      id: '15',
      term: wrapMockTermStrings('term that is not in a list '),
      contributor: mockContributor,
      audioURL: mockAudioUrl,
    },
    {
      id: '16',
      term: wrapMockTermStrings('term with no audio'),
    },
  ];

  private mockVocabularyLists: RawVocabularyList<any>[] = [
    {
      id: '1',
      name: wrapMockVocabularyListStrings('Test Vocabulary List 1: Paradigm'),
      name_english: wrapMockVocabularyListStrings(
        'test vocabulary list 1 ENGLISH NAME'
      ),
      variables: [singularPersonDropbox, positivecheckbox],
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
      variables: [unitDropbox, chapterDropbox],
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
    1: this.mockTermsInList1,
    2: this.mockTermsInList2,
  };

  getTermsForListByListID(id: string): Observable<VocabularyListEntry[]> {
    const result = this.mockTermsForLists[id];

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

  getVocabularyListByID(id: string): Observable<VocabularyList<any>> {
    return of(this.mockVocabularyLists.find((vl) => vl.id === id)).pipe(
      map(vocabularyListAdapter)
    );
  }

  getAllTerms(): Observable<Term[]> {
    return of(this.mockTerms);
  }

  getTermByID(id: string): Observable<Term> {
    return of(this.mockTerms.find((term) => term.id === id));
  }
}
