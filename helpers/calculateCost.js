const calculate = (basic, discount) => {
    return basic - (discount/100 * basic)
}

module.exports = calculate