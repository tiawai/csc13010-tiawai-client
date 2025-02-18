export interface Word {
    word: string;
    meaning: string;
    wordType: string;
}

export interface Flashcard {
    topic: string;
    words: Word[];
}
