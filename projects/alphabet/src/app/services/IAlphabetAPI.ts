import { Observable } from 'rxjs';
import { Card } from '../classes/card';

export interface AlphabetAPI {
    getCardBySequenceNumber(n: number): Observable<Card>;
    getAlphabetSize(): Observable<number>;
}


