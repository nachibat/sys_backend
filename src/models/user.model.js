const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const validRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE', 'SALE_ROLE']
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'Username required']
    },
    password: {
        type: String,
        required: [true, 'Password required']
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: validRoles
    },
    state: {
        type: Boolean,
        default: true
    },
    name: String,
    lastname: String,
    email: String
}, {
    // timestamps: { currentTime: () => new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)) },
    timestamps: true,
    versionKey: false
});

userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });

module.exports = mongoose.model('users', userSchema);