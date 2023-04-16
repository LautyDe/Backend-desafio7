import { cartsModel } from "../models/carts.model.js";
import { productsModel } from "../models/products.model.js";

export default class CartManager {
  async createCart() {
    try {
      const cart = await cartsModel.create({});
      return cart;
    } catch (error) {
      console.log(`Error creando carrito: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      const cart = await cartsModel
        .findOne({ _id: id })
        .populate("products.product")
        .lean();
      return cart;
    } catch (error) {
      console.log(
        `Error buscando el carrito con el id ${id}: ${error.message}`
      );
    }
  }

  async addToCart(cid, pid) {
    try {
      const cart = await cartsModel.findById(cid); //this.getById(cid);
      if (!cart) {
        throw new Error(`No se encontro un carrito con el id solicitado.`);
      } else {
        const product = await productsModel.findById(pid);
        if (!product) {
          throw new Error(`No se encontro el product con el id solicitado.`);
        } else {
          /* await cartsModel.findOneAndUpdate(
          { _id: cid },
          { $push: { products: { product: pid, quantity  } } }
        ); */
          const cartProduct = cart.products.find(
            product => product.product.toString() === pid
          );
          if (cartProduct) {
            console.log("$inc");
            await cartsModel.findByIdAndUpdate(cid, { $inc: { quantity: 1 } });
            //cartProduct.quantity++;
          } else {
            console.log("$push");
            await cartsModel.findOneAndUpdate(
              { _id: cid },
              { $push: { products: { product: pid, quantity: 1 } } }
            );
            //cart.products.push({ product: pid, quantity: 1 });
          }
          cart.save();
          return cart;
        }
      }
    } catch (error) {
      console.log(`Error agregando producto al carrito: ${error.message}`);
    }
  }
}
