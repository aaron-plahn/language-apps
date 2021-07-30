import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownData } from '../dropdown/dropdown-data';
import { LabelAndValue } from '../dropdown/dropdown-item';

export type NameAndValue<T> = {
  name: string;
  value: T;
};

type SwitchNameAndValue = NameAndValue<boolean>;

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
})
export class SwitchComponent implements OnInit {
  _checked: boolean = false;

  _data: DropdownData<boolean>;
  @Input() public set checkboxData(data: DropdownData<boolean>) {
    if (!this.isValidCheckboxData(data)) {
      throw new Error(`Invalid checkbox data.`);
    }
    this._data = data;
  }

  currentLabel: string;

  @Output() public onChange = new EventEmitter<SwitchNameAndValue>();
  // TODO refactor this SRP
  emitState() {
    const selectedItem: LabelAndValue<boolean> = this.getItemFromBoolean(
      this._checked
    );
    this.currentLabel = selectedItem.display || '';

    const nameAndValue: SwitchNameAndValue = {
      name: this._data.prompt,
      value: selectedItem.value,
    };

    this.onChange.emit(nameAndValue);
  }

  updateState() {}

  constructor() {}

  ngOnInit(): void {
    this.emitState();
  }

  private toggle(b: boolean) {
    return !b;
  }
  private getItemFromBoolean(b: boolean) {
    const items: LabelAndValue<boolean>[] = this._data.items;
    for (const i of items) {
      if (i.value === b) {
        return i;
      }
    }
    throw new Error(`No checkbox data found for ${b}`);
  }

  private isValidCheckboxData(d: DropdownData<boolean>) {
    if (!(d.items.length === 2)) {
      return false;
    } // 1 display, value pair for true, 1 for false
    const zerothValue: boolean = d.items[0].value;
    const firstValue: boolean = d.items[1].value;
    if (zerothValue === firstValue) {
      return false;
    } // both true or both false, not acceptable
    return true;
  }

  toggleState() {
    this._checked = this.toggle(this._checked);
    this.emitState();
  }
}
