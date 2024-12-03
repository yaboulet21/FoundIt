import ObjectModel from '../models/Object.js'; // Importer le modèle MongoDB
import weaviateClient from '../config/weaviate.js'; // Client Weaviate configuré
import { generateAttributes } from '../services/openaiService.js'; // Service pour la génération d'attributs

/**
 * Script pour vectoriser les objets existants dans MongoDB.
 */
const vectorizeObjects = async () => {
    try {
        console.log("🔄 Début de la vectorisation des objets existants...");

        // Récupérer tous les objets depuis MongoDB
        const objects = await ObjectModel.find();
        console.log(`✅ ${objects.length} objets trouvés dans MongoDB.`);

        for (const obj of objects) {
            console.log(`➡️ Traitement de l'objet avec ID : ${obj._id}`);

            // Générer les vecteurs à l'aide du service OpenAI
            const attributes = await generateAttributes(obj.description);

            if (!attributes.vector) {
                console.warn(`⚠️ Vecteur non généré pour l'objet ID : ${obj._id}. Passage au suivant.`);
                continue;
            }

            // Ajouter l'objet vectorisé à Weaviate
            const response = await weaviateClient.data
                .creator()
                .withClassName("TestClass") // Remplacez par le nom de votre classe Weaviate
                .withProperties({
                    name: obj.description, // Nom ou description de l'objet
                })
                .withVector(attributes.vector) // Vecteur généré
                .do();

            console.log(`✅ Objet vectorisé et ajouté à Weaviate : ${response.id}`);

            // Mettre à jour l'objet dans MongoDB avec le vecteur
            obj.vector = attributes.vector;
            await obj.save();
            console.log(`✅ Vecteur ajouté à l'objet dans MongoDB avec ID : ${obj._id}`);
        }

        console.log("🎉 Tous les objets ont été vectorisés avec succès !");
    } catch (error) {
        console.error("❌ Erreur lors de la vectorisation :", error.message);
    }
};

vectorizeObjects();
