import { BandRepository } from "../../persistence/bandRepository";
import { BandService } from "../bandService";
import { NotFoundEntityError } from "../../errors/notFoundEntityError";
import { BandValidation } from "../validations/bandValidation";
import { BandRequestDto } from "../../controllers/dto/bandRequestDto";

export class BandServiceImpl implements BandService {

    constructor( private readonly bandRepository: BandRepository) {}
    
    public getBands = async () => {
        const bands = await this.bandRepository.getBands();
        return bands;
    }

    public getBandById = async (bandId: number) => {
        const band = await this.bandRepository.getBandById(bandId);
        if (!band) {
            throw new NotFoundEntityError(bandId, 'band');
        } else {
            return band;
        }
    }

    public updateBand = async (bandId: number, band: BandRequestDto) => {
        if (BandValidation.validateBandUpdate(band)) {
            const response = await this.bandRepository.updateBand(bandId, band);
            if (!response) throw new NotFoundEntityError(bandId, 'banda');
        }
    }

    
    public storeBand = async (band: BandRequestDto) => {
        console.log(`the bandRequestDto band that gets passed as a parameter for the service is: `, band)
        if (BandValidation.validateBandStore(band)) {
            const storedBand =  await this.bandRepository.storeBand(band);
            console.log(`stored band is: `, storedBand)
            return storedBand;
        }
    }

    public deleteBand = async (bandId: number) => {
        const response = await this.bandRepository.deleteBand(bandId);
        if (!response) throw new NotFoundEntityError(bandId, 'banda');
    }

}