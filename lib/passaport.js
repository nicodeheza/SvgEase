import passport from 'passport';
import localStrategy from 'passport-local';
import {findUserById, findUserByEmail, validatePassword} from './users';


passport.serializeUser(function (user, done) {
    // serialize the username into session
    //ver si no hay que cambiarlo a email
    done(null, user.email);
});

passport.deserializeUser( async function (req, id, done) {
    // deserialize the username back into user object
    const user = await findUserById(id);
    done(null, user);
});

passport.use(
    new localStrategy(
        {usernameField: 'email', passwordField: 'password',  passReqToCallback: true},
        async (req, username, password, done )=>{

            const user= await findUserByEmail(username);
            if(!user || !validatePassword(user, password)){
                done(null, null);
            }else{
                done(null, user);
            }
        }
    )
);

export default passport;