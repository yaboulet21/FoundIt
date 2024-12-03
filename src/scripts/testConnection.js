import client from '../config/weaviate.js'; // Charger le client Weaviate

const testConnection = async () => {
    try {
        const schema = await client.schema.getter().do(); // Récupérer le schéma
        console.log('Weaviate schema:', schema);
    } catch (error) {
        console.error('Error connecting to Weaviate:', error.message); // Afficher les erreurs
    }
};

testConnection();
