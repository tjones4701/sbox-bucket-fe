import passport from "passport";
import SteamStrategy from "passport-steam";
import { ApplicationConfig } from "../lib/config";
import { prepareConnection } from "../orm/connection";

console.log(ApplicationConfig.get('STEAM_APIKEY'));

passport.use(new SteamStrategy({
    returnURL: 'http://localhost:3000/api/auth/steam',
    realm: 'http://localhost:3000/',
    apiKey: ApplicationConfig.get('STEAM_APIKEY')
},
    function (identifier, profile, done) {
        const person = (await prepareConnection()).manager, await connection.manager.findOne(Person, 1);
        let id = profile?.id;
        let profileData = profile?._json;
        console.log(id);
        console.log(profileData);
        return done(null, null);
    }
));

const withSteam = (next) => {
    return (req, res) => {
        passport.authenticate('steam', {
            successRedirect: '/success',
            failureRedirect: '/error',
        })(req, res, (a, b) => {
            console.log(a);
            console.log('-----------');
            console.log(b);
            next(req, res);
        });
    }

};

export default withSteam;