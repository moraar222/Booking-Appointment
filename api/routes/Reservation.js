import express from "express";
import { 
     countByDay, createReservation,
     deleteReservation, 
     getReservation,
     getReservations,
     updateReservation,
} from "./controllers/reservation.js";
import Reservation from "../models/Reservation.js"
import { verifyAdmin } from "./utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createReservation)

//UPDATE
router.put("/:id", verifyAdmin, updateReservation)

//DELETE
router.delete("/:id", verifyAdmin, deleteReservation)

//Get
router.get("/find/:id", getReservation)

//GET ALL
router.get("/", getReservations)
router.get("/countByDay", countByDay)
// router.get("/countByType", countByType)


export default router