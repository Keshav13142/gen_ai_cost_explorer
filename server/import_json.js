import { readFileSync } from "fs";
import { MongoClient } from "mongodb";

// Connection URL and Database Name
const url = "mongodb://localhost:27017"; // Update with your MongoDB server URL if different
const dbName = "ai_models"; // Replace with your database name
const collectionName = "models"; // Replace with your collection name

async function importData() {
  // Create a new MongoClient
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to MongoDB");

    // Select the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Read the transformed JSON file
    const data = readFileSync("transformedModels.json", "utf8");
    const models = JSON.parse(data);

    // Insert the data into the collection
    const result = await collection.insertMany(models);
    console.log(`${result.insertedCount} documents inserted`);
  } catch (err) {
    console.error("Error importing data:", err);
  } finally {
    // Close the connection
    await client.close();
  }
}

importData();
