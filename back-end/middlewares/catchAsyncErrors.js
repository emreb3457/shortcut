module.exports = funct => (res, req, next) => {
    Promise.resolve(funct(res, req, next))
        .catch(next)
}