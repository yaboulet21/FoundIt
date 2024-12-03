import weaviate from 'weaviate-client'; // Importer le client Weaviate
import dotenv from 'dotenv'; // Charger les variables d'environnement

// Charger les variables d'environnement depuis .env
dotenv.config();

if (!process.env.WEAVIATE_HOST) {
    console.error("❌ ERREUR : WEAVIATE_HOST est introuvable dans .env.");
    process.exit(1);
}

let client; // Déclaration de la variable client en dehors du bloc try-catch

try {
    // Initialiser le client Weaviate
    client = weaviate.client({
        scheme: 'http', // Protocole
        host: process.env.WEAVIATE_HOST, // Hôte Weaviate
        apiKey: process.env.WEAVIATE_API_KEY || undefined, // Facultatif, selon votre configuration
    });

    console.log('✅ Client Weaviate configuré avec succès pour :', process.env.WEAVIATE_HOST);
} catch (error) {
    console.error("❌ ERREUR : Impossible de configurer le client Weaviate.", error);
    process.exit(1);
}

// Exporter le client
export default client;
