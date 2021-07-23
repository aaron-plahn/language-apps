import { Pipe, PipeTransform } from '@angular/core';
import { VocabularyListSummary } from '../../services/dictionary-data/vocabulary-list';

@Pipe({
  name: 'displayVocabularyListName',
})
export class DisplayVocabularyListNamePipe implements PipeTransform {
  transform(list: VocabularyListSummary): string {
    const name: string = list.name;
    const nameEnglish: string = list.name_english;
    if (!name && !nameEnglish) { return 'Unnamed List'; }
    if (name && nameEnglish) { return `${name} (${nameEnglish})`; }
    return name || nameEnglish;
  }
}
