import db from '../db'

const { Packing } = db;
import packing from '../data/packing.json';

const bulkCreatePacking = async() => {
    try {
        await Packing.bulkCreate(packing);
    } catch(err){
        console.log('ERROR in bulkCreatePacking', err);
    }
}