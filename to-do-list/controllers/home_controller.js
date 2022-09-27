let context = {
    'title': 'home',
}

module.exports.home = (req, res) => {

    res.cookie('user_id', 25); //Manually changing the value;
    console.log(req.cookies); // print cookie;
    return res.render('home', context);
}

