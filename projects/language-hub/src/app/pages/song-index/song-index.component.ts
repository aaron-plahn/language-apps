import { Component, OnInit } from '@angular/core';
import MediaList from '../../classes/MediaList';
import { MediaCollectionsService } from '../../services/media-collections.service';

@Component({
  selector: 'app-song-index',
  templateUrl: './song-index.component.html',
  styleUrls: ['./song-index.component.css']
})
export class SongIndexComponent implements OnInit {


  mediaList: MediaList;

  constructor( private media: MediaCollectionsService ) { }

  ngOnInit(): void {
    this.media.getAllKidsSongs()
    .subscribe((mediaList: MediaList)=>{
      this.mediaList = mediaList;
      console.log(mediaList.items);
    });
  }

}
