class TextWithAudio {
    "text": string;
    "audioURL": string;
    constructor(text: string, audioURL: string){
        this.text = text;
        this.audioURL = audioURL;
    }
    
}

export class Card{
    sequenceNumber: number;
    letter: TextWithAudio;
    word: TextWithAudio;
    imageURL: string;
    domain: string;

    constructor(apiAlphabetCard: any,domain: string){
        this.domain = this.returnValueOrErrorIfUndefined(domain);
        
        // read data from response
        let sequenceNumber: number = this.returnValueOrErrorIfUndefined(Number(apiAlphabetCard.sequence_number));
        let letter: string = this.returnValueOrErrorIfUndefined(apiAlphabetCard.letter);
        let letterAudioURL: string = this.absolutePath(apiAlphabetCard.letter_audio.url);
        let word: string = apiAlphabetCard.word;
        let wordAudioURL: string = this.absolutePath(apiAlphabetCard.word_audio.url);
        let imageURL: string = this.absolutePath(apiAlphabetCard.standalone_image.url);

        this.sequenceNumber = sequenceNumber;
        this.letter = new TextWithAudio(letter, letterAudioURL);
        this.word = new TextWithAudio(word, wordAudioURL);
        this.imageURL = imageURL;
    }

    private returnValueOrErrorIfUndefined(value: any, parameterName: string = "unspecified parameter"){
        if(typeof value === undefined) throw new Error(`Parameter ${parameterName} must be defined in Alphabet Card`);
        return value;
    }

    private returnValueOrNullIfUndefined(value: any){
        if(typeof value === undefined) return null;
        return value;
    }

    private absolutePath(relativePath: any){
        relativePath = this.returnValueOrErrorIfUndefined(relativePath);
        return `${this.domain}${relativePath}`;
    }
}

