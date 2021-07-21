import { Observable } from 'rxjs';
import { Term } from './term';
import { VocabularyListEntry } from './term-with-values';
import { ParsedVocabularyList, VocabularyListSummary } from './vocabulary-list';

export interface DictionaryDataAPI {
  getTermsForListByListID(id: string): Observable<VocabularyListEntry[]>;
  getVocabularyListByID(id: string): Observable<ParsedVocabularyList<any>>;
  getAllTerms(): Observable<Term[]>;
  getTermByID(id: string): Observable<Term>;
  getAllVocabularyListSummaries(): Observable<VocabularyListSummary[]>;
}
