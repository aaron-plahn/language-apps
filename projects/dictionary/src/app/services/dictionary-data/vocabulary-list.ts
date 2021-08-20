import { DropdownData } from '../../components/widgets/dropdown/dropdown-data';
import { RawVariable } from './variable';

// TODO deal with inhomogeneous types for variables
export type RawVocabularyList<T> = {
  id: string;
  name?: string;
  name_english?: string;
  credits: object;
  comments: string;
  variables: RawVariable<T>[];
};

export type ParsedVariables = {
  dropboxes: DropdownData<string>[];
  checkboxes: DropdownData<boolean>[];
};

export type VocabularyList<T> = Omit<RawVocabularyList<any>, 'variables'> & {
  variables: ParsedVariables;
};

export type VocabularyListSummary = {
  id: string;
  name?: string;
  name_english: string;
};
