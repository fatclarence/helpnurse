import express from "express";
import {
  getSummaries,
  createSummary,
  updateSummary,
  deleteSummary,
} from "../controller/controller.js";

const router = express.Router();

router.get("/", getSummaries);
router.post("/", createSummary);
// router.get("/:id", getSummary);
router.patch("/:id", updateSummary);
router.delete("/:id", deleteSummary);

export default router;
