
/*
 * GET home page.
 */
var queue = require("../data/queue");
exports.index = function(req, res){
  res.render('index', { title: 'iQue Wait List', queue: queue });
};