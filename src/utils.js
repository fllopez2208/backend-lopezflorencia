import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModels from './models/user.models.js';
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

export default __dirname;

const JWT_SECRET = '03034569999999';

export class Exception extends Error {
    constructor(message, status){
        super(message);
        this.statusCode = status;
    }
};

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

export const tokenGenerator = () => {
    const { first_name, last_name, email } = user;
    const payload = {
        id: _id,
        first_name,
        last_name,
        email,
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1m'});
}

export const jwtAuth = (req, res, next) => {
    const { authorization: token } = req.headers;
    if(!token){
        res.status(401).json({ message: 'unauthorized'});
    }

    jwt.verify(token, JWT_SECRET, async (error, payload) => {
        if (error) {
            return res.status(403).json({ message: 'no authorized'});
        }

        req.user = await userModels.findById(payload.id);
        next();
    });
}