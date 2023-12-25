/* Author: Taha Zanzibarwala */

const {MongoClient} = require('mongodb')

const uri = "mongodb+srv://dbUser:RD5elI20H6SZculO@nomadicpen.y06qiep.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect();
const db = client.db("nomadicPen");

const fetchTravelGuidePreviews = async (req, res) => {
    try {
        const articles = db.collection("articles");

        const featuredArticles = await articles.find({article_tags:"TG"}).toArray();
        res.send(featuredArticles)
    }catch (error) {
        console.error(error);
    }
}

const fetchFeatureCities = async (req, res) => {
    try{
        const articles = db.collection("featureCities");

        const featureCities = await articles.findOne({});
        res.send(featureCities);
    }catch (error) {
        console.error(error);
    }
}

const fetchFeatureDurations = async (req, res) => {
    try{
        const articles = db.collection("featureDurations");

        const featureDurations = await articles.findOne({});
        res.send(featureDurations);
    }catch (error) {
        console.error(error);
    }
}

const fetchTravelGuideArticle = async (req, res) => {
    const {id} = req.params;
    try{
        const articles = db.collection("articles");
        const featuredArticles = await articles.find({article_id:id.toString()}).toArray();
        res.send(featuredArticles)
    }catch (error) {
        console.error(error);
    }
}

const closeDbConnection = async () => {
    try {
        await client.close();
    }catch (error) {
        console.error(error);
    }
}

module.exports = {fetchTravelGuidePreviews, fetchFeatureCities, fetchFeatureDurations, closeDbConnection, fetchTravelGuideArticle};