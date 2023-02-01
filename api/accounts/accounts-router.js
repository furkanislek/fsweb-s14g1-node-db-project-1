const express = require("express");
const router = require("express").Router();
const AccountsModel = require("./accounts-model");
const AccountMiddleware = require("./accounts-middleware");

router.use(express.json());

router.get("/", async (req, res, next) => {
  try {
    const accounts = await AccountsModel.getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", AccountMiddleware.checkAccountId, (req, res, next) => {
  try {
    res.json(req.account);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/",
  AccountMiddleware.checkAccountPayload,
  AccountMiddleware.checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const newAccount = await AccountsModel.create({
        name: req.body.name.trim(),
        budget: req.body.budget,
      });
      res.status(201).json(newAccount);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  AccountMiddleware.checkAccountId,
  AccountMiddleware.checkAccountPayload,
  async (req, res, next) => {
    try {
      const updated = await AccountsModel.updateById(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:id",
  AccountMiddleware.checkAccountId,
  async (req, res, next) => {
    try {
      const deleted = await AccountsModel.deleteById(req.params.id);
      res.json(deleted);
    } catch (err) {
      next(err);
    }
  }
);

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = router;
