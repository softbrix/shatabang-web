/*jshint node:true*/
module.exports = function(app) {
  var express = require('express');
  var listRouter = express.Router();


  listRouter.get('/list', function(req, res) {
    res.send(["2016"]).end();
    //res.send(["2016","2017","2050"]).end();
  });

  app.use('/api/dirs', listRouter);
};
