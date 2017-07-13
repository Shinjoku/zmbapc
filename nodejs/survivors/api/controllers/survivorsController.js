'use strict';

var mongoose = require('mongoose'),
    Survivor = mongoose.model('Survivors');

// Aux functions and constants:-----------------------------------
const WATER_VALUE = 4;
const FOOD_VALUE = 3;
const MEDICATIONS_VALUE = 2;
const AMMUNITION_VALUE = 1;

// To get number of a item:
function getNumOfItems(items, name) {

    let keys = Object.keys(items);
    let total = 0;

    for(let i = 0; i < keys.length; i++){
        if(keys[i] == name && items[keys[i]] != null){
            console.log('Name of the item: ', keys[i], ' Amount: ', items[keys[i]]);
            total += items[keys[i]];
        }
    }
    return total;
}
// ---------------------------------------------------------------


// Controllers:---------------------------------------------------


// To list all the survivors - Working
exports.listAllSurvivors = function(req, res) {
    Survivor.find({}, function(err, survivor) {

        res.json(survivor);
    })
    .catch(err => {
        res.send(err);
    });
};


// To create a new survivor - Working
exports.createASurvivor = function(req, res) {

    var newSurvivor = new Survivor(req.body);

    newSurvivor.save(function(err, survivor) {

        res.json(survivor);
    })
    .catch(err => {
        res.send(err);
    });
};

// To see the informations of one survivor - Working
exports.detailASurvivor = function(req, res) {
    Survivor.findById(req.params.survivorId, function(err, survivor) {

        res.json(survivor);
    })
    .catch(err => {
        res.send(err);
    });
};

// To update a survivor - Working
exports.updateASurvivor = function(req, res) {
    Survivor.findById({ _id: req.params.survivorId }, req.body, {new: true}, function(err, survivor) {

        // Only latitude and longitude must be updated
        if(req.body.latitude != null)
            survivor.latitude = req.body.latitude;

        if(req.body.longitude != null)
            survivor.longitude = req.body.longitude;

        // Saving modifications
        survivor.save(function(err, survivor) {

            res.json(survivor);
        });
    })
    .catch(err => {
        res.send(err);
    });
};

// To remove a survivor - Working
exports.deleteASurvivor = function(req, res) {
    Survivor.remove({ _id: req.params.survivorId }, function(err, survivor) {
        res.json({message: 'Survivor successfully removed'});
    })
    .catch(err => {
        res.send(err);
    })
};

// Will increase the number of reports for one survivor and verify if he's an infected - Working
exports.reportASurvivor = function(req, res) {
    Survivor.findById({_id: req.params.survivorId}, req.body.reports, {new: true}, function(err, survivor) {

        // Report's incrementation
        survivor.reports++;

        // He's an infected?
        if(survivor.reports >= 3)
            survivor.infected = true;
        
        survivor.save(function(err, survivor) {

            res.json(survivor);
        });
    })
    .catch(err => {
        res.send(err);
    });
};

exports.infos = function(req, res) {

    Survivor.find().then(survivors => {

        let total = 0;
        let infecteds = 0;
        let amountItems = 0;
        let avg = {
            'water': 0,
            'food': 0,
            'medications': 0,
            'ammunition': 0
        }
        let pointsLost = 0;

        for(let survivor of survivors){
            console.log('Survivor: ' + survivor.name);

            // Counting total number of survivors and number of infecteds
            if(survivor.infected)
                infecteds++;
            total++;

            // Counting the total amount of items
            let waters = getNumOfItems(survivor.items, 'water');
            let foods = getNumOfItems(survivor.items, 'food');
            let medications = getNumOfItems(survivor.items, 'medications');
            let ammunitions = getNumOfItems(survivor.items, 'ammunition');

            if(survivor.infected)
                pointsLost += WATER_VALUE * waters + 
                              FOOD_VALUE * foods +
                              MEDICATIONS_VALUE * medications +
                              AMMUNITION_VALUE * ammunitions;
            else{
                avg.water += waters;
                avg.food += foods;
                avg.medications += medications;
                avg.ammunition += ammunitions;
            }
        }

        // Making average
        avg.water = avg.water / (total - infecteds);
        avg.food = avg.food / (total - infecteds);
        avg.medications = avg.medications / (total - infecteds);
        avg.ammunition = avg.ammunition / (total - infecteds);

        res.json({
            'numOfSurvivors': total,
            'numOfInfecteds': infecteds,
            'percentOfSurvivors': 100 * (total - infecteds) / total,
            'percentOfInfecteds': 100 * infecteds / total,
            'pointsLost': pointsLost,
            'avgItemsPerSurvivor': avg
        });
    })
    .catch(err => {
        console.log('Promise rejected: ' + err);
        res.send(err);
    });
};
