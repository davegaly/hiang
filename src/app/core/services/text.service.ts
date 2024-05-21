import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TextService {
    /**
     * Converte un testo HTML in un testo semplice
     * @param htmlText
     * @param newLineToSpace
     * @returns
     */
    htmlTextToText(htmlText: string, newLineToSpace = true) {
        const elem = document.createElement('div');
        elem.innerHTML = htmlText;
        let text = elem.innerText;
        if (newLineToSpace) text = text.replace(/\n/g, ' ').replace(/\s+/g, ' ');
        elem.remove();
        return text;
    }

    /**
     * Converte un testo semplice in un testo HTML
     * @param text
     * @returns
     */
    textToHtmlText(text: string) {
        const elem = document.createElement('div');
        elem.innerText = text;
        let htmlText = elem.innerHTML;
        elem.remove();
        return htmlText;
    }
}
