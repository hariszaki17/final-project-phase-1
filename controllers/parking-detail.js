const { Vehicle, Member, Building, ParkingDetail, Payment } = require('../models')
const { Op } = require('sequelize')

class PDController {
    static viewMember(req, res) {
        let keyword = req.query.search || ""
        Member.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${keyword}%`
                }
            }
        })
        .then((result) => {
            const message = req.app.locals.message || null
            delete req.app.locals.message
            res.render('view-member-checkin.ejs', { result, message })
        }).catch((err) => {
            res.send(err)
        });
    }

    static viewVehicle(req, res, next) {
        let keyword = req.query.search || ""
        Vehicle.findAll({
            where: {
                id: {
                    [Op.iLike]: `%${keyword}%`
                }
            }
        })
        .then((result) => {
            const message = req.app.locals.message || null
            delete req.app.locals.message
            const id = +req.params.id.trim()
            console.log(id)
            res.render('view-vehicle-checkin.ejs', { result,  message, id })
        }).catch((err) => {
            res.send(err)
        });
    }

    static viewAdd(req, res) {
        // console.log(req.params)
        let data;
        Building.findAll({})
        .then((result) => {
            data = result
            Vehicle.findAll({
                where: {
                    id: req.params.idVeh
                }
            })
            .then((result) => {
                let cost;
                if (result[0].type == 'Mobil') {
                    cost = 4000
                } else {
                    cost = 3000
                }
                let memberId = +req.params.id
                let vehicleId = req.params.idVeh
                res.render('checkInFinal.ejs', { data, memberId, vehicleId, cost })
            }).catch((err) => {
                res.send(err)
            });
        }).catch((err) => {
            res.send(err)
        });
    }

    static add(req, res) {
        const { memberId, vehicleId, buildingId, cost } = req.body
        ParkingDetail.create({
            memberId,
            vehicleId,
            buildingId,
            cost
        })
        .then((result) => {
            res.redirect('/checkIn')
        }).catch((err) => {
            res.send(err)
        });
    }

    static findAll(req, res) {
        ParkingDetail.findAll({
            attributes: ['id', 'memberId', 'vehicleId', 'buildingId', 'checkIn', 'checkOut', 'paymentStatus', 'cost']
        })
        .then((result) => {
            const message = req.app.locals.message || null
            delete req.app.locals.message
            res.render('view-checkin.ejs', { result, message })
        }).catch((err) => {
            res.send(err)
        });
    }
}

module.exports = PDController