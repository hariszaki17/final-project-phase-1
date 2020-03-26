const { Vehicle, Member, Building, ParkingDetail, Payment } = require('../models')
const { Op } = require('sequelize')
const moment = require('moment')
const calculate = require('../helpers/calculateCost')
const mailer = require('../helpers/mailer')

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
        const { id, memberId, vehicleId, buildingId, cost } = req.body
        console.log(req.body)
        ParkingDetail.create({
            parkingId: id,
            memberId: +memberId,
            vehicleId: vehicleId,
            buildingId: +buildingId,
            cost: +cost
        })
        .then((result) => {
            const link = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${id}`
            Member.findAll({
                where: {
                    id: memberId
                }
            })
            .then((result) => {
                const email = result[0].email
                mailer(email, link)
                res.redirect('/checkIn')
            }).catch((err) => {
                res.send(err)
            });
        }).catch((err) => {
            res.send(err)
        });
    }

    static findAll(req, res) {
        ParkingDetail.findAll({
            attributes: ['parkingId', 'memberId', 'vehicleId', 'buildingId', 'checkIn', 'checkOut', 'paymentStatus', 'cost']
        })
        .then((result) => {
            const message = req.app.locals.message || null
            delete req.app.locals.message
            res.render('view-checkin.ejs', { result, message })
        }).catch((err) => {
            res.send(err)
        });
    }

    static scanner(req, res) {
        const message = req.app.locals.message || null
        delete req.app.locals.message
        res.render('scanner.ejs', { message })
    }

    static viewAddCheckout(req, res) {
        let id = req.params.id
        ParkingDetail.findAll({
            where: {
                parkingId: id
            },
            include: {
                model: Member
            }
        })
        .then((result) => {
            let type = result[0].Member.type
            let total;
            let basic;
            let startTime = moment(result[0].checkIn)
            let end = moment(new Date()).add(2, 'h')
            let duration = moment.duration(end.diff(startTime));
            let hours = duration.asHours();
            let discount;
            let balance = result[0].Member.balance
            basic = Math.floor(hours) * +result[0].cost
            if (type == 'Gold') {
                discount = 50
                total = +calculate(+basic, discount).toFixed(2)
            } else if (type == 'Silver') {
                discount = 20
                total = +calculate(+basic, discount).toFixed(2)
            } else if (type == 'Bronze') {
                discount = 10
                total = +calculate(+basic, discount).toFixed(2)
            }
            const data = result[0]
            res.render('add-checkout.ejs', { data, discount, end, total, balance })
        }).catch((err) => {
            res.send(err)
        });
    }

    static checkOutAdd(req, res) {
        const { parkingId, memberId, paymentMethod, discount, totalCost, checkOut, balance } = req.body
        ParkingDetail.findAll({
            attributes: ['id'],
            where: {
                parkingId: parkingId
            }
        })
        .then((result) => {
            Payment.create({
                parkingId: +result[0].id,
                memberId: +memberId,
                paymentMethod,
                discount: +discount,
                totalCost: +totalCost
            })
            .then((result) => {
                ParkingDetail.update({
                    checkOut: checkOut,
                    paymentStatus: true
                }, {
                    where: {
                        parkingId: req.params.id
                    }
                })
                .then((result) => {
                    // console.log(result)
                    let newbalance = balance - +totalCost
                    if (paymentMethod == 'E-Money') {
                        Member.update({
                            balance: newbalance
                        }, {
                            where: {
                                id: memberId
                            }
                        })
                        .then((result) => {
                            res.redirect('/checkIn')
                        }).catch((err) => {
                            res.send(err)
                        });
                    } else {
                        res.redirect('/checkIn')
                    }
                }).catch((err) => {
                    res.send(err)
                });
            }).catch((err) => {
                res.send(err)
            });
        }).catch((err) => {
            res.send(err)
        });
    }
}

module.exports = PDController