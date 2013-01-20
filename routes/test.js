
/*
 * GET test page.
 */

exports.test = function(req, res){
	res.render('test_html', { title: 'Test Page'});
};