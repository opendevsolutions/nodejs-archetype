import { DELETE, GET, POST, PUT, route } from "awilix-express";
import { Response, Request } from "express";
import { NotFoundEntityError } from "../errors/notFoundEntityError";
import { ValidationError } from "../errors/validationError";
import { BandService } from "../services/bandService";
import { BaseController } from "./baseController";
import { BandRequestDto } from "./dto/bandRequestDto";
import { BandResponseDto } from "./dto/bandResponseDto";

@route('/bands')
export class BandController extends BaseController {

    private statusInternalServerError = '500';
    private badRequestError = '400';
    private notFoundError = '404';


    constructor (private readonly bandService: BandService) {
        super();
    }

    @GET()
    public getBands = async (req: Request, res: Response) => {
        try {
            const bands = await this.bandService.getBands();
            this.sendSuccess(res, BandResponseDto.bandsArrayToDto(bands));
        } catch (e: any) {
            this.sendInternalError(res, e.message, this.statusInternalServerError);
        }
    }

    @route('/:id')
    @GET()
    public getBandById = async (req: Request, res: Response) => {
        try {
            const bandId: number = parseInt(req.params.id);
            const band = await this.bandService.getBandById(bandId);
            this.sendSuccess(res, (BandResponseDto.bandToDto(band)));
        } catch (e: any) {
            if (e instanceof NotFoundEntityError) {
                this.sendNotFoundReq(res, e.message, this.notFoundError);
            } else {
                this.sendInternalError(res, e.message, this.statusInternalServerError);
            }
        }
    }

    @route('/:id')
    @PUT()
    public updateBand = async (req: Request, res: Response) => {
        try {
            const bandId: number = parseInt(req.params.id);
            const band = BandRequestDto.toBand(req.body);
            await this.bandService.updateBand(bandId, band);
            this.sendEmpty(res);
        } catch (e: any) {
            if (e instanceof ValidationError) {
                this.sendBadReq(res, e.message, this.badRequestError);
            } else if (e instanceof NotFoundEntityError) {
                this.sendNotFoundReq(res, e.message, this.notFoundError);
            } else {
                this.sendInternalError(res, e.message, this.statusInternalServerError);
            }
        }
    }

    @POST()
    public storeBand = async (req: Request, res: Response) => {
        try {
            const response = await this.bandService.storeBand(BandRequestDto.toBand(req.body));
            this.sendSuccess(res, BandResponseDto.bandToDto(response));
        } catch (e: any) {
            if (e instanceof ValidationError) {
                this.sendBadReq(res, e.message, this.badRequestError);
            } else {
                this.sendInternalError(res, e.message, this.statusInternalServerError);
            }
        }
    }

    @route('/:id')
    @DELETE()
    public deleteBand = async (req: Request, res: Response) => {
        try {
            const bandId: number = parseInt(req.params.id);
            await this.bandService.deleteBand(bandId);
            this.sendEmpty(res);
        } catch (e: any) {
            if (e instanceof NotFoundEntityError) {
                this.sendNotFoundReq(res, e.message, this.notFoundError);
            } else {
                this.sendInternalError(res, e.message, this.statusInternalServerError);
            }
        }
    }
}