const handleLogin = (req, res, db, bcrypt) => {
    const {username, password} = req.body;
    
    db.select('username', 'hash').from('login')
    .where({
        username: username.toLowerCase().trim()
    })
    .then(data => {
        // compare password with password in database
        const passwordValid = bcrypt.compareSync(password, data[0].hash); 
        if (passwordValid) {
            db.select('*').from('login')
            .where({
                username: username.toLowerCase().trim()
            })
            .returning('*')
            .then(user => res.json(user[0]))       
            .catch(err => res.status(400).json('An error occured'))
        } else {
            // password not valid
            res.status(400).json('Forgot username and/or password');
        }
    })
    .catch(err => res.status(400).json('Forgot username and/or password')); // username not valid
}

module.exports = {
    handleLogin
}
