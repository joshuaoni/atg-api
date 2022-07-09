const handleRegister = (req, res, db, bcrypt) => {
    const {name, email, password, confirmPassword} = req.body;

    // hash the password for security
    const hash = bcrypt.hashSync(password, 8);

    if (password === confirmPassword) {
        db.insert({
            username: name.toLowerCase().trim(),
            email: email.toLowerCase().trim(),
            hash: hash
        })
        .into('login')
        .returning('*')
        .then(user => {
            res.json(user[0])
        })
        .catch(err => res.status(404).json('Email already registered'))
    } else {
        // passwords entered donot match
        res.json('Mismatch');
    }
}

module.exports = {
    handleRegister
}