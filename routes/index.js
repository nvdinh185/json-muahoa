const hoaRouter = require('./hoa');

function route(app) {
    app.use('/hoa', hoaRouter);
}

module.exports = route;
