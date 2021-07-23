import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropdownData } from './dropdown-data';
import { DropdownItem } from './dropdown-item';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
})
export class DropdownComponent<T> implements OnInit {
  @Input() public set dropdownData(data: DropdownData<T>) {
    this._data = data;
  }

  constructor() {}

  private initialIndex = 0;

  @Output() public onItemSelection = new EventEmitter<DropdownItem<T>>();

  _data: DropdownData<T>;

  selectedIndex: number;
  emitSelection(selectedIndex: number) {
    const selectedItem: DropdownItem<T> = this._data.items[selectedIndex];

    this.onItemSelection.emit(selectedItem);
  }

  ngOnInit(): void {}

  handleInput(data) {
    if (!data?.target?.selectedIndex && !(data?.target.selectedIndex === 0)) {
      return;
    }

    this.selectedIndex = data.target.selectedIndex;
    this.emitSelection(this.selectedIndex);
  }
}
