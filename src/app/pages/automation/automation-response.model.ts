// utilizzata per leggere la response della lista di automazioni al caricamento della pagina

export interface AutomazioneResponseDTO {
    automationKey: string;
    titolo: string;
    descrizione: string;
    flagAttivo: boolean;
    tags: { tagName: string; testo: string; colore: string }[];
}
