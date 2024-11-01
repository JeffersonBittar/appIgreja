import { getString, setString } from '@nativescript/core/application-settings';

interface BibleVerse {
    text: string;
    reference: string;
}

const verses: BibleVerse[] = [
    { text: "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.", reference: "João 3:16" },
    { text: "O Senhor é o meu pastor, nada me faltará.", reference: "Salmos 23:1" },
    { text: "Tudo posso naquele que me fortalece.", reference: "Filipenses 4:13" },
    { text: "E conhecereis a verdade, e a verdade vos libertará.", reference: "João 8:32" },
    { text: "Mas buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.", reference: "Mateus 6:33" }
];

export const getDailyVerse = (): BibleVerse => {
    const today = new Date().toDateString();
    const lastUpdate = getString('lastVerseUpdate', '');
    const currentVerse = getString('currentVerse');
    
    if (lastUpdate !== today) {
        const randomIndex = Math.floor(Math.random() * verses.length);
        const newVerse = JSON.stringify(verses[randomIndex]);
        setString('currentVerse', newVerse);
        setString('lastVerseUpdate', today);
        return verses[randomIndex];
    }
    
    return currentVerse ? JSON.parse(currentVerse) : verses[0];
};