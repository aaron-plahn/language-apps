
import MediaItem from './MediaItem';

export default class Contributor{
    id: string;
    name: string;

    constructor(apiContributor: any){
        this.id = MediaItem.returnValueOrThrowError(apiContributor.first_name);
        this.name = "";
        if(apiContributor.first_name) this.name += apiContributor.first_name;
        if(apiContributor.last_name) this.name += apiContributor.last_name;
    }
}