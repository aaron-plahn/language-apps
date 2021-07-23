import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import MediaList from '../classes/MediaList';
import Contributor from '../classes/Contributor';
import MediaItem from '../classes/MediaItem';

@Injectable({
  providedIn: 'root'
})
export class MediaCollectionsService {

  private baseAPIURL = 'https://api.tsilhqotinlanguage.ca';

  private endpoints: object = {
    kids_songs: `${this.baseAPIURL}/web-media-collections/1`,
    web_videos: `${this.baseAPIURL}/web-media-collections/2`,
    contributors: `${this.baseAPIURL}/contributors/`,
    media_items: `${this.baseAPIURL}/media-items/`
  };

  constructor( private http: HttpClient ) { }

  getAllKidsSongs(): Observable<MediaList>{
    return this.http.get(this.endpoints.kids_songs).pipe(
      map((data: any) => {
        return new MediaList(data);
      })
    );
  }

  getAllWebVideos(): Observable<MediaList>{
    return this.http.get(this.endpoints.web_videos).pipe(
      map((data: any) => {
        return new MediaList(data);
      })
    );
  }

  getMediaItemByID(id: string){
    const endpoint = `${this.endpoints.media_items}${id}`;
    return this.http.get(endpoint).pipe(
      map((data: any) => {
        return new MediaItem(data);
      })
    )
    .pipe(
      catchError(error => {
        let errorMsg: string;
        errorMsg = error.error instanceof ErrorEvent ? `Error: ${error.error.message}` : String(error.status);
        return throwError(errorMsg);
      })
    );
  }

  getAllContributors(): Observable<Contributor[]>{
    const endpoint: string = this.endpoints.contributors;
    return this.http.get(endpoint).pipe(
      map((data: any) => {
        return data.map((contributor: any) => {
          return new Contributor(contributor);
        });
      })
    );
  }

  getContributorByID(id: string): Observable<Contributor>{
    const endpoint = `${this.endpoints.contributors}${id}`;
    return this.http.get(endpoint).pipe(
      map((data: any) => {
        return new Contributor(data);
      })
    );
  }
}
