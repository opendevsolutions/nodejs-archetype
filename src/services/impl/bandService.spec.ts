import {BandServiceImpl} from "./bandServiceImpl";
import {NotFoundEntityError} from "../../errors/notFoundEntityError";
import { ValidationError } from "../../errors/validationError";

const bandsMock: any = [{"name":"Sui Generis","password":null,"id":1,"leader":{"id":1,"name":"Carlos Garcia","nickname":"Charly"}},
  {"name":"Spinetta Jade","password":420,"id":2,"leader":{"id":2,"name":"Luis Alberto Spinetta","nickname":"El flaco"}},
  {"name":"Gorillaz33","password":null,"id":3,"leader":null},{"name":"Socios del desierto","password":123,"id":10,"leader":null},
  {"name":"La maquina de hacer pajaros","password":123,"id":11,"leader":null},{"name":"Almafuerte","password":123444,"id":12,"leader":null},
  {"name":"Hermetica","password":12422,"id":13,"leader":null}];
const bandMock: any = { "name": "Sui Generis", "password": 222, "id": 15 };
const bandRequestDtoMockCorrect = {"name":"Sui Generis","password":222};
const bandRequestDtoMockShortPassword = {"name":"Sui Generis","password":22};
const bandRequestDtoMockNoPassword = {"name":"Sui Generis"};

describe ('Get bands', () => {
  it('success', async () => {
    const bandService = new BandServiceImpl({
      getBands: jest.fn(async () => bandsMock),
      getBandById : jest.fn(),
      updateBand : jest.fn(),
      deleteBand : jest.fn(),
      storeBand : jest.fn()
    });
    const result = await bandService.getBands();
    expect(result).toEqual(bandsMock)
  });

it('error', async () => {
  const expectedError = new Error("Repository error");

  const bandService = new BandServiceImpl({
    getBands: jest.fn(async () => {
        throw expectedError
    }),
    getBandById : jest.fn(),
    updateBand : jest.fn(),
    deleteBand : jest.fn(),
    storeBand : jest.fn()
  });

  await expect(bandService.getBands())
    .rejects
    .toThrowError(expectedError);
  });
});

describe ('Get bands by id', () => {
  it('Not found error', async () => {
    const expectedError = new NotFoundEntityError(1, 'band');

    const bandService = new BandServiceImpl({
      getBands: jest.fn(),
      getBandById : jest.fn(async () => {
        return undefined;
      }),
      updateBand : jest.fn(),
      deleteBand : jest.fn(),
      storeBand : jest.fn()
    });

    await expect(bandService.getBandById(1))
      .rejects
      .toThrow(NotFoundEntityError);

    await expect(bandService.getBandById(1))
      .rejects
      .toThrowError(expectedError);
  });
});

describe ('Update band', () => {
  it('success', async () => {
    const bandService = new BandServiceImpl({
      getBands: jest.fn(),
      getBandById : jest.fn(),
      updateBand : jest.fn(async () => true).mockName('updateBand'),
      deleteBand : jest.fn(),
      storeBand : jest.fn()
    });
    
    const updateBand = jest.spyOn(bandService, 'updateBand')
    bandService.updateBand(1, bandRequestDtoMockCorrect)
    expect(updateBand).toHaveBeenCalledTimes(1);
    expect(updateBand).toHaveBeenCalledWith(1, bandRequestDtoMockCorrect);
  });
  
  it('Not found error', async () => {
    const expectedError = new NotFoundEntityError(99, 'band');

    const bandService = new BandServiceImpl({
      getBands: jest.fn(),
      getBandById : jest.fn(),
      updateBand : jest.fn(async () => false),
      deleteBand : jest.fn(),
      storeBand : jest.fn()
    });

    await expect(bandService.getBandById(99))
      .rejects
      .toThrowError(expectedError);
  });

  it('Validation error', async () => {
    const expectedError = new ValidationError('The password must be at least 3 numbers long');

    const bandService = new BandServiceImpl({
      getBands: jest.fn(),
      getBandById : jest.fn(),
      updateBand : jest.fn(),
      deleteBand : jest.fn(),
      storeBand : jest.fn()
    });
  
    await expect(bandService.updateBand(1, bandRequestDtoMockShortPassword))
      .rejects
      .toThrowError(expectedError);
  });
});

describe ('Store band', () => {
  it('success', async () => {
    const bandService = new BandServiceImpl({
      getBands: jest.fn(),
      getBandById : jest.fn(),
      updateBand : jest.fn(),
      deleteBand : jest.fn(),
      storeBand : jest.fn(async () => await bandMock)
    });
    
    const result = await bandService.storeBand(bandRequestDtoMockCorrect);
    expect(result).toEqual(bandMock)
  });

  it('Validation error', async () => {
    const expectedError = new ValidationError('The password must be at least 3 numbers long');

    const bandService = new BandServiceImpl({
      getBands: jest.fn(),
      getBandById : jest.fn(),
      updateBand : jest.fn(),
      deleteBand : jest.fn(),
      storeBand : jest.fn()
    });
  
    await expect(bandService.storeBand(bandRequestDtoMockShortPassword))
      .rejects
      .toThrowError(expectedError);
  });

  it('Validation error', async () => {
    const expectedError = new ValidationError('The password must be at least 3 numbers long');

    const bandService = new BandServiceImpl({
      getBands: jest.fn(),
      getBandById : jest.fn(),
      updateBand : jest.fn(),
      deleteBand : jest.fn(),
      storeBand : jest.fn()
    });
  
    await expect(bandService.storeBand(bandRequestDtoMockShortPassword))
      .rejects
      .toThrowError(expectedError);
  });
  
  describe ('Delete band', () => {
    it('success', async () => {
      const bandService = new BandServiceImpl({
        getBands: jest.fn(),
        getBandById : jest.fn(),
        updateBand : jest.fn(),
        deleteBand : jest.fn(async () => true).mockName('deleteBand'),
        storeBand : jest.fn()
      });
      
      const deleteBand = jest.spyOn(bandService, 'deleteBand')
      bandService.deleteBand(1)
      expect(deleteBand).toHaveBeenCalledTimes(1);
      expect(deleteBand).toHaveBeenCalledWith(1);
    });
    
    it('Not found error', async () => {
      const expectedError = new NotFoundEntityError(99, 'band');
  
      const bandService = new BandServiceImpl({
        getBands: jest.fn(),
        getBandById : jest.fn(),
        updateBand : jest.fn(),
        deleteBand : jest.fn(async () => false),
        storeBand : jest.fn()
      });
  
      await expect(bandService.getBandById(99))
        .rejects
        .toThrowError(expectedError);
    });
  });
});