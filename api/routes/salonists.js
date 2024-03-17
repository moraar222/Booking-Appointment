import express from "express";

import {
  createSalonist,updateSalonist,deleteSalonist,getSalonist,getSalonists,
} from "../controllers/salonist.js";
//import Salonist from "../models/Salonist.js"
import { verifyAdmin} from "./utils/verifyToken.js";


const router = express.Router();

//CREATE

router.post("/", verifyAdmin, createSalonist);

//UPDATE
router.put("/:id", verifyAdmin, updateSalonist);

//DELETE
router.delete("/:id", verifyAdmin, deleteSalonist);

//GET
router.get("/find/:id", getSalonist);

//GET ALL
router.get("/", getSalonists);

export default router;
