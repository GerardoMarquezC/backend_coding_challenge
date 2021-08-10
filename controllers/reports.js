const { request, response } = require("express");
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const Order = require("../models/order");
const logger = require("../helpers/winston");

const reportProducts = async (req = request, res = response) => {
    let startDate, endDate;
    let { currentDate, lastDate } = req.query;
    if (currentDate) {
        startDate = new Date(currentDate);
    } else {
        startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    }

    if (lastDate) {
        endDate = new Date(lastDate);
    } else {
        endDate = new Date(new Date().getFullYear(), new Date().getMonth(), 31);
    }

    const orders = await Order.aggregate([{
        $unwind: "$products"
    },
    {
        $match: {
            creation_date: {
                $gte: startDate,
                $lte: endDate
            }
        }
    }, {
        $group: {
            "_id": "$products.name",
            "total_price": {
                "$sum": {
                    $multiply: ["$products.quantity", "$products.price"]
                }
            },
            "total_products": {
                "$sum": "$products.quantity"
            }
        }
    }]).sort({
        total_products: -1 //Sort by Date Added DESC
    });
    console.log(orders);
    generateReport("reportProducts.pdf", "report-template.ejs", { startDate: startDate.toISOString().slice(0, 10), endDate: endDate.toISOString().slice(0, 10), orders }, res)
}

const generateReport = async (name, template, data, res) => {
    console.log(data);
    logger.info("Generando Reporte......");
    ejs.renderFile(path.join(__dirname.replace("/routes/", ""), '../views/', template), data, (err, data) => {
        if (err) {
            console.log(err)
            res.status(401).send(err);
        } else {
            let options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                    "height": "20mm"
                },
                "footer": {
                    "height": "20mm",
                },
            };
            pdf.create(data, options).toStream((err, str) => {
                if (err) {
                    res.status(401).send(err);
                    logger.error(err.message);
                } else {
                    res.writeHead(200, {
                        "Content-Type": "application/octet-stream",
                        "Content-Disposition": "attachment; filename=" + name
                    });
                    str.pipe(res);
                    /*or you can use 
                      res.setHeader('Content-disposition', 'attachment; filename=users.csv');
                      res.set('Content-Type', 'text/csv');*/
                }
            });
        }
    });
}

module.exports = {
    reportProducts
};