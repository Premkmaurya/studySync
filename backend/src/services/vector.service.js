const aiMessageModel = require("../models/aiMessage.model");

// ✅ store vector inside existing document
async function createMemory({ vectors, metadata, messageId }) {
  try {
    if (!vectors?.length || !messageId) return;

    await aiMessageModel.findByIdAndUpdate(
      messageId,
      {
        embedding: vectors, // 🔥 store vector here
        ...(metadata && {
          text: metadata.text,
          userId: metadata.user,
          chatId: metadata.chat,
        }),
      },
      { new: true }
    );
  } catch (err) {
    console.error("MongoDB vector store error:", err.message);
  }
}

// ✅ vector search using MongoDB Atlas
async function queryMemory({ queryVector, limit = 5, metadata }) {
  try {
    if (!queryVector?.length) return [];

    const pipeline = [
      {
        $vectorSearch: {
          index: "vector_index", // 🔥 your Atlas index name
          queryVector,
          path: "embedding",
          numCandidates: 100,
          limit,
          ...(metadata &&
            Object.keys(metadata).length > 0 && {
              filter: metadata, // optional filtering
            }),
        },
      },
      {
        $project: {
          text: 1,
          chatId: 1,
          userId: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ];

    const results = await aiMessageModel.aggregate(pipeline);

    return results.map((item) => ({
      metadata: {
        text: item.text,
        chat: item.chatId,
        user: item.userId,
      },
      score: item.score,
    }));
  } catch (err) {
    console.error("MongoDB vector query error:", err.message);
    return [];
  }
}

module.exports = { createMemory, queryMemory };