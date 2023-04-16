import { Router, json } from "express";
import ProductManager from "../../dao/mongo/productManagerMongo.js";
import ChatManager from "../../dao/mongo/chatManagerMongo.js";
import { cartsModel } from "../../dao/models/carts.model.js";
import CartManager from "../../dao/mongo/cartManagerMongo.js";

const router = Router();
const productManager = new ProductManager();
const chatManager = new ChatManager();
const cartManager = new CartManager();

/* home */
router.get("/", async (req, res) => {
  const products = await productManager.getAll();
  res.render("home", {
    style: "home.css",
    title: "Home",
    products: products,
  });
});

/* realTimeProducts */
router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getAll();
  res.render("realTimeProducts", {
    style: "realTimeProducts.css",
    title: "Real Time Products",
    products: products,
  });
});

/* chat */
router.get("/chat", async (req, res) => {
  const messages = await chatManager.getAllMessages();
  res.render("chat", {
    style: "chat.css",
    title: "Chat",
    messages: messages,
  });
});

router.get("/products", async (req, res) => {
  res.render("products", {
    style: "products.css",
    title: "Products",
  });
});

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await cartManager.getById(cid);
  const cartsProducts = cart.products;
  res.render("carts", {
    style: "carts.css",
    title: "Carts",
    cart: JSON.stringify(cart),
    cartsProducts: JSON.stringify(cartsProducts),
  });
});

export default router;
