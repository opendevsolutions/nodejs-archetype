import { Banda } from "../../domain/banda";

export class BandRequestDto {
    
    public name: string;
    public password: number;

    constructor (band: any) { 
        this.name = band.bandName;
        this.password = band.password;
    }

    public static toBand = (band: BandRequestDto) => new Banda(band.name, band.password);
    
}


