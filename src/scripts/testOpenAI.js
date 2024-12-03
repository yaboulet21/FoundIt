import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config(); // Charger les variables d'environnement

// Vérifier si la clé est chargée
if (!process.env.OPENAI_API_KEY) {
    console.error("❌ Clé API OpenAI introuvable dans .env !");
    process.exit(1);
}

console.log("✅ Clé API détectée :", process.env.OPENAI_API_KEY.substring(0, 10) + "*****");

// Initialiser OpenAI avec la clé API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

console.log("✅ Client OpenAI configuré avec succès.");

// Tester une requête simple
const testOpenAI = async () => {
    try {
        console.log("🔄 Envoi de la requête à OpenAI...");

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Quelle est la somme de 123 et 456 ?" }],
        });

        console.log("✅ Réponse OpenAI reçue :");
        console.log(JSON.stringify(response, null, 2));

        if (response?.choices?.[0]?.message?.content) {
            console.log("💬 Contenu de la réponse :", response.choices[0].message.content.trim());
        } else {
            console.error("⚠️ Pas de contenu détecté dans la réponse.");
        }

    } catch (error) {
        console.error("❌ Erreur lors de l'appel à l'API OpenAI :", error.message);

        if (error.response) {
            console.error("📋 Détails de l'erreur :", JSON.stringify(error.response.data, null, 2));
        }
    }
};

testOpenAI();

