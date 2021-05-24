import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import MediaItem from '../../classes/MediaItem';
import { MediaCollectionsService } from '../../services/media-collections.service';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrls: ['./song-detail.component.css']
})
export class SongDetailComponent implements OnInit {

  song: MediaItem;

  constructor( private route: ActivatedRoute, private media: MediaCollectionsService, private router: Router ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap)=>{
        return this.media.getMediaItemByID(params.get('id'));
      })
    )
    .pipe(
      catchError((error:any) =>{
        console.log(error.message);
        return of([]);
      })
    )
    .subscribe((mediaItem: MediaItem)=>{
      console.log('handling');
      console.log(mediaItem);
      if(!mediaItem.id) this.navigateToIndex();
      let song: MediaItem = mediaItem;
      song.mediaURL = "https://api.tsilhqotinlanguage.ca" + song.mediaURL;
      this.song = mediaItem;
    })
  }

  private navigateToIndex(){
    this.router.navigateByUrl('/songs')
  }

}
