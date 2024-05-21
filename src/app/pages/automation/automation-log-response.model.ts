// utilizzata per leggere la response della lista di automazioni al caricamento della pagina

export interface AutomazioneLogResponseDTO {
    logId: number;
    startDate: Date;
    endDate: Date;
    logData: string;
    status: string;
}
