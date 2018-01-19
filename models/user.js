var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: {type: DataTypes.STRING, unique: true, validate: {notNull: true, notEmpty: true}},
        password: {type: DataTypes.STRING, validate: {notNull: true, notEmpty: true}}
    });
    
    User.associate = (models) => {
        validPassword: (password, passwd, done, user) => {
            bcrypt.compare(password, passwd, (err, isMatch) => {
                if (err) {
                    console.log(err);
                }

                if (isMatch) {
                    return done(null, user); //user object if passwords match
                } else {
                    return done(null, false); //false if passwords don't match
                }
            });
        },
        {
            dialect: 'postgres'
        }
    }

    User.hook('beforeCreate', (user, fn) => {
        var salt = bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
            return salt;
        });
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            return fn(null, user)
        });
    })
    return User
}