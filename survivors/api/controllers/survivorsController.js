'use strict';

var mongoose = require('mongoose'),
    Survivor = mongoose.model('Survivors');

// To list all the survivors - Working
exports.listAllSurvivors = function(req, res) {
    Survivor.find({}, function(err, survivor) {
        if(err)
            res.send(err);
        res.json(survivor);
    });
};

// To create a new survivor - Working
exports.createASurvivor = function(req, res) {

    var newSurvivor = new Survivor(req.body);

    newSurvivor.save(function(err, survivor) {
        if(err)
            res.send(err);
        res.json(survivor);
    });
};

// To see the informations of one survivor - Working
exports.detailASurvivor = function(req, res) {
    Survivor.findById(req.params.survivorId, function(err, survivor) {
        if(err)
            res.send(err);
        res.json(survivor);
    });
};

// To update a survivor - Working
exports.updateASurvivor = function(req, res) {
    Survivor.findById({ _id: req.params.survivorId }, req.body, {new: true}, function(err, survivor) {
        if(err)
            res.send(err);

        // Only latitude and longitude must be updated
        if(req.body.latitude != null)
            survivor.latitude = req.body.latitude;

        if(req.body.longitude != null)
            survivor.longitude = req.body.longitude;

        // Saving modifications
        survivor.save(function(err, survivor) {
            if(err)
                res.send(err);
            res.json(survivor);
        });
    });
};

// To remove a survivor - Working
exports.deleteASurvivor = function(req, res) {
    Survivor.remove({ _id: req.params.survivorId }, function(err, survivor) {
        if(err)
            res.send(err);
        res.json({message: 'Survivor successfully removed'});
    });
};

// Will increase the number of reports for one survivor and verify if he's an infected - Working
exports.reportASurvivor = function(req, res) {
    Survivor.findById({_id: req.params.survivorId}, req.body.reports, {new: true}, function(err, survivor) {
        if(err)
            res.send(err);
        
        // Report's incrementation
        survivor.reports++;

        // He's an infected?
        if(survivor.reports >= 3)
            survivor.infected = true;
        
        survivor.save(function(err, survivor) {
            if(err)
                res.send(err);
            res.json(survivor);
        });
    });
};


// Not working, need to know why
exports.infos = function(req, res) {

    Survivor.find().count(function(err, count){
        var total = count;
        console.log('total: ' + total);
    }).then(function(err, count) {
        Survivor.find({infected: true}).count(function(err, count) {
            var infecteds = count;
            console.log('infecteds: ' + infecteds);
        });
    }).then(function(err, infos) {
        res.json({
            'numOfSurvivors': total,
            'numOfInfecteds': infecteds,
            'percentOfInfecteds': 100 * total/infecteds
        });
    }).catch(function(err) {
        console.log('Promise rejected: ' + err);
        res.send(err);
    });
};
