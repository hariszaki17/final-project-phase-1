const { Vehicle, Member, Building, ParkingDetail, Payment } = require('../models')
const { Op } = require('sequelize')

class BuildingController {
    static findAll(req, res) {
        let keyword = req.query.search || ""
        Building.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${keyword}%`
                }
            }
        })
        .then((result) => {
            const message = req.app.locals.message || null
            delete req.app.locals.message
            res.render('view-building.ejs', { result,  message })
        }).catch((err) => {
            res.send(err)
        });
    }

    static viewAdd(req, res) {
        const message = req.app.locals.message
        delete req.app.locals.message
        res.render('add-building.ejs', { message })
    }

    static add(req, res) {
        const { name, type, address, carCapacity, motorCapacity } = req.body
        Building.create({
            name,
            type,
            address,
            carCapacity,
            motorCapacity
        })
        .then((result) => {
            req.app.locals.message = `new building has been added`
            res.redirect('/buildings')
        }).catch((err) => {
            res.send(err)
        });
    }
}

module.exports = BuildingController