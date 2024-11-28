import mongoose from 'mongoose';
import chai from 'chai';
import ObjectModel from '../src/models/Object.js';
import connectDB from '../src/config/db.js';

const expect = chai.expect;

describe('MongoDB Test', () => {
    before(async () => {
        await connectDB();
    });

    it('should create an object in the database', async () => {
        const testObject = await ObjectModel.create({
            description: 'Test Object',
            type: 'montre',
            status: 'trouvé',
            type_of_entry: 'staff'
        });
        expect(testObject).to.have.property('_id');
        expect(testObject.description).to.equal('Test Object');
    });

    after(async () => {
        await mongoose.connection.close();
    });
});
