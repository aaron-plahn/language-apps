export default class MediaItem{
    id: string;
    name: string;
    nameEnglish: string;
    artistID: string;
    transcriberID: string;
    authorID: string;
    mediaURL: string;
    mediaType: string;
    comments: string;
    lyrics: string;

    constructor(apiMediaItem: any){
        this.id = MediaItem.returnValueOrThrowError(apiMediaItem.id);
        this.name = MediaItem.returnValueOrNull(apiMediaItem.name);
        this.nameEnglish = MediaItem.returnValueOrNull(apiMediaItem.name_english);
        console.log(`nameEnglish: ${this.nameEnglish}`);

        let artist: string;
        apiMediaItem.credits?.performer ? artist = apiMediaItem.credits?.performer : artist = undefined;
        this.artistID = MediaItem.returnValueOrNull(artist);

        let author: string;
        apiMediaItem.credits?.author ? author = apiMediaItem.credits?.author : author = undefined;
        this.authorID = MediaItem.returnValueOrNull(author);

        let transcriber: string;
        apiMediaItem.credits?.transcriber ? transcriber = apiMediaItem.credits?.transcriber : transcriber = undefined;
        this.authorID = MediaItem.returnValueOrNull(transcriber);

        const media: any = apiMediaItem.media;
        if (!media) { throw new Error(`Media for item is undefined.`); }
        this.mediaURL = MediaItem.returnValueOrThrowError(media.url);
        this.mediaType = MediaItem.returnValueOrThrowError(media.mime);

        this.comments = MediaItem.returnValueOrNull(apiMediaItem.comments);
        this.lyrics = MediaItem.returnValueOrNull(apiMediaItem.lyrics);
    }

    /**
     * TODO move these static methods outside of this class
     * and cleanup external references to them.
    */

    static returnValueOrNull(value: any){
        if (typeof value === 'undefined') { return null; }
        return value;
    }

    static returnValueOrThrowError(value: any){
        if (typeof value === 'undefined' || value === null) { throw new Error(`Value must be defined.`); }
        if (value === '') { throw new Error(`Empty string cannot be passed for value.`); }
        return value;
    }
}
