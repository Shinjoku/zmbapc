'use strict';

module.exports = function(app) {
    var survivors = require('../controllers/survivorsController');

    // Rotas
    app.route('/survivors')
        .get(survivors.listAllSurvivors)
        .post(survivors.createASurvivor);

    app.route('/survivors/infos')
        .get(survivors.infos);

    app.route('/survivors/:survivorId')
        .get(survivors.detailASurvivor)
        .put(survivors.updateASurvivor)
        .delete(survivors.deleteASurvivor);

    app.route('/survivors/report/:survivorId')
        .put(survivors.reportASurvivor);

    app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found.'});
    });
};