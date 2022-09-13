const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Usuarios = require("../models/userSchema");
const bCrypt = require("bcrypt");
const UserDTO = require("../DTOs/userDTO.JS");

async function isValidPassword(user, password) {
  return await bCrypt.compare(password, user.password);
}
async function createHash(password) {
  return await bCrypt.hash(password, 10);
}

passport.use(
  "registro",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const userBD = await Usuarios.findOne({ email });
      if (userBD) {
        console.log("ya existe el usuario");
        return done(null, false);
      }
      const newUser = new Usuarios();
      newUser.email = email;
      await createHash(password).then((res) => (newUser.password = res));
      await newUser.save();
      const nuevoUserDTO = new UserDTO(newUser)
      return done(null, nuevoUserDTO);
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const userBD = await Usuarios.findOne({ email });
      if (!userBD) {
        console.log("no existe el user");
        return done(null, false);
      }
      let passValida;
      await isValidPassword(userBD, password).then((res) => (passValida = res));
      if (!passValida) {
        console.log(`pass incorrecta`);
        return done(null, false);
      }
      const nuevoUserDTO = new UserDTO(userBD)
      return done(null, nuevoUserDTO);
    }
  )
);

passport.serializeUser((usuario, done) => {
  done(null, usuario._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await Usuarios.findById(id);
  const nuevoUserDTO = new UserDTO(user)
    done(null, nuevoUserDTO);
  
});
