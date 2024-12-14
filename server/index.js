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
  } finally {
    await client.close();
  }
}

run().catch(console.dir);


const router = express.Router();
const dbName = "CatNap";
const loginCollection = "CatNap_Login";
const catNapCollection = "Catnap_Data";


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

// Get one project
router.get("/get-data/:username", async (req, res) => {
  try {
    const { name } = req.params;
    const collection = await getCatNapCollection();
    const data = await collection.find({ name: name }).toArray();

    if (data.length === 0) {
      return res.status(404).json({ message: "Projekt nicht gefunden" });
    }

    res.status(200).json(data[0]);
  } catch (error) {
    console.error("Fehler:", error);
    res.status(500).json({ error: "Fehler beim Abrufen der Daten." });
  }
});

// Update
router.put("/update-data/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const data = req.body;

    if (!username || !data) {
      return res
        .status(400)
        .json({ error: "username und Daten sind erforderlich." });
    }

    const collection = await getCatNapCollection();
    const result = await collection.updateOne(
      { username: username },
      { $set: data }
    );

    console.log("Update-Ergebnis:", result);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Projekt nicht gefunden" });
    }

    res.status(200).json({ message: "Projekt erfolgreich aktualisiert" });
  } catch (error) {
    console.error("Fehler beim Aktualisieren:", error);
    res.status(500).json({ error: "Fehler beim Aktualisieren der Daten." });
  }
});

// Delete
router.delete("/delete-user/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const collection = await getCollection();
    const result = await collection.deleteOne({ username: username });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Projekt nicht gefunden" });
    }

    res.status(200).json({ message: "Projekt erfolgreich gelöscht" });
  } catch (error) {
    console.error("Fehler:", error);
    res.status(500).json({ error: "Fehler beim Löschen der Daten." });
  }
});

export default router;
