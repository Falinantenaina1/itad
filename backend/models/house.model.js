import mongoose from "mongoose";

const houseSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "The category is required"],
      enum: ["Ahofa", "Amidy"],
    },
    address: {
      type: String,
      required: [true, "The address is required"],
    },
    price: {
      type: Number,
      required: [true, "The price is required"],
    },
    city: String,
    description: String,
    commisssion: Number,
    caution: Number,
    status: {
      type: String,
      enum: ["Disponible", "Indisponible"],
      default: "Disponible",
    },
  },
  { timestamps: true }
);

const House = mongoose.model("House", houseSchema);

export default House;
