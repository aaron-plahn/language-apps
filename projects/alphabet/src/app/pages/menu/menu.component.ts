import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlphabetService } from '../../services/alphabet.service';
import { TileClickEventData } from '../../widgets/tile/tile-click-event-data';

type MenuDimensions = {
  "width": number,
  "height": number
}

@Component({
  selector: 'alphabet-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  errorMessages: string[] = [];

  numberOfMenuColumns: number = 3;
  numberOfMenuRows: number = 3;
  alphabetSize: number;
  numberOfColumns: number;
  menuItemNumbers: number[][];

  constructor( private data: AlphabetService, private router: Router ) { }

  ngOnInit(): void {
    this.data.getAlphabetSize()
    .pipe(
      catchError((error:any) =>{
        let errorMessage: string;
        errorMessage = error.message? error.message : "Failed to determine alphabet size."
        console.log(errorMessage);
        this.handleAlphabetSizeError(errorMessage);
        return of(-1);
      })
    )
    .subscribe((data:number)=>{
      try {
        this.assertPositiveInteger(data);
      } catch (error) {
        let errorMessage: string;
        errorMessage = error.message? error.message : "Failed to determine alphabet size.";
        this.handleAlphabetSizeError(errorMessage);
      }
      this.alphabetSize = data;
      this.menuItemNumbers = this.createMenuGrid({"height":this.numberOfMenuRows,"width":this.numberOfMenuColumns},this.alphabetSize);
    });
  }

  private calculateNumberOfColumns(numberOfItems: number,numberOfRows: number){
    if( numberOfItems < 1 || !Number.isInteger(numberOfItems)) throw new Error("Number of items must be a positive integer.");
    if( numberOfRows < 1 || !Number.isInteger(numberOfRows)) throw new Error("Number of rows must be a positive integer");
    return Math.floor(numberOfItems / numberOfRows);
  }

  private createMenuGrid(menuDimensions: MenuDimensions, alphabetSize: number): number[][]{
    try {
      let numberOfRows = menuDimensions.height;
      this.assertPositiveInteger(numberOfRows);
      let numberOfColumns = menuDimensions.width;
      this.assertPositiveInteger(numberOfColumns);
      let menuSize: number = numberOfRows*numberOfColumns;
      this.assertPositiveInteger(alphabetSize);
      if(numberOfRows*numberOfColumns > alphabetSize) throw new Error(`Invalid grid dimensions: ${numberOfRows} X ${numberOfColumns} > ${alphabetSize}`);  
    
      let skip: number = Math.ceil(alphabetSize/menuSize); // how many alphabet items to skip between each menu tile
      console.log(`skip: ${skip}`);
      let menuGrid: number[][] = [[]];
      for(let i: number = 0; i < numberOfRows; i++){
        let currentRow: number[] = [];
        for(let j: number = 0; j < numberOfColumns; j++){
          currentRow.push((i*numberOfColumns+j)*skip+1);
        }
        menuGrid.push(currentRow);
      }
      return menuGrid;
    } catch (error) {
      let errorMessage: string = error.message ? error.message : "Unable to set menu grid dimesnions.";
      this.errorMessages.push(error.message);
    }
  
  }

  private assertPositiveInteger(n: number){
    if(!Number.isInteger(n) || n < 0) throw new Error(`Expected positive integer. Received ${n}.`);
  }

  handleCardClick(data: TileClickEventData){
    let id: string = String(data.cardNumber);
    let redirectRoute: string = `detail/${id}`;
    console.log(`Redirecting to ${redirectRoute}`);
    this.router.navigate([redirectRoute]);
  }

  private handleAlphabetSizeError(errorMessage: string){
    console.log(`Got an error with message: ${errorMessage}`);
    this.errorMessages.push(errorMessage);
  }

}
