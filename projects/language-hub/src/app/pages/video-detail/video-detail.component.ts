import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import MediaItem from '../../classes/MediaItem';
import { MediaCollectionsService } from '../../services/media-collections.service';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {


  video: MediaItem;

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
      // TODO move this logic into MediaCollectionsService or server
      song.mediaURL = "https://api.tsilhqotinlanguage.ca" + song.mediaURL;
      this.video = mediaItem;
    })
  }

  private navigateToIndex(){
    this.router.navigateByUrl('/songs')
  }

}
