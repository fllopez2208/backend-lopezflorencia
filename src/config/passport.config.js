import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import GitHubStrategy from 'passport-github2';
import { createHash, isValidPassword } from '../utils.js';
import UserModel from '../models/user.models.js';

const opts = {
  usernameField: 'email',
  passReqToCallback: true,
};
const githubOpts = {
    clientID: 'Iv1.cb047f6af1113975',
    clientSecret: '7fef20ae682d77e2b8fba1cd6a4e555652cd8f51',
    callbackURL: "http://localhost:8080/api/sessions/github/callback"
};


export const init = () => {
  passport.use('register', new LocalStrategy(opts, async (req, email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        return done(new Error('User already register 😨'));
      }
      const newUser = await UserModel.create({
        ...req.body,
        password: createHash(password),
      });
      done(null, newUser);
    } catch (error) {
      done(new Error(`Ocurrio un error durante la autenticacion ${error.message}.`));
    }
  }));

  passport.use('login', new LocalStrategy(opts, async (req, email, password, done) => {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return done(new Error('Correo o contraseña invalidos'));
      }
      const isPassValid = isValidPassword(password, user);
      if (!isPassValid) {
        return done(new Error('Correo o contraseña invalidos-'));
      }
      done(null, user);
    } catch (error) {
      done(new Error(`Ocurrio un error durante la autenticacion ${error.message} 😨.`));
    }
  }));

  passport.use('github', new GitHubStrategy(githubOpts, async(accessToken, refreshToken, profile, done) => {
    console.log('profile', profile);
    const email = profile._json.email;
    let user = await UserModel.findOne( { email } );
    if (user) {
        return done(null, user);
    }
    user = {
        first_name: profile._json.name,
        last_name: '',
        email,
        age: 18,
        password: '',
        provider: 'Github',
    };

    const newUser = await UserModel.create(user);
    done(null, newUser);

}));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (uid, done) => {
    const user = await UserModel.findById(uid);
    done(null, user);
  });
}
