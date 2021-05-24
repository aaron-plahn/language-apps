import { Pipe, PipeTransform } from '@angular/core';
import MediaItem from '../classes/MediaItem';

@Pipe({
  name: 'mediaItemName'
})
export class MediaItemNamePipe implements PipeTransform {

  transform(value: MediaItem ): string {
    console.log(`Piping value.nameEnglish: ${value.nameEnglish}`)
    if(Boolean(value.name) && Boolean(value.nameEnglish)) return `${value.name} (${value.nameEnglish})`;
    if(!Boolean(value.name) && !Boolean(value.nameEnglish)) return `Unnamed Media List`;
    return Boolean(value.name)? value.name : value.nameEnglish;
  }

}
