import { Component, Input, OnInit } from '@angular/core';
import { AudioService } from 'audio';
import { MockDictionaryDataService } from '../../../services/dictionary-data/mock-dictionary-data.service';
import { Term } from '../../../services/dictionary-data/term';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css'],
})
export class TermComponent implements OnInit {
  term: Term;

  _id: string;
  @Input() public set termID(id: string) {
    console.log(`Getting term ${id}`);
    if (!id && !(id === '0')) { throw new Error(`termID is undefined`); }
    this._id = id;
    console.log(`_id: ${this._id}`);
  }
  constructor(
    private dictionaryDataService: MockDictionaryDataService,
    private audio: AudioService
  ) {}

  ngOnInit(): void {
    this.dictionaryDataService.getTermByID(this._id).subscribe((term: Term) => {
      this.term = term;
    });
  }

  playAudio() {
    const url: string = this.term.audioURL;
    this.audio.playAudioFromURL(this.term.audioURL);
  }
}
