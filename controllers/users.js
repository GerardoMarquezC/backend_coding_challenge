const { response, request } = require("express");
const bcrypt = require("bcryptjs");
var fs = require("fs");
var parse = require("csv-parse");

const User = require("../models/user");

const getUsers = async (req = request, res = response) => {
  let { limit = 10, page = 1 } = req.query;

  limit = Number(limit);
  page = Number(page);

  const skipIndex = (page - 1) * limit;

  const [countDocuments, users] = await Promise.all([
    User.countDocuments({ state: true }),
    User.find({ state: true }).limit(limit).skip(skipIndex),
  ]);

  const countPages = Math.ceil(countDocuments / limit);

  res.json({
    countDocuments,
    limit,
    page,
    countPages,
    users,
  });
};

const postUsers = async (req = request, res = response) => {
  const { full_name, email, password } = req.body;
  const user = new User({ full_name, email, password });

  // Encriptar contraseña
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  // Guardar en base de datos
  await user.save();
  res.json(user);
};

const toCsv = async (req = request, res = response) => {
  var csvData = [];
  fs.createReadStream("/Users/gerardomarquezcarmona/Desktop/td.csv")
    .pipe(parse({ delimiter: "," }))
    .on("data", function (csvrow) {
      //do something with csvrow
      csvData.push(csvrow);
    })
    .on("end", function () {
      //do something with csvData
      let conteo = 1;
      for (let i = 1; i < csvData.length; i++) {
        const element = csvData[i];
        for (let j = 1; j < element.length; j++) {
          const data = element[j];
          if(data == "x"){
            //console.log(csvData[i][0], csvData[0][j]);
            //console.log(`INSERT INTO tr_tipo_clasificacion(id, id_clasificacion, id_tipo, inddep) VALUES (${conteo}, ${csvData[0][j]}, ${csvData[i][0]}, '0');`);
            console.log(`INSERT INTO tr_diseno_clasificacion(id, id_clasificacion, id_diseno, inddep) VALUES (${conteo}, ${csvData[0][j]}, ${csvData[i][0]}, '0');`);
            conteo++;
          }
          
        }
      }
      
    });

  res.json({ msg: "ok" });
};

module.exports = {
  getUsers,
  postUsers,
  toCsv,
};
