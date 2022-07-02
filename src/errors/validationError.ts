export class ValidationError extends Error {

    constructor (validation: string) {
        super();
        this.message = `Validation error: ${validation}`;
    }
    
}