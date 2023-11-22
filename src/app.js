import express from 'express';
import path from 'path';
import expressSession from 'express-session';
import FileStore from 'session-file-store';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import ProductsRouters from './routers/api/Products.router.js';
import ProductsViewsrouters from './routers/views/products.routers.js';
import CartsRouter from './routers/api/Carts.router.js';
import CartsViewsrouters from './routers/views/carts.router.js';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import { URI } from './db/mongodb.js';


const app = express();

const sessionFileSystem = FileStore(expressSession);

const SESSION_SECRET = '03034569999999';

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser(SESSION_SECRET));


app.use(expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: URI,
        mongoOptions:{},  
        ttl:15,
    }),
    
}));
    
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

//set-cookie
app.get('/set-cookie', (req, res) => {
    res.cookie('ecommerce-cookie', 'Cookie de prueba', { maxAge: 10000, signed: true })
    res.send('Cookie configurada correctamente');
});
 
//get-cookie
app.get('/get-cookie', (req, res) => {
    const cookie = req.signedCookies;
    res.send(cookie);
});  

//delete-cookie
app.get('/delete-cookie', (req, res) => {
    res.clearCookie('ecommerce-cookie');
    res.send('Cookie eliminada con exito');
});

//Routers:

// app.get('/', (req, res) => {
     
//     if(!req.session.counter) {
//         req.session.counter = 1;
//         res.send('Bienvenido!');
//     } else {
//         req.session.counter++;
//         res.send( `Se ha visitado el sitio ${req.session.counter} veces`);
//     }
// });

app.get('/profile', (req,res) => {
    if(!req.session.user){
        return res.redirect('/login');
    }
    res.render('profile', {title: 'Perfil', user: req.session.user});
});

app.get('/login', (req,res) => {
    if(req.session.user){
        return res.redirect('/profile');
    }
    res.render('login', {title: 'Login'});
});

app.get('/register', (req,res) => {
    if(req.session.user){
        return res.redirect('/profile');
    }
    res.render('register', {title: 'Register'});
});

// const userTest = {
//     username: 'flopez',
//     password: '1234',
// };

// app.get('/login', (req, res) => {
//     const {username, password} = req.query;
//     if(username === userTest.username && password === userTest.password){
//         req.session.user = username;
//         req.session.admin = true;
//         res.send('Inicio de sesion exitoso. ')
//     } else {
//         res.send('Usuario o contraseña incorrectos');
//     }
// });

// const auth = (req, res, next) => {
//     if(req.session.user && req.session.admin){
//         next();
//     } else {
//         res.status(401).send('No tienes permiso para acceder.')
//     }
// };

// app.get('/private', auth, (req, res) =>{
//     res.send('Te damos la bienvenida a la seccion privada.')
// });
 
// app.get('/logout', (req, res) => {
//     req.session.destroy((error) => {
//         if(error) {
//             res.send('Ha ocurrido un error');
//         } else {
//             res.send('Sesión cerrada');
//         }
//     })
// });

app.use('/api', ProductsRouters);
app.use('/', ProductsViewsrouters);
app.use('/api', CartsRouter);
app.use('/', CartsViewsrouters);


app.use((error, req, res, next) => {
    const message = `Ha ocurrido un error inesperado: ${error.message}`
    console.error(message)
    res.status(500).json({message});
});

export default app;

