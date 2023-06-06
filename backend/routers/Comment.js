const express = require("express");
const router = express.Router();
const CommentDB = require("../models/Comment");

router.post("/:id", async (req, res) => {
    const commentData = new CommentDB({
        question_id: req.body.question_id,
        comment: req.body.comment,
        user: req.body.user,
    });

    await commentData
        .save()
        .then((doc) => {
            res.status(201).send(
                {
                    status: true,
                    data: doc
                }
            );
        })
        .catch((err) => {
            res.status(400).send({
                status: false,
                message: "Comments not added successfully",
            });
        });
});

module.exports = router;