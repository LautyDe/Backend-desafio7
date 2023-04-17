import { Router } from "express";
import CartManager from "../dao/mongo/cartManagerMongo.js";
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
  const cart = await cartManager.createCart();
  res.status(201).json(cart);
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getById(cid);
  !cart ? res.status(404).json(notFound) : res.status(200).json(cart);
});

router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartManager.addToCart(cid, pid);
  const updatedCart = await cartManager.getById(cid);
  !cart ? res.status(404).json(notFound) : res.status(200).json(updatedCart);
});

router.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
});

export default router;
