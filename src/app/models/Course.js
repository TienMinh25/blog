const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Course = new Schema({
    name: {type: String, require: true},
    description: {type: String},
    image: {type: String},
    videoId: {type: String, require: true},
    level: {type: String},
    slug: { type: String, slug: 'name'},
}, {
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

module.exports = mongoose.model('Course', Course);