const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//patrón que va a definir como se comportan los emails//

const userSchema = new Schema({
    name: {
        type: String,
        required: "User name is required"//es obligatorio, por defecto su valor booleano es true//      
    },
    email: {
        type: String,
        required: "User email is required",
        lowercase: true, //indiferencia de mayúsculas y minúsculas//
        trim: true, //elimina espacios al principio y al final//
        match: [EMAIL_PATTERN, "Invalid email format"] //enlaza la variable pattern//       
    },
    username: { //proteger información del usuario para que no manden spams al correo//
        type: String,
        required: "User username is required",
        trim: true,
        unique: true, // no es una validación, es un índice que si intento añadir otro igual en la Bd da un error//
        validate: { //Validación de cualquier criterio que queramos// 
            validator: function (value) { //no usar en modelos mongoose la función flecha porque no hereda el .this//
                return !value.includes(' ') //solo es válido si no incluye espacios en blanco en el string//
            },
            message: "Username invalid can not contains white spaces"
        },
    },
    password: {
        type: String,
        required: "User password is required",
        minLength: [8, 'User password needs at least 8 chars'] // Establecer un mínimo de caracteres//
    },
    avatarURL: {
        type: String,
        default: function () {
            return `https://i.pravatar.cc/150?u=${this.email}` /*función anónima para que respete el modelo de usuario
          y podamos acceder (.this) a los campos del modelo*/
        }
    }

}, { timestamps: true, virtuals: true }); //registra la fecha de cuando se creó//

userSchema.virtual("playlists", {
  ref: "Playlist",
  localField: "_id",
  foreignField: "user",
}) 

userSchema.pre('save', function(next) {
    const user = this;
  
    if (user.isModified('password')) {
      bcrypt.hash(user.password, WORK_FACTOR)
        .then((hash) => {
          user.password = hash;
          next();
        })
        .catch((error) => next(error))
    } else {
      next();
    }
  });
  
  userSchema.methods.checkPassword = function(password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  }

const User = mongoose.model('User', userSchema);
module.exports = User;