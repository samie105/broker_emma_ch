import mongoose from "mongoose";

const mongoURI = process.env.CONNECTION_STRING;

// Establish the connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Log when successfully connected
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Log any errors during connection
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB:", err);
});

const addressSchema = new mongoose.Schema({
  Bitcoin: String,
  Ethereum: String,
  Tether: String,
  Tron: String,
  Dogecoin: String,
  Solana: String,
  Binance: String,
  USDC: String,
});

const AddressModel =
  mongoose.models.AddressPraiz ||
  mongoose.model("AddressPraiz", addressSchema);

export default AddressModel;
