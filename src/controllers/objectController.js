import ObjectModel from '../models/Object.js';
import { generateAttributes } from '../services/openaiService.js';
import weaviateClient from '../config/weaviate.js'; // Import du client Weaviate configuré

/**
 * Rechercher des objets similaires à partir d'une description donnée.
 * @param {*} req - Requête HTTP (contient la description dans req.body)
 * @param {*} res - Réponse HTTP
 */
export const searchObjects = async (req, res) => {
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ error: "Description is required." });
    }

    try {
        // 1. Générer les attributs et un vecteur pour la description.
        const attributes = await generateAttributes(description);

        if (!attributes.vector) {
            return res.status(500).json({ error: "Vector generation failed." });
        }

        // 2. Recherche dans Weaviate (recherche vectorielle).
        const weaviateResults = await weaviateClient.graphql.get()
            .withClassName("TestClass") // Nom de la classe dans Weaviate
            .withFields("name _additional { id, vector, distance }")
            .withNearVector({
                vector: attributes.vector, // Le vecteur généré par OpenAI
                certainty: 0.7 // Facultatif, ajuster selon vos besoins
            })
            .withLimit(10) // Limiter les résultats à 10 objets
            .do();

        let similarObjects = [];

        if (weaviateResults?.data?.Get?.TestClass?.length > 0) {
            similarObjects = weaviateResults.data.Get.TestClass.map(obj => ({
                id: obj._additional.id,
                name: obj.name,
                distance: obj._additional.distance,
            }));
        }

        // 3. Recherche supplémentaire dans MongoDB (par attributs).
        const mongoResults = await ObjectModel.findSimilarObjects(attributes);

        // 4. Combiner et renvoyer les résultats.
        const combinedResults = [
            ...similarObjects,
            ...mongoResults.map(obj => ({
                id: obj._id,
                name: obj.name,
                source: "MongoDB", // Indique la source des résultats
            }))
        ];

        if (combinedResults.length > 0) {
            return res.status(200).json(combinedResults);
        } else {
            return res.status(404).json({ message: "No matching objects found." });
        }
    } catch (error) {
        console.error("Error in searchObjects:", error.message);
        return res.status(500).json({ error: "Internal server error." });
    }
};
