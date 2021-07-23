import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { MemoryCard } from '../types/types/memory-card';
import { MemoryRound } from '../types/types/memory-round';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemoryMatchService {

  constructor( private http: HttpClient ) { }

  private baseAPIURL = 'https://api.tsilhqotinlanguage.ca';

  private endpoints: object = {
    rounds: `${this.baseAPIURL}/memory-rounds/`,
    cards: `${this.baseAPIURL}/memory-cards/`
  };

  getAllRounds(): Observable<MemoryRound[]>{
    return this.http.get(this.endpoints.rounds)
    .pipe(
      map((data: any) => {
        return data.map(r => this.roundAdapter(r));
      })
    );
  }

  getRoundByID(id: string): Observable<MemoryRound>{
    const endpoint = `${this.endpoints.rounds}${id}`;
    return this.http.get(endpoint)
    .pipe(
      map((data: any) => {
        const round: MemoryRound = this.roundAdapter(data);
        round.cards = this.doubleArray(round.cards);
        round.cards = this.shuffleArray(round.cards);
        return round;
      })
    );
  }

  private roundAdapter(apiRound: any): MemoryRound{
    const id: string = this.throwErrorIfUndefinedOrNull(apiRound.id);
    const name: string = this.returnValueOrNull(apiRound.name);
    const nameEnglish: string = this.returnValueOrNull(apiRound.name_english);
    const contributor: string = this.contributorAdapter(apiRound.contributor);
    const credits: object = this.returnValueOrNull(apiRound.credits);
    const cardbackImageURL: string = this.mediaAdapter(apiRound.card_back).url;
    const cards: MemoryCard[] = this.throwErrorIfUndefinedOrNull(apiRound.memory_cards).map(c => this.cardAdapter(c));

    return {
      id,
      name,
      nameEnglish,
      contributor,
      credits,
      cardbackImageURL,
      cards
    };
  }

  private cardAdapter(apiCard: any): MemoryCard{
    console.log(`Adapting item ${apiCard.name}`);
    const id: string = this.throwErrorIfUndefinedOrNull(apiCard.id);
    const name: string = this.returnValueOrNull(apiCard.name);
    const contributor: string = this.contributorAdapter(apiCard.contributor);
    const credits: object = this.returnValueOrNull(apiCard.credits);
    const cardFrontURL: string = this.throwErrorIfUndefinedOrNull(this.mediaAdapter(apiCard.card_front).url);
    const audioURL: string = this.throwErrorIfUndefinedOrNull(this.mediaAdapter(apiCard.audio).url);
    return{
    id,
    name,
    contributor,
    credits,
    cardFrontURL,
    audioURL
    };
  }

  private throwErrorIfUndefinedOrNull(value: any){
    if (typeof value === 'undefined') { throw new Error(`Value undefined.`); }
    if (value === null) { throw new Error('Value cannot be null'); }
    return value;
  }

  private returnValueOrNull(value: any){
    if (typeof value === 'undefined') { return null; }
    return value;
  }

  private contributorAdapter(apiContributor){
    if (!apiContributor) { return null; }
    const firstName: string = this.returnValueOrNull(apiContributor.first_name);
    const lastName: string = this.returnValueOrNull(apiContributor.last_name);
    if (!firstName && !lastName) { return null; }
    if (firstName && lastName) { return `${firstName} ${lastName}`; }
    return firstName ? firstName : lastName;
  }

  private mediaAdapter(apiMediaItem){
    return {
      url: `${this.baseAPIURL}${this.throwErrorIfUndefinedOrNull(apiMediaItem.url)}`
    };
  }

  private doubleArray<T>(a: T[]){
    if (a.length === 0) { return a; }
    return a.concat(a);
  }

  private shuffleArray<T>(a: T[]){
    // returns shuffled copy of an array
    if (a.length === 0) { return a; }
    // implement Fisher-Yates
    for (let i = a.length - 1; i >= 0; i--){
      const j = Math.floor(Math.random() * i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
