import { MongoClient } from "mongodb";

async function connectToDatabase() {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.cicyz.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  console.log(connectionString)
  let client = await MongoClient.connect(connectionString);
  return client;
}

export default connectToDatabase;
