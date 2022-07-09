const handleUpdate = (req, res, db, bcrypt) => {
    const {username, password, confirmPassword} = req.body;

    // hash updated password for security
    const hash = bcrypt.hashSync(password, 8);

    if (password === confirmPassword) {
        db.select('*').from('login')
        .where({
            username: username.toLowerCase().trim()
        })
        .update({
            hash: hash
        })
        .returning('*')
        .then(user => {
            res.json(user[0])
        })
        .catch(err => res.status(404).json('An error occured'))
    } else {
        // passwords entered don't match
        res.json('Mismatch');
    }

}

module.exports = {
    handleUpdate
}
