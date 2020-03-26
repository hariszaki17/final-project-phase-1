const { admin } = require('../models')

class LoginController {
    static login (req, res) {
        const { username, password } = req.body
        admin.findAll({
            where: {
                username: username
            }
        })
        .then((result) => {
            if(result[0].password == password) {
                req.session.isLogin = true
                res.redirect('/')
            } else {
                res.redirect('/login')
            }
        }).catch((err) => {
            res.send(err)
        });
    }

    static check(req, res, next) {
        if (req.session.isLogin) {
            next()
        } else {
            res.redirect('/login')
        }
    }
}

module.exports = LoginController