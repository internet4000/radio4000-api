/*
 * Create documentation
 * for existing enpoints, but wrong path
 * */

module.exports = function(req, res, usage = '') {
	res.status(404).json({
		message: 'NOT FOUND',
		usage: host + req.path + usage
	})
}
