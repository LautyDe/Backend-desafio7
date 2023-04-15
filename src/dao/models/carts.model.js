import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number },
    },
  ],
});

/* const cartsSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true,
    default: [],
  },
}); */

export const cartsModel = mongoose.model("Carts", cartsSchema);
