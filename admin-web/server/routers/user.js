const router = require("express").Router();

router.get('/user', (req, res) => {
    res.send('hello user!')
})

module.exports = router