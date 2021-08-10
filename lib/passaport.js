import passport from 'passport';
import localStrategy from 'passport-local';
import GitHubStrategy from 'passport-github2';
import { findUserByEmail, validatePassword, findOrCreateGitHub} from './users';


passport.serializeUser(function (user, done) {
    // serialize the username into session
        done(null, user.email);
});

passport.deserializeUser( async function (req, id, done) {
    // deserialize the username back into user object
    const user = await findUserByEmail(id);
    done(null, user);
});

passport.use(
    new localStrategy(
        {usernameField: 'email', passwordField: 'password' },
        async (username, password, done )=>{

            const user= await findUserByEmail(username);
            if(!user || !validatePassword(user, password)){
                done(null, null);
            }else{
                done(null, user);
            }
        }
    )
);

passport.use(
    new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        scope: ['user:email'],
        callbackURL:'http://localhost:3000/api/user/github/callback'
    },
    async (accessToken, refreshToken, profile, done)=>{
        const user= await findOrCreateGitHub(profile);
       // console.log(user);
        return done(null, user);
    }
    )
);

export default passport;