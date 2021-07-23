import { AliasedValue } from './aliased-value';

export type RawVariable<T> = {
  name: string;
  type: string;
  validValues: AliasedValue<T>[];
};
