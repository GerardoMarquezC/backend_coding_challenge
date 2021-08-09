const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { validationResult } = require('express-validator');

const getUsers = async (req = request, res = response) => {
    let { limit = 10, page = 1 } = req.query;

    limit = Number(limit);
    page = Number(page);

    const skipIndex = (page - 1) * limit;

    const [countDocuments, users] = await Promise.all([
        User.countDocuments({ state: true }),
        User.find({ state: true })
            .limit(limit)
            .skip(skipIndex)
    ]);

    const countPages = Math.ceil(countDocuments/ limit);

    res.json({
        countDocuments,
        limit,
        page,
        countPages,
        users
    });
};


const putUsers = async (req, res) => {
    const { id } = req.params;
    const { _id, password, email, ...resto } = req.body;

    if (password) {
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);
    res.json(user);
};

const postUsers = async (req = request, res = response) => {

    const { full_name, email, password, role } = req.body;
    const user = new User({ full_name, email, password, role });

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar en base de datos
    await user.save();
    res.json(user);
};

const deleteUsers = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { state: false });
    res.json(user);
};

const patchUsers = (req, res) => {
    res.json({
        msg: 'patch API - controllers'
    });
};

module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers,
    patchUsers
}