import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AlphabetService } from '../../services/alphabet.service';
import { CardRegion } from '../../widgets/tile/card-region';
import { TileClickEventData } from '../../widgets/tile/tile-click-event-data';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  errorMessages: string[] = [];

  alphabetSize: number;
  tileNumber: number;
  private _active: boolean = false; // deactivate arrow clicks initially

  constructor( private data: AlphabetService, private route:ActivatedRoute, private router: Router ) { }

  ngOnInit(): void {
    this.data.getAlphabetSize()
    .pipe(
      catchError((error:any) =>{
        console.log(error.message);
        return of(-1);
      })
    )
    .subscribe((data:number)=>{
      if(data < 1){
        this.handleDataLoadFailure();
      }
      this.alphabetSize = data;
      this._active = true; // enable left \ right arrow click once Alphabet Size is known
    });

    this.route.params
      .pipe(map(params=>params['id']))
      .subscribe((id:string)=>{
        if(!this.data.isValidID(id)) this.handleDataLoadFailure();
        this.tileNumber = Number(id);
      });
  }

  private cyclicIncrement(n:number,maxNumber:number){
    return (n % maxNumber) + 1;
  }

  private cyclicDecrement(n:number,maxNumber:number){
    let startingIndex: number = 1;
    n--;
    if(n === startingIndex - 1) return maxNumber;
    if(n < startingIndex || n > maxNumber) throw new Error(`Index out of bounds: ${n}`);
    return n;
  }

  handleLeftArrowClick(){
    if(!this._active) return;
    this.tileNumber = this.cyclicDecrement(this.tileNumber,this.alphabetSize);
  }

  handleRightArrowClick(){
    if(!this._active) return;
    this.tileNumber = this.cyclicIncrement(this.tileNumber,this.alphabetSize);
  }

  navigateToIndex(){
    this.router.navigate(['/menu']);
  }

  handleCardClick(eventData: TileClickEventData){
    let region: CardRegion = eventData.region;
    let cardNumber: number = eventData.cardNumber;
    if(region === "LETTER") this.handleLetterClick(cardNumber);
    if(region === "WORD") this.handleWordClick(cardNumber);
    if(region === "IMAGE") this.handleImageClick(cardNumber);
  }

  handleDataLoadFailure(){
    console.error(`Alphabet data or tile failed to load in detail page.`)
    this.navigateToIndex();
  }

  private handleLetterClick(cardNumber: number){
    console.log(`You clicked letter ${cardNumber}.`);
  }

  private handleWordClick(cardNumber: number){
    console.log(`You clicked word ${cardNumber}.`);
  }

  private handleImageClick(cardNumber: number){
    console.log(`You clicked image ${cardNumber}.`);
  }
}
