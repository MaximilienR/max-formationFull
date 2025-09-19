const { authMiddleware } = require("../middleware/auth");
const router = require("express").Router();
const {
  getAllCours,
  createCours,
  deleteCours,
  updateCours,
  getCoursById,
  createQuizz,
  getQuizzByCoursId,
  updateQuizz,
} = require("../controllers/cours.controller");

// Routes Cours
router.get("/", getAllCours);  
router.get("/:id", getCoursById); 
router.post("/", authMiddleware, createCours);
router.put("/:id", authMiddleware, updateCours);
router.delete("/:id", authMiddleware, deleteCours);

// Routes Quizz
router.post("/quizz", authMiddleware, createQuizz);
router.get("/quizz/cours/:coursId", getQuizzByCoursId); 
router.put("/quiz/:id", authMiddleware, updateQuizz);

module.exports = router;