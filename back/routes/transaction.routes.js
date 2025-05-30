// routes/transaction.routes.js
import express from "express";
import auth from "../middleware/auth.midleware";
import { getMyBuys, getMySales } from "../controllers/transaction.controller";

const router = express.Router();

router.get("/transactions/buys", auth, getMyBuys);
router.get("/transactions/sales", auth, getMySales);

export default router;
