import express from "express"
import { createStation, 
    deleteStation, 
    getStation, 
    getStations, 
    updateStation,
} from "../controllers/station.js"
import { verifyAdmin } from "./utils/verifyToken.js"

const router = express.Router();

router.post("/:salonid", verifyAdmin, createStation)


//UPDATE
router.put("/:id", verifyAdmin, updateStation)

//DELETE

router.delete("/:id/:salonid", verifyAdmin, deleteStation )

//Get
router.get("/:id", getStation)

//GET ALL

router.get("/", getStations)

export default router