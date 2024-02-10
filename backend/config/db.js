import Mongoose from "mongoose";

const DB_Connect = async () => {
  try {
    const connection = Mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Mongo_DB connected success: ${(await connection).connection.host}`.bgCyan
        .bold
    );
  } catch (error) {
    console.error(`Mongo_DB Not Connected Error: ${error.message}`.bgRed.bold);
  }
};

export default DB_Connect;
