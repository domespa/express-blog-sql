const errorsHandler = (err, req,res,next) => {
    res.status(500).json ({
        status: 500,
        error: err.message
    });
};

module.exports = errorsHandler;