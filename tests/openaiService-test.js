import { generateAttributes } from '../src/services/openaiService.js';
import { expect } from 'chai';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

describe('OpenAI Service Test', () => {
    it('should extract attributes from a description', async () => {
        const description = "A black leather watch with a round face.";
        const attributes = await generateAttributes(description);

        console.log("Generated Attributes:", attributes);

        // Validation des attributs extraits
        expect(attributes).to.be.an('object');
        expect(attributes).to.have.property('type');
        expect(attributes).to.have.property('color');
        expect(attributes).to.have.property('brand');
        expect(attributes.type).to.equal('watch');
        expect(attributes.color).to.equal('black');
    });
});

