'use strict';

module.exports = function(app) {
    var survivors = require('../controllers/survivorsController');

    // To list all the survivors or create another one
    app.route('/survivors')
        .get(survivors.listAllSurvivors)
        .post(survivors.createASurvivor);

    // To show the infos about the network
    app.route('/survivors/infos')
        .get(survivors.infos);
    
    // To report one survivor
    app.route('/survivors/report/:survivorId')
        .put(survivors.reportASurvivor);

    // To detail, update or delete one survivor
    app.route('/survivors/:survivorId')
        .get(survivors.detailASurvivor)
        .put(survivors.updateASurvivor)
        .delete(survivors.deleteASurvivor);
    
    // In case of 404
    app.use(function(req, res) {
        res.status(404).send({url: req.originalUrl + ' not found.'});
    });
};