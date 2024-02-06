let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

const DefaultNews = require("../Models/DefaultNews");
// post Model

router.get("/", async (req, res, next) => {
  try {
    const data = await DefaultNews.find().exec();
    res.json(data);
  } catch (error) {
    next(error);
  }
});


router.route("/create").post(async (req, res, next) => {
  try {
    const data = await DefaultNews.create(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});




// Update post
router.route("/update/:id").put(async (req, res, next) => {
  try {
    const data = await DefaultNews.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(data);
  } catch (error) {
    next(error);
  }
});


// Delete post
router.route("/delete/:id").delete(async (req, res, next) => {
  try {
    const data = await DefaultNews.findByIdAndDelete(req.params.id);
    if (data) {
      res.status(200).json({
        msg: "Post успешно удалено",
      });
    } else {
      res.status(404).json({
        msg: "Post not found",
      });
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;
