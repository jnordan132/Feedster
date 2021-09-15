const router = require("express").Router();
const { Test } = require("../models");

router.get("/", async (req, res) => {
    console.log("get test (node)");
    const examplePassedValue = "Cool string!";

    try {
        const testData = await Test.findAll({
            order: [["createdAt", "DESC"]],
        });
        const tests = testData.map((testRecord) =>
            testRecord.get({ plain: true })
        );
        console.log(tests);
        res.render("test", {
            exampleValueFromController: examplePassedValue,
            testsFromDb: tests,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
