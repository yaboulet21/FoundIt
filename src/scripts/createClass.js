import client from '../config/weaviate.js';

const createClass = async () => {
    try {
        const schemaConfig = {
            class: 'Object',
            description: 'A class to store objects for lost and found',
            properties: [
                { name: 'description', dataType: ['text'] },
                { name: 'type', dataType: ['text'] },
                { name: 'color', dataType: ['text'] },
                { name: 'brand', dataType: ['text'] },
            ],
        };

        await client.schema.classCreator().withClass(schemaConfig).do();
        console.log('Class "Object" created successfully in Weaviate!');
    } catch (error) {
        console.error('Error creating class in Weaviate:', error);
    }
};

createClass();
