import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
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

export const tokenGenerator = (user) => {
    const { _id, first_name, last_name, email, role } = user;
    const payload = {
      id: _id,
      first_name,
      last_name,
      email,
      role
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1m' });
}

export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verifyToken(token, JWT_SECRET, (error, payload) => {
            if (error) {
                 return reject(error);
            }
            resolve(payload);
        });
    });
}

export const jwtAuth = (req, res, next) => {
    const { authorization: token } = req.headers;
    if (!token) {
      return res.status(401).json({ message: 'unauthorized' });
    }
    jwt.verify(token, JWT_SECRET, async (error, payload) => {
      if (error) {
        return res.status(403).json({ message: 'No authorized' });
      }
      req.user = await userModels.findById(payload.id);
      next();
    });
}


export const authorizationMiddleware = (role) => (req, res, next) => {
    if(!req.user){
        return res.status(401).json({message: 'unauthorized'});
    }

    const {role: userRole } = req.user;
    if(userRole ===! role){
        return res.status(403).json({ message: 'Forbidden'})
    }
    next();

}   