import { DropdownData } from '../../components/widgets/dropdown/dropdown-data';
import { Variable } from './variable';

// TODO deal with inhomogeneous types for variables
export type VocabularyList<T> = {
  id: string;
  name?: string;
  name_english?: string;
  credits: object;
  comments: string;
  variables: Variable<T>[];
};

export type ParsedVariables = {
  dropboxes: DropdownData<string>[];
  checkboxes: DropdownData<boolean>[];
};

export type ParsedVocabularyList<T> = Omit<VocabularyList<any>, 'variables'> & {
  variables: ParsedVariables;
};

export type VocabularyListSummary = {
  id: string;
  name?: string;
  name_english: string;
  credits?: object;
};
