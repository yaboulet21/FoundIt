import client from './config/weaviate.js';
import ObjectModel from './models/Object.js';

const indexData = async () => {
    const objects = await ObjectModel.find();
    for (const obj of objects) {
        try {
            await client.data.creator()
                .withClassName('Object')
                .withProperties({
                    description: obj.description,
                    type: obj.type,
                    color: obj.color,
                    brand: obj.brand,
                })
                .do();
            console.log(`Indexed object: ${obj.description}`);
        } catch (error) {
            console.error('Error indexing object:', error.message);
        }
    }
};

indexData();
