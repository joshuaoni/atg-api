const handleVerify = (req, res, db, bcrypt) => {
    const {username} = req.body;

    db.select('username').from('login')
    .where({
        username: username.toLowerCase().trim()
    })
    .then(data => {
        if (data.length) {
            res.json('User exists');
        } else {
            // database returns empty array
            res.status(400).json('User does not exist');
        }
    })
    .catch(err => res.status(400).json('User does not exist'))
}

module.exports = {
    handleVerify
}
