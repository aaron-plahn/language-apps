import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DropdownData } from '../../components/widgets/dropdown/dropdown-data';
import { DictionaryDataAPI } from './IDictionaryDataAPI';
import { Term } from './term';
import { VocabularyListEntry } from './term-with-values';
import { VocabularyList, VocabularyListSummary } from './vocabulary-list';

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

  getVocabularyListByID(id: string): Observable<VocabularyList> {
    let endpoint: string = `${this.endpoints['vocabularyLists']}${id}`;
    return this.http.get(endpoint).pipe(
      map((data) => {
        let variables = this.parseVocabularyListForVariables(data);
        if (!variables) throw new Error(`failed to parse variables`);
        return {
          name: data['name'],
          name_english: data['name_english'],
          id: data['id'],
          variables: variables,
          credits: data['credits'],
          comments: data['comments'],
        };
      })
    );
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

  private parseVocabularyListForVariables(vocabularyList) {
    let apiVariables = vocabularyList.variables;
    if (!apiVariables)
      throw new Error(`Variables undefined on vocabulary list.`);
    let parsedVariables = {
      checkboxes: [],
      dropboxes: [],
    };
    for (let variable of apiVariables) {
      if (!variable.type)
        throw new Error(`Encountered variable of unknown type.`);
      console.log(`Processing variable ${variable.name}`);
      console.log(`and items of length ${variable.validValues.length}`);
      if (variable.type === 'dropbox') {
        let dropbox = this.parseDropbox(variable);
        if (!dropbox) throw new Error(`Failed to parse dropbox.`);
        console.log(`Pushing dropbox ${dropbox.prompt} to parsedVariables`);
        parsedVariables.dropboxes.push(dropbox);
      }
      if (variable.type === 'checkbox')
        parsedVariables.checkboxes.push(this.parseCheckbox(variable));
    }
    return parsedVariables;
  }

  private parseCheckbox(variable) {
    if (!variable.items)
      throw new Error(`Unable to parse checkbox: items undefined.`);
    let newItems = [];
    for (let item of variable.items) {
      newItems.push(this.parseCheckbox(item));
    }
    let output: DropdownData<boolean> = {
      prompt: variable.name,
      items: newItems,
    };
    return output;
  }

  private parseDropbox(variable) {
    if (!variable.validValues)
      throw new Error(`Unable to parse dropbox: items undefined.`);
    let output: DropdownData<string> = {
      prompt: variable.name,
      items: variable.validValues,
    };
    console.log(`Parsed dropbox of length ${output.items.length}`);
    for (let v of output.items) {
      console.log(v.value);
    }
    return output;
  }

  private parseCheckboxItem(item) {
    return item.map((i) => {
      return {
        value: Boolean(i.value),
        display: i.display,
      };
    });
  }

  private termAdapter(apiTerm) {
    return {
      id: this.throwErrorIfUndefined(apiTerm.id),
      term: this.returnValueOrNullIfUndefined(apiTerm.term),
      termEnglish: this.returnValueOrNullIfUndefined(apiTerm.term_english),
      audioURL: `${this.baseAPIURL}${this.returnValueOrNullIfUndefined(
        apiTerm.audio[0]?.url
      )}`,
      audioFormat: this.returnValueOrNullIfUndefined(apiTerm.audio[0]?.format),
      contributor: this.returnValueOrNullIfUndefined(
        `${apiTerm.contributor?.first_name} ${apiTerm.contributor?.last_name}`
      ),
    };
  }

  private vocabularyListAdapter(apiVocabularyList): VocabularyList {
    let variables = this.parseVocabularyListForVariables(apiVocabularyList);
    if (!variables) throw new Error(`failed to parse variables`);
    if (!apiVocabularyList['name'] && !apiVocabularyList['name_english'])
      throw new Error(`failed to parse unnamed vocabulary list.`);
    return {
      name: this.returnValueOrNullIfUndefined(apiVocabularyList['name']),
      name_english: this.returnValueOrNullIfUndefined(
        apiVocabularyList['name_english']
      ),
      id: this.throwErrorIfUndefined(apiVocabularyList['id']),
      variables: variables || { dropboxes: [], checkboxes: [] },
      credits: this.returnValueOrNullIfUndefined(apiVocabularyList['credits']),
      comments: this.returnValueOrNullIfUndefined(
        apiVocabularyList['comments']
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
      name: this.returnValueOrNullIfUndefined(name),
      name_english: this.returnValueOrNullIfUndefined(name_english),
      id: this.returnValueOrNullIfUndefined(id),
      credits: this.returnValueOrNullIfUndefined(credits),
    };
  }

  private returnValueOrNullIfUndefined(value: any): any {
    if (typeof value === 'undefined') return null;
    return value;
  }

  private throwErrorIfUndefined(value: any): any {
    if (typeof value === 'undefined') throw new Error(`Value is undefined.`);
    return value;
  }
}
