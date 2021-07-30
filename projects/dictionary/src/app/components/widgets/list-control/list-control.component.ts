import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LabelAndValue } from '../../../components/widgets/dropdown/dropdown-item';
import { ControlType, controlTypes } from './ControlType';
import { ListVariable } from './list-variable';

@Component({
  selector: 'app-list-control',
  templateUrl: './list-control.component.html',
  styleUrls: ['./list-control.component.css'],
})
export class ListControlComponent<T> implements OnInit {
  _listVariable: ListVariable<T>;

  controlType: ControlType;

  @Input() public set listVariable(v: ListVariable<T>) {
    this._listVariable = v;

    this.controlType = v.type;
  }

  @Output() public onChange = new EventEmitter<LabelAndValue<T>>();
  handleNewSelection(eventData: LabelAndValue<T>) {
    this._listVariable.currentValue = eventData;
    this.onChange.emit(this._listVariable.currentValue);
  }

  constructor() {}

  ngOnInit(): void {}

  getControlType(): ControlType {
    return this.controlType;
  }

  isCheckbox(): boolean {
    return this.getControlType() === controlTypes.checkbox;
  }

  isDropbox(): boolean {
    return this.getControlType() === controlTypes.dropbox;
  }
}
