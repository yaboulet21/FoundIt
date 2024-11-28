import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Connexion à MongoDB
import objectRoutes from './routes/objectRoutes.js'; // Routes pour les objets

// Charger les variables d'environnement
dotenv.config();

// Connecter à MongoDB
connectDB();

const app = express();

// Middleware pour le JSON
app.use(express.json());

// Route de base
app.get('/', (req, res) => {
    res.send('FoundIt Backend is running!');
});

// Routes API pour les objets
app.use('/api/objects', objectRoutes);

// Gestion des erreurs globales (optionnel, ajuster selon les besoins)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An error occurred!', error: err.message });
});

// Lancer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
