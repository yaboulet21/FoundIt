import client from '../config/weaviate.js';

const testConnection = async () => {
    try {
        const schema = await client.schema.getter().do();
        console.log('Weaviate connection successful:', schema);
    } catch (error) {
        console.error('Weaviate connection failed:', error.message);
    }
};

testConnection();
