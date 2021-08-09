const { Schema, model } = require('mongoose');

const UserShema = Schema({
    full_name: {
        type: String,
        required: [true, 'The full name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    }
});

UserShema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User', UserShema);