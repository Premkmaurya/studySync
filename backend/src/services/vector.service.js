const { Pinecone } = require('@pinecone-database/pinecone');
const { v4: uuidv4 } = require('uuid');

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const studySyncIndex = pc.index('studysync');

async function createMemory({ vectors, metadata }) {
  try {
    // 1. validate vectors
    if (!vectors || !Array.isArray(vectors) || vectors.length === 0) {
      console.warn("Skipping upsert: invalid vectors");
      return;
    }
    // 2. flatten if nested (common bug)
    if (Array.isArray(vectors[0])) {
      vectors = vectors.flat();
    }
    // 3. ensure no empty after flatten
    if (vectors.length === 0) {
      console.warn("Skipping upsert: vectors empty after flatten");
      return;
    }
    // 4. ensure numeric values
    if (typeof vectors[0] !== "number" || !vectors.every(v => typeof v === "number" && isFinite(v))) {
      console.warn("Skipping upsert: vectors not all finite numbers");
      return;
    }

   await studySyncIndex.upsert([
      {
        id: `3343434`,
        values: vectors, // replace with actual vectors
        metadata:{
          text: "This is a sample memory entry",
          user: "34344",
        },
      },
    ]);
  } catch (err) {
    console.error("Pinecone upsert error:", err.message);
  }
}

async function queryMemory({ queryVector, limit = 5, metadata }) {
  try {
    if (!queryVector || queryVector.length === 0) return [];

    const data = await studySyncIndex.query({
      vector: queryVector,
      topK: limit,
      filter:
        metadata && Object.keys(metadata).length > 0
          ? metadata
          : undefined,
      includeMetadata: true,
    });

    return data.matches || [];
  } catch (err) {
    console.error("Pinecone query error:", err.message);
    return [];
  }
}

module.exports = { createMemory, queryMemory };