function checkErrors(resource_name, res, err) {
    if (err.name === 'ValidationError') {
        return res.status(400).send(`There was a problem registering the ${resource_name} : wrong parameters sent.`);
    } else {
        return res.status(500).send(`There was a problem registering the ${resource_name}`);
    }
}

module.exports = {
    checkErrors: checkErrors
};
