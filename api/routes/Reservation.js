import express from "express";
import { createReservation, deleteReservation, getReservation, getReservations, updateReservation } from "../controllers/reservation.js";
import { verifyAdmin } from "./utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", createReservation);

// UPDATE
router.put("/:id", verifyAdmin, updateReservation);

// DELETE
router.delete("/:id", verifyAdmin, deleteReservation);

// GET
router.get("/find/:id", getReservation);

// GET ALL
router.get("/", getReservations);

// COUNT BY DURATION
// router.get("/countByDuration", countByDuration);

export default router;