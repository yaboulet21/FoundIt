import { expect } from 'chai'; // Importation nommée
import mongoose from 'mongoose';
import ObjectModel from '../src/models/Object.js';
import connectDB from '../src/config/db.js';

describe('MongoDB Test', () => {
    before(async () => {
        await connectDB(); // Connecter à MongoDB
    });

    it('should create an object in the database', async () => {
        const testObject = await ObjectModel.create({
            description: 'Test Object',
            type: 'montre',
            status: 'trouvé',
            type_of_entry: 'staff',
        });

        // Vérifier que l'objet a été créé avec succès
        expect(testObject).to.have.property('_id');
        expect(testObject.description).to.equal('Test Object');
    });

    after(async () => {
        await mongoose.connection.close(); // Fermer la connexion
    });
});
