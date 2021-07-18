import { Variable } from './variable';

export type VocabularyList = {
  id: string;
  name: string;
  name_english: string;
  credits: object;
  comments: string;
  variables: {
    dropboxes: Variable<any>[];
    checkboxes: Variable<any>[];
  };
};

export type VocabularyListSummary = {
  id: string;
  name: string;
  name_english: string;
  credits: object;
};
