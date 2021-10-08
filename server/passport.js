const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports =function initPass(passport, getUsersemail,getUsersName){
    const authenticate = async (email,password,done)=>{
        let user = getUsersemail(email);
        if(user == null){
            return done(null, false, {msg:'No User was found'});

        }
        try{
            if(await bcrypt.compare(password, user.password)&& user.password !==''){
                return done(null, user);
            }else{
                return done(null, false, {msg: "Password did not match"})
            }

        }catch(e){
            return done(e);
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'},authenticate));
    passport.serializeUser((user,done)=>done(null,user.name));
    passport.deserializeUser((name,done)=>done(null, getUsersName(name)));

}