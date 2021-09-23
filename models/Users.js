const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Users extends Model {
    //custom instance method to check user password with bcrypt
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//user model, table, object
Users.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6],
            },
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        //Hooks (aka lifecycle events), are functions which are called before and after calls in sequelize are executed.
        hooks: {
            //beforeCreate hook is used to work with data before a new instance is created
            async beforeCreate(newUserData) {
                //encrypt password user passed in
                newUserData.password = await bcrypt.hash(
                    newUserData.password,
                    10
                );
                return newUserData;
            },
        },
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "users",
    }
);

module.exports = Users;
