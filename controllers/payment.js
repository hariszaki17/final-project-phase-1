const { Payment, ParkingDetail, Member, Building, Vehicle } = require('../models')

class PaymentController {
    static findAll(req, res) {
        ParkingDetail.findAll({
            include: [
                {
                    model: Member,
                    required: true
                },
                {
                    model: Building,
                    required: true

                },
                {
                    model: Vehicle,
                    required: true

                }
            ]
        })
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)            
        });
    }
}

module.exports = PaymentController