import { LabelAndValue } from './dropdown-item';

export type DropdownData<T> = {
  prompt: string;
  items: LabelAndValue<T>[];
};
