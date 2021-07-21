import { DropdownItem } from './dropdown-item';

export type DropdownData<T> = {
  name: string;
  items: DropdownItem<T>[];
};
