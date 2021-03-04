import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pipe, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlphabetAPI, Card } from './IAlphabetApi';

@Injectable({
  providedIn: 'root'
})
export class AlphabetService implements AlphabetAPI {
  baseAPIURL: string = "https://api.tsilhqotinlanguage.ca";
  endpoints: any = {
    "getCard": "/alphabet-cards/",
    "getFirstAlphabet": "/alphabets/1",
    "getCredits": "/apps/?name_english=Alphabet"
  };

  constructor( private http: HttpClient ) { }

  getCardBySequenceNumber(n: number): Observable<Card>{
    let endpoint: string = `${this.baseAPIURL}${this.endpoints.getCard}${n}`;
    return this.http.get(endpoint)
    .pipe(
      catchError(error =>{
        let errorMsg: string;
        errorMsg = error.error instanceof ErrorEvent ? `Error: ${error.error.message}` : String(error.status);
        return throwError(errorMsg);
      })
    )
    .pipe(
      map((data:any)=>{
        let card: Card = {
          'sequenceNumber': data.sequence_number,
          'letter': {
            'text': data.letter,
            'audioURL': `${this.baseAPIURL}${data.letter_audio.url}`,
          },
          'word': {
            'text': data.word,
            'audioURL': `${this.baseAPIURL}${data.word_audio.url}`
          },
          imageURL: `${this.baseAPIURL}${data.standalone_image.url}`
        }
        return card;
      })
    );
  }

  getAlphabetSize(): Observable<number>{
    let endpoint: string = `${this.baseAPIURL}${this.endpoints.getFirstAlphabet}`;
    return this.http.get(endpoint)
    .pipe(
      catchError(error =>{
        let errorMsg: string;
        errorMsg = error.error instanceof ErrorEvent ? `Error: ${error.error.message}` : String(error.status);
        return throwError(errorMsg);
      })
    )
    .pipe(
      map((data:any)=>{
        let alphabetLength: number = data.alphabet_cards.length;
        console.log(`Alphabet length: ${alphabetLength}`);
        if(alphabetLength <= 0 || !Number.isInteger(alphabetLength)) throw new Error(`Alphabet length must be a positive integer.`);
        return alphabetLength;
      })
    );
  }

  getAlphabetCredits(): Observable<Object>{
    let endpoint: string = `${this.baseAPIURL}${this.endpoints.getCredits}`;
    return this.http.get(endpoint)
    .pipe(
      catchError(error =>{
        let errorMsg: string;
        errorMsg = error.error instanceof ErrorEvent ? `Error: ${error.error.message}` : String(error.status);
        return throwError(errorMsg);
      })
    )
    .pipe(
      map((data:any) => {
        return data[0].credits;
      })
    )
  }
}
