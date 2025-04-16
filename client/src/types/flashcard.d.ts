export interface Word {
    word: string;
    meaning: string;
    wordType: string;
}

export interface Flashcard {
    id: string;
    topic: string;
    words: Word[];
}
