import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export default __dirname;

export class Exception extends Error {
    constructor(message, status){
        super(message);
        this.statusCode = status;
    }
};