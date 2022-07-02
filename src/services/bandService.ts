import { BandRequestDto } from "../controllers/dto/bandRequestDto";
import { Banda } from "../domain/banda";

export interface BandService {

    getBands() : any;
    getBandById(bandId: number) : Promise<Banda>;
    updateBand(bandId: number, band: BandRequestDto) : void;
    storeBand(band: BandRequestDto) : any;
    deleteBand(bandId: number) : void;

}