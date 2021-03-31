const Parts = require("../DB_Models/Parts.js").Model;

exports.getAllParts = () => {
    return Parts.find({}).exec();
}

exports.getPartByName = (__name__) => {
    return Parts.findOne({name: __name__}).exec();
}

exports.getPartByID = (__id__) => {
    return Parts.findById(__id__).exec();
}

exports.changePartByID = (id, part) => {
    return Parts.findByIdAndUpdate(id, {$set: part}, { new: true , }).exec();
}

exports.removePartByName = (__name__) => {
    return Parts.remove({name: __name__}).exec();
}