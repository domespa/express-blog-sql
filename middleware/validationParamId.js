const validationParamId =  (req, res, next, id) => {
    req.params.id = Number(req.params.id);
    console.log(req.params.id);
    if (isNaN(req.params.id)) {
        return res.sendStatus(400);
    }
    next();
};

module.exports = validationParamId;