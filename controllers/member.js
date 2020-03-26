const { Vehicle, Member, Building, ParkingDetail, Payment } = require('../models')
const { Op } = require('sequelize')

class MemberController {
    static findAll(req, res) {
        Member.findAll({})
        .then((result) => {
            const message = req.app.locals.message || null
            delete req.app.locals.message
            res.render('view-member.ejs', { result, message })
        }).catch((err) => {
            res.send(err)
        });
    }

    static viewAdd(req, res) {
        const message = req.app.locals.message
        delete req.app.locals.message
        const tag = req.query.pd
        if(tag) {
            req.app.locals.tag = true
        }
        res.render('add-member.ejs', { message, tag })
    }

    static add(req, res) {
        const { name, type, email } = req.body
        Member.create({
            name,
            type,
            email
        })
        .then((result) => {
            const tag = req.app.locals.tag
            delete req.app.locals.tag
            if(!tag) {
                req.app.locals.message = `new member has been added`
                res.redirect('/members')
            } else {
                req.app.locals.message = `new member has been added`
                res.redirect('/checkIn/input-member')
            }
        }).catch((err) => {
            res.send(err)
        });
    }
}

module.exports = MemberController