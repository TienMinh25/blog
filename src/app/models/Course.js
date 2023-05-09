const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Course = new Schema({
    _id: {type: Number, },
    name: {type: String, require: true},
    description: {type: String},
    image: {type: String},
    videoId: {type: String, require: true},
    level: {type: String},
    slug: { type: String, slug: 'name'},
}, {
    _id: false,
    timestamps: true,
});

// Custom query helpers
Course.query.sortable = function(req) {
    if (req.query.hasOwnProperty('_sort')){
        const isValidType = ['asc', 'desc'].includes(req.query.type);

        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
}

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all'
}); 

Course.plugin(AutoIncrement);

module.exports = mongoose.model('Course', Course);