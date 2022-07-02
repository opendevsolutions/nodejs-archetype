import { BandRequestDto } from "../controllers/dto/bandRequestDto";
import { Banda } from "../domain/banda";

export interface BandRepository {
    getBands() : Promise<Banda[]>;
    getBandById(bandId: number) : Promise<Banda | undefined>;
    updateBand(bandId: number, band: BandRequestDto) : Promise<boolean>;
    storeBand(band: BandRequestDto) : Promise<Banda>;
    deleteBand(bandId: number) : Promise<boolean>;
}