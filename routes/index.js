/*
 *
 */

exports.index = function(req, res) {
    res.render('index', {title: 'index pagina'});
};

exports.hb = function(req, res) {
    res.render('hb', {title: 'Handlebars test pagina'});
};
