const { Packing } = require('../db');
const packing = require('../data/packing.json')

const bulkCreatePacking = async() => {
    try {
        await Packing.bulkCreate(packing);
    } catch(err){
        console.log('ERROR in bulkCreatePacking', err);
    }
}

module.exports = {
    bulkCreatePacking
}
