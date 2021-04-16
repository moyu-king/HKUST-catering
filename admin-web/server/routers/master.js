const router = require("express").Router();

router.get('/master', (req, res) => {
    res.send('hello master!')
})

module.exports = router