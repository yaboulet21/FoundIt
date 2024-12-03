import weaviate from 'weaviate-client';

(async () => {
  try {
    console.log("[LOG] Initialisation du client Weaviate avec connectToLocal...");
    // Initialisation minimaliste
    const client = await weaviate.connectToLocal();
    console.log("[LOG] Client initialisé avec succès.");

    console.log("[LOG] Vérification de l'état du client (isReady)...");
    const clientReadiness = await client.isReady(); // Devrait retourner `true` si tout va bien
    console.log("[LOG] État du client :", clientReadiness);

    if (clientReadiness) {
      console.log("[SUCCESS] Le client est prêt à interagir avec le serveur Weaviate.");
    } else {
      console.error("[ERROR] Le client n'est pas prêt. Vérifiez la configuration Docker ou la connectivité.");
    }

    // Fermeture du client proprement
    await client.close();
    console.log("[LOG] Connexion au client fermée.");

  } catch (error) {
    console.error("[ERROR] Une erreur s'est produite :", error.message);
    console.error("[STACK TRACE]", error.stack);
  }
})();
