let context = {
    'title': 'home',
}

module.exports.home = (req, res) => {
    return res.render('home', context);
}