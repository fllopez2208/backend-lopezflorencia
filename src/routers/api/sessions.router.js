import { Router } from "express";
import userModels from "../../models/user.models";
const router = Router();

router.post('/sessions/register', async (req, res) => {
    const {body} = req;
    const newUser = await userModels.create(body);
    res.redirect('/login');
});

router.post('/sessions/login', async (req, res) => {
    const { body: {email, password} } = req;
    const user = await userModels.findOne({ email });
    if(!user) {
        return res.status(401).send('Correo o contraseña invalidos.');
    }
    const isPassValid = user.password === password;
    if(!isPassValid) {
        return res.status(401).send('Correo o contraseña invalidos.');
    }
    const { first_name, last_name } = user;
    req.session.user = {first_name, last_name, email};
    res.redirect('/profile');

 });

export default router;