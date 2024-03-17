import express from "express";
import { 
     countByDuration, createReservation,
     deleteReservation, 
     getReservation,
     getReservations,
     updateReservation,
     getAvailableSlots,
     makeReservation,
} from "../controllers/reservation.js";
import { verifyAdmin } from "./utils/verifyToken.js"
const router = express.Router();

//CREATE
// router.post("/", verifyAdmin, createReservation)

//UPDATE
router.put("/:id", verifyAdmin, updateReservation)

//DELETE
router.delete("/:id", verifyAdmin, deleteReservation)

//Get
router.get("/find/:id", getReservation)
// router.get("/api/reservations/getAvailableSlots", getAvailableSlots)


//GET ALL
//GET ALL
router.get("/", getAvailableSlots)
router.post("/", makeReservation)

router.get("/countByDuration", countByDuration)
// router.get("/countByType", countByType)


export default router