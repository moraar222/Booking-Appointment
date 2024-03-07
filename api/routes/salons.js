import express from "express";
import { 
     countByCity, countByType, createSalon,
     deleteSalon, 
     getSalon,
     getSalons,
     updateSalon,
} from "../controllers/salons.js";
import Salon from "../models/Salon.js"
import { verifyAdmin } from "./utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createSalon)

//UPDATE
router.put("/:id", verifyAdmin, updateSalon)

//DELETE
router.delete("/:id", verifyAdmin, deleteSalon)

//Get
router.get("/find/:id", getSalon)

//GET ALL
router.get("/", getSalons)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)


export default router