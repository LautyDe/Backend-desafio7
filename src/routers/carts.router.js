import { Router } from "express";
//import CartManager from "../dao/fs/cartManagerFS.js";
import CartManager from "../dao/mongo/cartManagerMongo.js";
//import ProductManager from "../dao/fs/productManagerFS.js";
import ProductManager from "../dao/mongo/productManagerMongo.js";

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();
const notFound = { error: "Cart not found" };

/* ok: 200
   created: 201
   no content: 204
   bad request: 400
   forbidden: 403
   not found: 404
   internal server error: 500
    */

router.post("/", async (req, res) => {
  await cartManager.createCart();
  res.status(201).json({ mensaje: "Carrito creado con exito" });
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getById(cid);
  !cart ? res.status(404).json(notFound) : res.status(200).json(cart);
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartManager.addToCart(cid, pid);
  !cart ? res.status(404).json(notFound) : res.status(200).json(cart);
});

export default router;
