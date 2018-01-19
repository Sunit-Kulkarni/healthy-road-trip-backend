let should = require('should');
let User = require('../models/user');
const Sequelize = require('sequelize');


describe('The authentication should work', () => {
    //declare a variable so that all our other tests can see it
    let target;
    beforeEach(() => {
        //Now assign to that variable inside this callback.
        target = new User();
    })

    describe('The creation of a user is being tested', () => {
        it('should create a user', () => {
            const sequelize = new Sequelize('database', 'username', 'password', {
                host: 'localhost',
                dialect: 'postgres',

                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },

                operatorsAliases: false
            });

            const User = sequelize.define('user', {
                username: Sequelize.STRING,
                password: Sequelize.STRING
            });

            sequelize.sync()
                .then(() => User.create({
                    username: 'admin',
                    password: 'admin'
                }))
                .then(admin => {
                    console.log(admin.toJSON());
                });
        })
    })
})