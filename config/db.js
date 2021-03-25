import mongoose from 'mongoose';
import chalk from 'chalk';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(
      chalk.cyanBright.underline(`MongoDB Connected: ${conn.connection.host}`)
    );
  } catch (error) {
    console.error(
      chalk.redBright.underline(`MongoDB Connection Error: ${error.message}`)
    );
    process.exit(1);
  }
};

export default connectDB;
