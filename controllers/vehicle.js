const { Vehicle, Member, Building, ParkingDetail, Payment } = require('../models')
const { Op } = require('sequelize')

class VehicleController {
    static findAll(req, res, next) {
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
            res.render('view-vehicle.ejs', { result,  message })
        }).catch((err) => {
            res.send(err)
        });
    }

    static viewAdd(req, res) {
        const message = req.app.locals.message
        delete req.app.locals.message
        const tag = req.query.pd
        const id = +req.query.id
        if (id){
            id = +req.query.id.trim()
        }
        if(tag) {
            req.app.locals.id = id
            req.app.locals.tag = true
        }
        console.log(req.app.locals.tag)
        res.render('add-vehicle.ejs', { message, tag, id })
    }

    static add(req, res) {
        const { id, type, model } = req.body
        Vehicle.create({
            id,
            type,
            model
        })
        .then((result) => {
            const tag = req.app.locals.tag
            delete req.app.locals.tag
            if(!tag) {
                req.app.locals.message = `new vehicle has been added`
                res.redirect('/vehicles')
            } else {
                const id = req.app.locals.id
                delete req.app.locals.id
                req.app.locals.message = `new vehicle has been added`
                res.redirect(`/checkIn/input-member/${id}/input-vehicle`)
            }
            
        }).catch((err) => {
            res.send(err)
        });
    }
}

module.exports = VehicleController