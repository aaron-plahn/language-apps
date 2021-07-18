import { Observable } from 'rxjs';
import { Term } from './term';
import { TermWithValues } from './term-with-values';
import { VocabularyList, VocabularyListSummary } from './vocabulary-list';

export interface DictionaryDataAPI {
  getTermsForListByListID(id: string): Observable<TermWithValues[]>;
  getVocabularyListByID(id: string): Observable<VocabularyList>;
  getAllTerms(): Observable<Term[]>;
  getTermByID(id: string): Observable<Term>;
  getAllVocabularyListSummaries(): Observable<VocabularyListSummary[]>;
}
