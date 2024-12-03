import weaviate from 'weaviate-client';

(async () => {
  console.log("[LOG] Début du script de test Weaviate...");

  try {
    console.log("[LOG] Étape 1 : Initialisation du client Weaviate avec connectToLocal...");
    const client = await weaviate.connectToLocal();
    console.log("[LOG] Client initialisé avec succès.");

    console.log("[LOG] Étape 2 : Vérification de l'état du client (isReady)...");
    const isReady = await client.isReady();
    console.log("[LOG] État du client (isReady) :", isReady);

    if (!isReady) {
      console.error("[ERROR] Le client Weaviate n'est pas prêt. Vérifiez le serveur.");
      return;
    }
    console.log("[SUCCESS] Le client est prêt à interagir avec le serveur Weaviate.");

    console.log("[LOG] Étape 3 : Chargement des données JSON...");
    async function getJsonData() {
      const file = await fetch(
        'https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json'
      );
      return file.json();
    }

    console.log("[LOG] Étape 4 : Insertion des données dans la collection...");
    const data = await getJsonData();

    // Vérification des collections existantes
    const collections = await client.collections.list();
    console.log("[LOG] Collections disponibles :", collections);

    const questions = client.collections.get('Question');
    const result = await questions.data.insertMany(data);
    console.log("[SUCCESS] Réponse de l'insertion :", result);

    console.log("[LOG] Étape 5 : Fermeture du client...");
    await client.close();
    console.log("[LOG] Connexion au client fermée avec succès.");

  } catch (error) {
    console.error("[ERROR] Une erreur s'est produite :", error.message);
    console.error("[STACK TRACE]", error.stack);
  }

  console.log("[LOG] Fin du script de test Weaviate.");
})();
