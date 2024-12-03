import weaviate from 'weaviate-client';

const client = weaviate.client({
    scheme: 'http', // Protocole
    host: 'localhost:8080', // Adresse de Weaviate en local
});

const testConnection = async () => {
    try {
        const schema = await client.schema.getter().do(); // Récupérer le schéma
        console.log('Weaviate schema:', schema);
    } catch (error) {
        console.error('Error connecting to Weaviate:', error.message);
    }
};

testConnection();
