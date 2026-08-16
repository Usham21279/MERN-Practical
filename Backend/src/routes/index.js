import express from "express";
const router = express.Router();
import User from "./user.js";


router.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome!!"
  })
})

router.use("/user", User);

export default router;