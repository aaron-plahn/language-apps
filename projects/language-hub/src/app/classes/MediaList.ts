import MediaItem from './MediaItem';

export default class MediaList{
    'items': MediaItem[];
    'name': string;
    'nameEnglish': string;
    'id': string;

    constructor(apiMediaList: any){
        this.id = MediaItem.returnValueOrThrowError(apiMediaList.id);
        this.name = MediaItem.returnValueOrNull(apiMediaList.name);
        this.nameEnglish = MediaItem.returnValueOrNull(apiMediaList.name_english);
        if(!(this.name || this.nameEnglish)) throw new Error(`Media list must have a name in at leat one langauge.`);
        let apiMediaItems = apiMediaList.media_items;
        if(!apiMediaItems) throw new Error(`Media list must have at least one media item.`);
        this.items = apiMediaItems.map((item: any) => {
            return new MediaItem(item);
        })
    }
}