const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '63b79a318efd4dea8d258d8c230cda0a'
});

const handleApiCall = (req, res) => {
    app.models
      .predict('f76196b43bbd45c99b4f3cd8e8b40a8a', req.body.input)
      .then(data => res.json(data))
      .catch(err => res.status(400).json('Error with API Calls'))
}

const handleImage = (req, res, database) => {
    const { id } = req.body;
    database('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            if (entries.length) {
                res.json(entries[0]);
            } else {
                res.status(400).json('Unable to get entries');
            }
        })
}

module.exports = {
    handleApiCall: handleApiCall,
    handleImage: handleImage
};