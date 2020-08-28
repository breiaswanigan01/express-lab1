"use strict";
const express = require("express");
const routes = express.Router();
// 1
const cartItems = [
  { id: 1, product: "Iphone 11 pro", price: 1200, quantity: 30 },
  { id: 2, product: "Apple headphones", price: 20, quantity: 50 },
  { id: 3, product: "Iphone 11 phone case", price: 20, quantity: 100 },
  { id: 4, product: "Airpods Pro", price: 250, quantity: 50 },
];

let nextId = 5;
// GET -- respond with JSON array of cart items
routes.get("/cartItems", (req, res) => {
  const maxPrice = parseInt(req.query.maxPrice);
  const prefix = req.query.prefix;
  const pageSize = req.query.pageSize;
  if (maxPrice) {
    const filteredProducts = cartItems.filter((item) => item.price <= maxPrice);
    res.json(filteredProducts);
  } else if (prefix) {
    const filteredProducts = cartItems.filter(
      (cartItems) => cartItems.product === prefix
    );
    res.json(filteredProducts);
    // NOT WORKING
  } else if (pageSize) {
    const filteredProducts = cartItems.slice(0, pageSize);
    res.json(filteredProducts);
  } else {
    res.json(cartItems);
  }
});

// 2
// GET /cartItems/:id - respond with the id's of the cart items
routes.get("/cartItems/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = cartItems.find((item) => item.id === id);
  // making 404  appear
  if (item) {
    res.json(item);
  } else {
    res.status(404);
    res.send("ID Not Found");
  }
  res.json(item);
});

//3
// POST -- add a cart item to te array
routes.post("/cartItems", (req, res) => {
  const item = req.body;
  item.id = nextId++;
  cartItems.push(item);
  res.status(201);
  res.json(item);
});
// 4
routes.put("/cartItems", (req, res) => {
  let id = parseInt(req.params.id);
  let index = cartItems.findIndex((item) => {
    return item.id === id;
  });

  cartItems[index] = req.body;
  cartItems[index].id = id;
  res.status(200);
  res.json(cartItems[index]);
});
// 5
// DELETE --remove an item from the array that has the given ID
routes.delete("/cartItems/:id", (req, res) => {
  console.log("ran DELETE");
  const id = parseInt(req.params.id);
  const index = cartItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  res.status(204);
  res.send();
});
module.exports = routes;
