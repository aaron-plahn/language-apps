import { Injectable } from '@angular/core';
import { VocabularyListEntry } from '../dictionary-data/term-with-values';
import { ListQuery } from './list-query';

@Injectable({
  providedIn: 'root',
})
export class DictionarySearchService {
  constructor() {}

  findOneUniqueTerm(query: ListQuery<any>, allTerms: VocabularyListEntry[]) {
    const results: VocabularyListEntry[] = this.findAllTerms(query, allTerms);

    if (results.length === 1) { return results[0]; }
    return null;
  }

  findAllTerms(
    query: ListQuery<any>,
    allTerms: VocabularyListEntry[]
  ): VocabularyListEntry[] {
    // query parameters set based on (parent) vocabulary list's 'validVariables'
    // ignore 'unregistered' such variables in termWithValue's values
    if (query.parameters?.length < 1) {
      throw new Error(`Ill-defined query: no parameters provided.`);
    }
    const results: VocabularyListEntry[] = [];
    for (const t of allTerms) {
      let match = true;
      for (let i = 0; i < query.parameters.length; i++) {
        const p = query.parameters[i];
        const queryValue = p.value;
        const queryField = p.name;
        const dataValue = t.variableValues[queryField];

        if (!(dataValue === queryValue)) {
          match = false;
          continue;
        }
      }
      if (match) { results.push(t); }
    }
    return results;
  }
}
