import express from "express";
import auth from "../Utils/authMiddleware.js";
import { setMatching, allMatching } from "../Controllers/matchController.js";
import wrapAsync from "../Utils/wrapAsync.js";

const router = express.Router();

// Post: For creating and updating the Matching data.
// Get: Collect all similar user profiles with logged user.

router.use(wrapAsync(auth));
router.route("/").post(wrapAsync(setMatching)).get(wrapAsync(allMatching));

export default router;
