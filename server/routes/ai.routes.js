const express=require("express")
const {generateAI}=require("../controllers/ai.controller");

const router=express.Router();

router.post("/generate",generateAI);

module.exports=router;