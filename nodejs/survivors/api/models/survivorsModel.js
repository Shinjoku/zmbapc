'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Table that'll contain all the survivors
var SurvivorSchema = new Schema({
    name: {
        type: String,
        Required: 'Give a name to this survivor'
    },
    age: {
        type: Number,
        Required: 'Age of the survivor'
    },
    gender: {
        type: [{
            type: String,
            enum: ['M', 'F']
        }],
        Required: 'Gender'
    },
    items: {
        water: Number,
        food: Number,
        medications: Number,
        ammunition: Number,
    },
    location: {
        latitude: String,
        longitude: String
    },
    reports: {
        type: Number,
        default: 0
    },
    infected: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Survivors', SurvivorSchema);