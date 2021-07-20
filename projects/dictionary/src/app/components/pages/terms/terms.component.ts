import { Component, OnInit } from '@angular/core';
import { MockDictionaryDataService } from '../../../services/dictionary-data/mock-dictionary-data.service';
import { Term } from '../../../services/dictionary-data/term';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
})
export class TermsComponent implements OnInit {
  terms: Term[] = [];

  constructor(private dictionaryDataService: MockDictionaryDataService) {}

  ngOnInit(): void {
    this.dictionaryDataService.getAllTerms().subscribe((data: Term[]) => {
      this.terms = data;
    });
  }
}
