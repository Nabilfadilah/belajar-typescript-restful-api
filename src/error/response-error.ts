export class ResponseError extends Error {
    constructor(public status: number, public message: string) {
        // kirim ke super constructor, message nya
        super(message)
    }
}