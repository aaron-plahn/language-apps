import { DropdownData } from '../dropdown/dropdown-data';
import { LabelAndValue } from '../dropdown/dropdown-item';
import { ControlType } from './ControlType';

export class ListVariable<T> {
  name: string;
  type: ControlType;
  data: DropdownData<T>;
  currentValue: LabelAndValue<T>;
  defaultValue: LabelAndValue<T>;
  constructor(
    dropdownData: DropdownData<T>,
    defaultIndex: number = 0,
    name: string,
    type: ControlType
  ) {
    if (!name?.length) {
      throw new Error(`Name must be non-empty string.`);
    }
    this.name = name;

    if (type.length === 0) {
      throw new Error(`Type must be non-empty string.`);
    }
    this.type = type;

    this.data = dropdownData;

    const i: number = this.isValidIndex(defaultIndex) ? defaultIndex : 0;
    if (!this.setDefaultValueFromIndex(i)) {
      throw new Error(
        `Failed to instantiate ListVariable using defaultIndex ${defaultIndex}`
      );
    }
    this.currentValue = this.defaultValue; // initialize currentValue
  }

  isValidIndex(i: number) {
    if (!this.data?.items) {
      return false;
    } // null, empty, undefined
    const isValidIndex: boolean = 0 <= i && i < this.data.items.length;
    return isValidIndex; // i in range of items
  }

  setCurrentValueFromIndex(i: number) {
    if (!this.isValidIndex(i)) {
      return false;
    }
    this.currentValue = this.data.items[i];
  }

  setDefaultValueFromIndex(i: number) {
    if (!this.isValidIndex(i)) {
      return false;
    }
    this.defaultValue = this.data.items[i];
    return true;
  }
}
