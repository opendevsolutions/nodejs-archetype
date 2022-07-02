import { BandRequestDto } from "../../controllers/dto/bandRequestDto";
import { ValidationError } from "../../errors/validationError";

export class BandValidation {
    
    public static validateBandUpdate = (band: BandRequestDto) => !band.password ? true : this.validateBandPasswordLength(band.password);

    public static validateBandStore = (band: BandRequestDto) => {
        if (!band.password) {
            throw new ValidationError('A password must be included to create a band');
        } else {
            return this.validateBandPasswordLength(band.password);
        }
    }

    public static validateBandPasswordLength = (password: number) => {
        if (password.toString().length < 3) {
            throw new ValidationError('The password must be at least 3 numbers long');
        } else {
            return true;
        }
    }

}