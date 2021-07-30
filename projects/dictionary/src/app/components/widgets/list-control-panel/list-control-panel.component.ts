import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListQuery } from '../../../services/dictionary-search/list-query';
import { DropdownData } from '../dropdown/dropdown-data';
import { NameAndValue } from '../switch/switch.component';

type CurrentValues = Record<string, boolean | string>;

@Component({
  selector: 'app-list-control-panel',
  templateUrl: './list-control-panel.component.html',
  styleUrls: ['./list-control-panel.component.css'],
})
export class ListControlPanelComponent implements OnInit {
  _dropboxes: DropdownData<string>[];

  _checkboxes: DropdownData<string>[];

  currentValues: CurrentValues = {};

  @Input() public set dropboxes(d: DropdownData<string>[]) {
    this._dropboxes = d;
  }

  @Input() public set checkboxes(c: DropdownData<string>[]) {
    this._checkboxes = c;
  }

  @Output() public onItemSelection = new EventEmitter<
    ListQuery<boolean | string>
  >();

  constructor() {}

  ngOnInit(): void {}

  handleNewSelection(eventData) {
    this.updateCurrentValues(eventData);
    this.onItemSelection.emit(this.createSearchQuery());
  }

  private updateCurrentValues(eventData: NameAndValue<string | boolean>) {
    console.log({
      message: 'updating current values',
      eventData,
    });
    const { name, value } = eventData;

    this.currentValues[name] = value;
  }

  private createSearchQuery(): ListQuery<boolean | string> {
    return Object.entries(this.currentValues).reduce(
      (accumulatedListQuery, [name, value]) => {
        accumulatedListQuery.parameters.push({
          name,
          value,
        });

        return { ...accumulatedListQuery };
      },
      {
        parameters: [],
      }
    );
  }
}
