const handleSignIn = (req, res, database, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
       return res.status(400).json('Incorrect Form of Submission');
    }
    database.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                database.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => res.json(user[0]))
                    .catch(err => res.status(400).json('Unable to find user'))
            } else {
                res.status(400).json('Wrong Email and Password Combination');
            }
        })
        .catch(err => res.status(400).json('Wrong Email and Password Combination'))
}

module.exports = {
    handleSignIn: handleSignIn
};