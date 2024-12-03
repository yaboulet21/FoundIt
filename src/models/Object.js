import mongoose from 'mongoose';

const objectSchema = new mongoose.Schema({
    description: { type: String, required: true },
    type: { type: String, required: true },
    color: { type: String },
    brand: { type: String },
    other_details: { type: String },
    lost_location: { type: String },
    status: { type: String, enum: ['trouvé', 'perdu'], required: true },
    type_of_entry: { type: String, enum: ['staff', 'user'], required: true },
    user_phone: { type: String },
    timestamp: { type: Date, default: Date.now },
    vector: { type: [Number], default: [] }
});

objectSchema.statics.findSimilarObjects = async function (attributes) {
    return this.find({
        type: attributes.type,
        color: attributes.color,
    }).limit(5); // Limiter à 5 résultats similaires
};

const ObjectModel = mongoose.model('Object', objectSchema);

export default ObjectModel;
