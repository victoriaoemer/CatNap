import dotenv from "dotenv";
import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config();

const uri = process.env.MONGODB_URI;



// connect to MongoDB

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error("Connection error:", error);
    process.exit(1);
  }
}

run();


const router = express.Router();
const dbName = "CatNap";
const loginCollection = "CatNap_Login";
const catNapCollection = "CatNap_Data";


async function getLoginCollection() {
  return client.db(dbName).collection(loginCollection);
}

async function getCatNapCollection() {
  return client.db(dbName).collection(catNapCollection);
}

// ------------- ROUTES -------------

// Create
router.post("/create-user", async (req, res) => {
  try {
    const data = req.body;
    const collection = await getLoginCollection();
    await collection.insertOne(data);
    res.status(200).json({ message: "Daten erfolgreich gespeichert" });
  } catch (error) {
    console.error("Fehler:", error);
    res.status(500).json({ error: "Fehler beim Speichern der Daten." });
  }
});

// Get
router.get("/get-users", async (req, res) => {
  try {
    const collection = await getLoginCollection();
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (error) {
    console.error("Fehler:", error);
    res.status(500).json({ error: "Fehler beim Abrufen der Daten." });
  }
});

// Update one user
router.put("/update-user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const newEntry = req.body; // Direkter Zugriff auf den gesendeten Eintrag
    const collection = await getLoginCollection();
    await collection.updateOne({ username }, { $set: newEntry });
    res.status(200).json({ message: "Daten erfolgreich aktualisiert" });
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Daten:", error);
    res.status(500).json({ error: "Fehler beim Aktualisieren der Daten." });
  }
});



// Create user data
router.post("/create-data", async (req, res) => {
  try {
    const data = req.body;
    const collection = await getCatNapCollection();
    await collection.insertOne(data);
    res.status(200).json({ message: "Daten erfolgreich gespeichert" });
  } catch (error) {
    console.error("Fehler:", error);
    res.status(500).json({ error: "Fehler beim Speichern der Daten." });
  }
});

// Get one user data
router.get("/get-data/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const collection = await getCatNapCollection();
    const data = await collection.find({ username }).toArray();

    if (data.length === 0) {
      return res.status(404).json({ message: "Projekt nicht gefunden" });
    }

    res.status(200).json(data[0]);
  } catch (error) {
    console.error("Fehler:", error);
    res.status(500).json({ error: "Fehler beim Abrufen der Daten." });
  }
});

// Update user data
router.put("/update-data/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const newEntry = req.body; // Direkter Zugriff auf den gesendeten Eintrag
    const collection = await getCatNapCollection();

    const formattedDate = new Date().toLocaleDateString("en-GB");

    // wenn bereits ein eintrag bei einem Datum existiert, dann wird dieser überschrieben

    await collection.updateOne(
      { username },
      { $set: { [`data.${formattedDate}`]: newEntry } },
      { upsert: true }
    );

    res.status(200).json({ message: "Daten erfolgreich aktualisiert" });
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Daten:", error);
    res.status(500).json({ error: "Fehler beim Aktualisieren der Daten." });
  }
});

// Update user settings
router.put("/update-settings/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const newEntry = req.body;
    const collection = await getCatNapCollection();

    await collection.updateOne(
      { username },
      { $set: { settings: newEntry } },
      { upsert: true }
    );

    res.status(200).json({ message: "Daten erfolgreich aktualisiert" });
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Daten:", error);
    res.status(500).json({ error: "Fehler beim Aktualisieren der Daten." });
  }
});

// Reset user data
router.put("/reset-data/:username", async (req, res) => {
  // delete de entire data object including the "data" key
  try {
    const { username } = req.params;
    const collection = await getCatNapCollection();
    await collection.updateOne
      ({ username }, { $unset: { data: "" } });
    res.status(200).json({ message: "Daten erfolgreich zurückgesetzt" });
  } catch (error) {
    console.error("Fehler beim Zurücksetzen der Daten:", error);
    res.status(500).json({ error: "Fehler beim Zurücksetzen der Daten." });
  }
});

// delete user and user data
router.delete("/delete-user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const collection = await getLoginCollection();
    const collectionData = await getCatNapCollection();
    await collection.deleteOne({ username });
    await collectionData.deleteOne({ username });
    res.status(200).json({ message: "Daten erfolgreich gelöscht" });
  } catch (error) {
    console.error("Fehler beim Löschen der Daten:", error);
    res.status(500).json({ error: "Fehler beim Löschen der Daten." });
  }
});


export default router;
