const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
require('dotenv').config();


const app = express()
const port = 5000

//middleware
app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3ftktcj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    const database = client.db('News-Portal');
    const newsCollection = database.collection('All-News');
    const categoriesCollection = database.collection('Categories');

    app.get('/all-news',async(req,res)=>{
        const query = {};
        const news = await newsCollection.find(query).toArray();
        res.send(news)
    })

    app.get('/categories',async (req,res)=>{
      const query = {};
      const categories = await categoriesCollection.find(query).toArray();
      res.send(categories)
    })

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('News Portal Server Running')
})

app.listen(port, () => {
  console.log(`News Portal Server Running on port:${port}`)
})