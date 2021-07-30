import { Component, OnInit } from '@angular/core';
import { AudioService } from 'audio';
import { DropdownData } from '../../widgets/dropdown/dropdown-data';
import { LabelAndValue } from '../../widgets/dropdown/dropdown-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  initialIndex = 1;

  selectedFood = '';

  dropdownData: DropdownData<string> = {
    prompt: 'favourite food: ',
    items: [
      { value: 'P', display: 'Pizza' },
      { value: 'S', display: 'Soup' },
      { value: 'B', display: 'Burgers' },
    ],
  };

  checkboxData: DropdownData<boolean> = {
    prompt: 'usitative?',
    items: [
      { value: true, display: 'usually' },
      { value: false, display: ' ' },
    ],
  };

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {}

  handleNewSelection(i: LabelAndValue<string>) {
    this.selectedFood = i.display;
  }
}
