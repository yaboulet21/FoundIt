import ObjectModel from '../models/Object.js';
import { generateAttributes } from '../services/openaiService.js';

export const searchObjects = async (req, res) => {
    const { description } = req.body;

    try {
        const attributes = await generateAttributes(description);
        const similarObjects = await ObjectModel.findSimilarObjects(attributes);

        if (similarObjects.length > 0) {
            return res.status(200).json(similarObjects);
        } else {
            return res.status(404).json({ message: "No matching objects found." });
        }
    } catch (error) {
        console.error("Error in searchObjects:", error.message);
        return res.status(500).json({ error: "Internal server error." });
    }
};
