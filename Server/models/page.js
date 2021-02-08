const mongoose =  require('mongoose');

const page = mongoose.Schema({
    urlName:{
        type:String,
        required:[true, 'url name is missing']
    },
    title:{
        type:String,
        required:[true, 'title is missing']
    },
    subTitle:{
        type:String
    },
    content:{
        type:Array,
        required:[true, 'content is missing']
    },
    metaTypes:{
        type:[],
    },
    createAt:{type:Date, default:Date.now}
},{ 
    collection:'pages',
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

module.exports = new mongoose.model('Pages', page, 'pages');