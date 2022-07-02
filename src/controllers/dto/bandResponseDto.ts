import { Banda } from "../../domain/banda";
import { Lider } from "../../domain/lider";

export class BandResponseDto {
    
    public id: number;
    public name: string;
    public leader: Lider;

    constructor (bandId: number, bandName: string, bandLeader: Lider) { 
        this.id = bandId;
        this.name = bandName;
        this.leader = bandLeader;
    }

    public static bandToDto = (band: Banda) => new BandResponseDto(band.id, band.name, band.leader);

    public static bandsArrayToDto = (bands: Array<Banda>) => bands.map(band => this.bandToDto(band));
    
}


