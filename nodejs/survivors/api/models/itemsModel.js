'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Table that'll contain all the items
var ItemSchema = new Schema({
    name: {
        type: [{
            type: String,
            enum: [{
                'Water': 4,
                'Food': 3,
                'Medication': 2,
                'Ammunition': 1
            }]
        }],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Survivor'
    }
});

module.exports = mongoose.model('Items', ItemSchema);