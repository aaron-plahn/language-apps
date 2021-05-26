import { Component, OnInit } from '@angular/core';
import { MediaCollectionsService } from '../../services/media-collections.service';
import MediaList from '../../classes/MediaList';

@Component({
  selector: 'app-videos',
  templateUrl: './video-index.component.html',
  styleUrls: ['./video-index.component.css']
})
export class VideoIndexComponent implements OnInit {

  mediaList: MediaList;

  constructor( private media: MediaCollectionsService ) { }

  ngOnInit(): void {
    this.media.getAllWebVideos()
    .subscribe((mediaList: MediaList)=>{
      this.mediaList = mediaList;
      console.log(mediaList.items);
    });
  }

}