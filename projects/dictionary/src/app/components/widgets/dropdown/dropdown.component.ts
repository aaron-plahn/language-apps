import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NameAndValue } from '../switch/switch.component';
import { DropdownData } from './dropdown-data';
import { LabelAndValue } from './dropdown-item';

type DropdownNameAndValue = NameAndValue<string>;

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent implements OnInit {
  @Input() public set dropdownData(data: DropdownData<string>) {
    this._data = data;
  }

  constructor() {}

  private initialIndex = 0;

  @Output() public onItemSelection = new EventEmitter<DropdownNameAndValue>();

  _data: DropdownData<string>;

  selectedIndex: number;
  emitState(selectedIndex: number) {
    const selectedItem: LabelAndValue<string> = this._data.items[selectedIndex];

    const nameAndValue: DropdownNameAndValue = {
      name: this._data.prompt,
      value: selectedItem.value,
    };

    this.onItemSelection.emit(nameAndValue);
  }

  ngOnInit(): void {}

  handleInput(data) {
    if (!data?.target?.selectedIndex && !(data?.target.selectedIndex === 0)) {
      return;
    }

    this.selectedIndex = data.target.selectedIndex;
    this.emitState(this.selectedIndex);
  }
}
