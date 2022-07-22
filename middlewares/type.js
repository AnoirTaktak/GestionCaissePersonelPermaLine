const usertype = (utype) => (req, res, next) =>
  !utype.includes(req.user.type)
    ? res.status(401).json('Forbidden')
    : next();

module.exports = usertype;