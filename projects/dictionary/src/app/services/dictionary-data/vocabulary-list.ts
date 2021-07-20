import { Variable } from './variable';

export type VocabularyList = {
  id: string;
  name?: string;
  name_english?: string;
  credits: object;
  comments: string;
  variables: {
    dropboxes: Omit<Variable<any>, 'type'>[];
    checkboxes: Omit<Variable<any>, 'type'>[];
  };
};

export type VocabularyListSummary = {
  id: string;
  name?: string;
  name_english: string;
  credits?: object;
};
