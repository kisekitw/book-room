module.exports =  ( req, res, next ) => {
    if (req.isAuthenticated()) {
        console.log('Authenticated!!!!!!!');
        return next();
    }
    console.log('Not Authenticated!!!!!!!');

    next(new Error('Forbidden'));
};
