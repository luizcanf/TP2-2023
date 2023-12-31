const bancoDados = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
//const { MongoClient } = require('mongodb');

const { config } = require('dotenv');
if (process.env.NODE_ENV !== 'PROD')
    config({ path: './config/.env.dev' });
else
    config({ path: './config/.env.prod' });

const uri = process.env.DB
/*const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
const collection = client.db("tp2").collection("operacoes");
console.log("Conectado ao banco de dados")
// perform actions on the collection object
client.close();
});*/

bancoDados.connect(uri)
    .then(conn => global.conn = conn.db("tp2"))
    .catch(err => console.log(err))

function busqueTodas() {
    return global.conn.collection("operacoes").find().toArray();
}

function busqueOperacao(ID_Op) {
    return global.conn.collection("operacoes").findOne(new ObjectId(ID_Op));
}

function salvar(operacao) {
    return global.conn.collection("operacoes").insertOne(operacao);
}

function apagarUmaOperacao(id) {
    return global.conn.collection("operacoes").deleteOne({ _id: ObjectId(id) });
}
module.exports = { busqueTodas, busqueOperacao, salvar, apagarUmaOperacao };