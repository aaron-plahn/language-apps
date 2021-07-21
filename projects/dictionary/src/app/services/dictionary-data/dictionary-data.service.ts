import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DropdownData } from '../../components/widgets/dropdown/dropdown-data';
import returnValueOrNullIfUndefined from '../utilities/returnValueOrNullIfUndefined';
import throwErrorIfUndefined from '../utilities/throwErrorIfUndefined';
import { DictionaryDataAPI } from './IDictionaryDataAPI';
import { Term } from './term';
import { VocabularyListEntry } from './term-with-values';
import {
  ParsedVariables,
  ParsedVocabularyList,
  VocabularyListSummary,
} from './vocabulary-list';

export function parseCheckbox(variable): DropdownData<boolean> {
  if (!variable.validValues)
    throw new Error(`Unable to parse dropbox: items undefined.`);

  if (!variable.validValues.every(({ value }) => typeof value === 'boolean'))
    throw new Error('Encountered non-boolean variables for checkbox');
  let output: DropdownData<boolean> = {
    prompt: variable.name,
    items: variable.validValues,
  };

  return output;
}

export function parseDropbox(variable): DropdownData<string> {
  if (!variable.validValues)
    throw new Error(`Unable to parse dropbox: items undefined.`);
  let output: DropdownData<string> = {
    prompt: variable.name,
    items: variable.validValues,
  };

  return output;
}

export function parseCheckboxItem(item) {
  return item.map((i) => {
    return {
      value: Boolean(i.value),
      display: i.display,
    };
  });
}

export function parseVocabularyListForVariables(
  vocabularyList
): ParsedVariables {
  let apiVariables = vocabularyList.variables;
  if (!apiVariables) throw new Error(`Variables undefined on vocabulary list.`);
  let parsedVariables: ParsedVariables = {
    checkboxes: [],
    dropboxes: [],
  };

  for (let variable of apiVariables) {
    if (!variable.type)
      throw new Error(`Encountered variable of unknown type.`);

    if (variable.type === 'dropbox') {
      let dropbox = parseDropbox(variable);
      if (!dropbox) throw new Error(`Failed to parse dropbox.`);
      parsedVariables.dropboxes.push(dropbox);
    }
    if (variable.type === 'checkbox')
      parsedVariables.checkboxes.push(parseCheckbox(variable));
  }
  return parsedVariables;
}

export function vocabularyListAdapter(
  apiVocabularyList
): ParsedVocabularyList<any> {
  let variables = parseVocabularyListForVariables(apiVocabularyList);
  if (!variables) throw new Error(`failed to parse variables`);
  if (!apiVocabularyList['name'] && !apiVocabularyList['name_english'])
    throw new Error(`failed to parse unnamed vocabulary list.`);
  return {
    name: returnValueOrNullIfUndefined(apiVocabularyList['name']),
    name_english: returnValueOrNullIfUndefined(
      apiVocabularyList['name_english']
    ),
    id: throwErrorIfUndefined(apiVocabularyList['id']),
    variables: variables || { dropboxes: [], checkboxes: [] },
    credits: returnValueOrNullIfUndefined(apiVocabularyList['credits']),
    comments: returnValueOrNullIfUndefined(apiVocabularyList['comments']),
  };
}

@Injectable({
  providedIn: 'root',
})
export class DictionaryDataService implements DictionaryDataAPI {
  private baseAPIURL: string = 'https://api.tsilhqotinlanguage.ca';

  private endpoints: object = {
    listTerms: `${this.baseAPIURL}/list-terms/?vocabulary_list=`,
    vocabularyLists: `${this.baseAPIURL}/vocabulary-lists/`,
    terms: `${this.baseAPIURL}/terms/`,
  };

  constructor(private http: HttpClient) {}

  getTermsForListByListID(id: string): Observable<VocabularyListEntry[]> {
    let endpoint: string = `${this.endpoints['listTerms']}${id}`;
    return this.http.get(endpoint).pipe(
      map((data: any) => {
        let terms: VocabularyListEntry[] = [];
        for (let datum of data) {
          let currentTerm: VocabularyListEntry = {
            term: {
              id: datum.term.id,
              term: datum.term.term,
            },
            variableValues: datum.variable_values,
          };
          if (datum.term.audio?.length > 0) {
            currentTerm.term.audioURL = `${this.baseAPIURL}${datum.term.audio[0].url}`;
            currentTerm.term.audioFormat = datum.term.audio[0].mime;
          }
          terms.push(currentTerm);
        }
        return terms;
      })
    );
  }

  getAllVocabularyListSummaries(): Observable<VocabularyListSummary[]> {
    let endpoint: string = this.endpoints['vocabularyLists'];
    return this.http.get(endpoint).pipe(
      map((data) => {
        if (Array.isArray(data) && data.length > 0)
          return data
            .map(this.vocabularyListSummaryAdapter)
            .filter((list) => list?.id);
        return [];
      })
    );
  }

  getVocabularyListByID(id: string): Observable<ParsedVocabularyList<any>> {
    let endpoint: string = `${this.endpoints['vocabularyLists']}${id}`;
    return this.http.get(endpoint).pipe(map(vocabularyListAdapter));
  }

  getAllTerms(): Observable<Term[]> {
    let endpoint: string = this.endpoints['terms'];
    return this.http.get(endpoint).pipe(
      map((data: any) => {
        let adaptedTerms: Term[] = [];
        for (let datum of data) {
          let adaptedTerm = this.termAdapter(datum);
          adaptedTerms.push(adaptedTerm);
        }
        return adaptedTerms;
      })
    );
  }

  getTermByID(id: string): Observable<Term> {
    let endpoint: string = `${this.endpoints['terms']}${id}`;
    return this.http.get(endpoint).pipe(
      map((data) => {
        return this.termAdapter(data);
      })
    );
  }

  private termAdapter(apiTerm) {
    return {
      id: throwErrorIfUndefined(apiTerm.id),
      term: returnValueOrNullIfUndefined(apiTerm.term),
      termEnglish: returnValueOrNullIfUndefined(apiTerm.term_english),
      audioURL: `${this.baseAPIURL}${returnValueOrNullIfUndefined(
        apiTerm.audio[0]?.url
      )}`,
      audioFormat: returnValueOrNullIfUndefined(apiTerm.audio[0]?.format),
      contributor: returnValueOrNullIfUndefined(
        `${apiTerm.contributor?.first_name} ${apiTerm.contributor?.last_name}`
      ),
    };
  }

  // TODO [DRY]: reuse this logic in vocabularyListAdapter
  private vocabularyListSummaryAdapter(
    apiVocabularyList
  ): VocabularyListSummary {
    const { name, name_english, id, credits } = apiVocabularyList;

    if (!id || (!name && !name_english)) return undefined;

    return {
      name: returnValueOrNullIfUndefined(name),
      name_english: returnValueOrNullIfUndefined(name_english),
      id: returnValueOrNullIfUndefined(id),
      credits: returnValueOrNullIfUndefined(credits),
    };
  }
}
