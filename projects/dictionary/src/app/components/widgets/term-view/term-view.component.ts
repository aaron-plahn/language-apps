import { Component, Input, OnInit } from '@angular/core';
import { AudioService } from 'audio';
import { Term } from '../../../services/dictionary-data/term';

@Component({
  selector: 'app-term-view',
  templateUrl: './term-view.component.html',
  styleUrls: ['./term-view.component.css'],
})
export class TermViewComponent implements OnInit {
  _term: Term;

  @Input() public set term(term: Term) {
    this._term = term;
  }

  constructor(private audio: AudioService) {}

  ngOnInit(): void {}

  playAudio() {
    this.audio.playAudioFromURL(this._term.audioURL);
  }
}
