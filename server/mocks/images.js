
/*jshint node:true*/
var imageGenerator = require('sjotorp-image');

module.exports = function(app) {
  var express = require('express');

  var imageRouter = express.Router();
  var imageApiRouter = express.Router();

  var images = "2017/05/01/134811_1.mp4,2017/03/21/141014_2.JPG,2017/03/11/224948.JPG,2017/02/14/155452.JPG,2017/02/14/091409.JPG,2017/02/14/091735.JPG,2017/02/14/091636.JPG,2017/02/13/142711.JPG,2017/02/13/144326.JPG,2017/02/13/141243.JPG,2017/02/13/132220.JPG,2017/02/13/132111.JPG,2017/02/13/085803.JPG,2017/02/13/141249.JPG,2017/02/13/142556.JPG,2017/02/13/142857.JPG,2017/02/12/160236.JPG,2017/02/12/170507.JPG,2017/02/12/170526.JPG,2017/02/11/135324.JPG,2017/02/11/135311.JPG,2017/02/11/135244.JPG,2017/02/03/135623.JPG,2017/02/03/135033.JPG,2017/02/03/135008.JPG,2017/02/03/135003.JPG,2017/02/03/135219.JPG,2017/02/03/113927.JPG,2017/02/03/113606.JPG,2017/02/03/112407.JPG,2017/02/03/135648.JPG,2017/02/03/134957.JPG,2017/02/02/162216.JPG,2017/02/02/162200.JPG,2017/02/02/162043.JPG,2017/02/02/211633.JPG,2017/02/02/103217.JPG,2017/02/02/000703.JPG,2017/02/02/000656.JPG,2017/02/02/150348.JPG,2017/02/01/235429.JPG,2017/02/01/203929.JPG,2017/02/01/170436.JPG,2017/02/01/170418.JPG,2017/02/01/153616.JPG,2017/02/01/153604.JPG,2017/02/01/153601.JPG,2017/02/01/153553.JPG,2017/02/01/114608.JPG,2017/02/01/114604.JPG,2017/02/01/113153.JPG,2017/02/01/103546.JPG,2017/02/01/083116.JPG,2017/02/01/203940.JPG,2017/01/31/184419.JPG,2017/01/31/160904.JPG,2017/01/30/151107.JPG,2017/01/30/171106.JPG,2017/01/30/151058.JPG,2017/01/29/175508.mp4,2017/01/29/142216.JPG,2017/01/29/142215.JPG,2017/01/27/195039.JPG,2017/01/27/170608.JPG,2017/01/26/180349.mp4,2017/01/26/165653.JPG,2017/01/26/165644.JPG,2017/01/26/164614.JPG,2017/01/26/120938.JPG,2017/01/24/161617.jpg,2017/01/24/161615.jpg,2017/01/24/161609.jpg,2017/01/24/161603.jpg,2017/01/24/161557.jpg,2017/01/24/112417.JPG,2017/01/24/111002.JPG,2017/01/23/180303.jpg,2017/01/23/180301.jpg,2017/01/23/170426.mp4,2017/01/23/170414.mp4,2017/01/23/172744.mp4,2017/01/22/150247.JPG,2017/01/22/184011.jpg,2017/01/22/183939.jpg,2017/01/22/161954.JPG,2017/01/22/161933.JPG,2017/01/22/150249.JPG,2017/01/22/183945.jpg,2017/01/22/145849.jpg,2017/01/22/145841.jpg,2017/01/22/145836.jpg,2017/01/22/184014.jpg,2017/01/22/184001.jpg,2017/01/21/135759.jpg,2017/01/21/135750.jpg,2017/01/21/135810.jpg,2017/01/20/174455.JPG,2017/01/20/191824.jpg,2017/01/20/191226.jpg,2017/01/20/191223.jpg,2017/01/20/180122.JPG,2017/01/20/174949.JPG,2017/01/20/174507.JPG,2017/01/20/191227.jpg,2017/01/20/145107.JPG,2017/01/20/075326.JPG,2017/01/20/075227.JPG,2017/01/20/075223.JPG,2017/01/20/065309.mp4,2017/01/20/191826.jpg,2017/01/19/143026.JPG,2017/01/19/142950.JPG,2017/01/19/142918.JPG,2017/01/19/142803.JPG,2017/01/19/104810.JPG,2017/01/19/104758.JPG,2017/01/18/180146.JPG,2017/01/18/175941.JPG,2017/01/18/180134.JPG,2017/01/17/151520.JPG,2017/01/17/151508.JPG,2017/01/17/151447.JPG,2017/01/17/115955.JPG,2017/01/16/183459.JPG,2017/01/16/183453.JPG,2017/01/16/183441.JPG,2017/01/16/175819.JPG,2017/01/16/175815.JPG,2017/01/16/175724.JPG,2017/01/16/174828.JPG,2017/01/16/173751.JPG,2017/01/16/131221.JPG,2017/01/16/124745.JPG,2017/01/16/124343.JPG,2017/01/16/124331.JPG,2017/01/16/124328.JPG,2017/01/16/094902.JPG,2017/01/16/094831.JPG,2017/01/15/165413.JPG,2017/01/15/165333.JPG,2017/01/15/165116.JPG,2017/01/15/155303.mp4,2017/01/15/150400.jpg,2017/01/15/150346.jpg,2017/01/15/140453.mp4,2017/01/14/145714.jpg,2017/01/14/155329.JPG,2017/01/14/152823.JPG,2017/01/14/152430.JPG,2017/01/14/151909.JPG,2017/01/14/151849.JPG,2017/01/14/151837.JPG,2017/01/14/150937.JPG,2017/01/14/150818.JPG,2017/01/14/150815.JPG,2017/01/14/150811.JPG,2017/01/14/150610.JPG,2017/01/14/133057.JPG,2017/01/14/133139.JPG,2017/01/14/133919.JPG,2017/01/14/134138.JPG,2017/01/14/150454.jpg,2017/01/14/145823.jpg,2017/01/14/150446.jpg,2017/01/14/150447.jpg,2017/01/14/150450.jpg,2017/01/13/184548.JPG,2017/01/13/114128.JPG,2017/01/13/080954.jpg,2017/01/13/080953.jpg,2017/01/12/161356.JPG,2017/01/12/144847.JPG,2017/01/12/113528.JPG,2017/01/12/113439.JPG,2017/01/12/104112.JPG,2017/01/12/161411.mp4,2017/01/12/145512.JPG,2017/01/12/174503.JPG,2017/01/11/184450.JPG,2017/01/11/172957.mp4,2017/01/11/172818.mp4,2017/01/10/120218.JPG,2017/01/10/120120.JPG,2017/01/10/110458.JPG,2017/01/10/110431.JPG,2017/01/10/172518.JPG,2017/01/09/133136.jpg,2017/01/09/133056.jpg,2017/01/09/125016.jpg,2017/01/09/125014.jpg,2017/01/09/125013.jpg,2017/01/09/122259.JPG,2017/01/09/115152.mp4,2017/01/09/110143.jpg,2017/01/09/110134.jpg,2017/01/09/103617.jpg,2017/01/09/103606.jpg,2017/01/09/103602.jpg,2017/01/09/103554.jpg,2017/01/09/102218.jpg,2017/01/09/102216.jpg,2017/01/09/094156.mp4,2017/01/09/133137.jpg,2017/01/08/004613.jpg,2017/01/08/003321.JPG,2017/01/08/112157.JPG,2017/01/07/162653.JPG,2017/01/07/231317.mp4,2017/01/07/230850.JPG,2017/01/07/230746.JPG,2017/01/07/230707.JPG,2017/01/07/225027.mp4,2017/01/07/224820.mp4,2017/01/07/224603.jpg,2017/01/07/220542.mp4,2017/01/07/214856.mp4,2017/01/07/213846.jpg,2017/01/07/213844.jpg,2017/01/07/213841.jpg,2017/01/07/213834.jpg,2017/01/07/203858.mp4,2017/01/07/200550.jpg,2017/01/07/200529.jpg,2017/01/07/200350.jpg,2017/01/07/200345.jpg,2017/01/07/200342.jpg,2017/01/07/190327.mp4,2017/01/07/185249.JPG,2017/01/07/175440.JPG,2017/01/07/175437.JPG,2017/01/07/175342.jpg,2017/01/07/175339.jpg,2017/01/07/175330.jpg,2017/01/07/163744.JPG,2017/01/07/162752.jpg,2017/01/07/162741.jpg,2017/01/07/162657.JPG,2017/01/07/131657.jpg,2017/01/07/162526.JPG,2017/01/07/162459.JPG,2017/01/07/161602.JPG,2017/01/07/160620.JPG,2017/01/07/131700.jpg,2017/01/07/231335.mp4,2017/01/07/131654.jpg,2017/01/07/131651.jpg,2017/01/07/131650.jpg,2017/01/07/131648.jpg,2017/01/07/131647.jpg,2017/01/07/131644.jpg,2017/01/07/131636.jpg,2017/01/07/131633.jpg,2017/01/07/131627.jpg,2017/01/07/131623.jpg,2017/01/07/125940.jpg,2017/01/07/125926.jpg,2017/01/07/124140.jpg,2017/01/07/124137.jpg,2017/01/07/121611.mp4,2017/01/07/115914.mp4,2017/01/07/115851.mp4,2017/01/07/114219.mp4,2017/01/07/110031.JPG,2017/01/06/213938.JPG,2017/01/06/162408.jpg,2017/01/06/162406.jpg,2017/01/06/152451.mp4,2017/01/06/213914.JPG,2017/01/05/185219.JPG,2017/01/05/160952.JPG,2017/01/05/110606.JPG,2017/01/05/095047.JPG,2017/01/05/094948.JPG,2017/01/04/203107.JPG,2017/01/04/203051.JPG,2017/01/04/123938.jpg,2017/01/04/123935.jpg,2017/01/04/115928.mp4,2017/01/04/115131.mp4,2017/01/04/115043.JPG,2017/01/04/114955.JPG,2017/01/04/114907.JPG,2017/01/04/114840.JPG,2017/01/04/114837.JPG,2017/01/04/114807.JPG,2017/01/04/114750.JPG,2017/01/04/114746.JPG,2017/01/04/114556.JPG,2017/01/04/114036.mp4,2017/01/04/111152.JPG,2017/01/04/111130.JPG,2017/01/04/111101.JPG,2017/01/04/104736.mp4,2017/01/04/103849.JPG,2017/01/04/103836.JPG,2017/01/03/093233.jpg,2017/01/02/094543.jpg,2017/01/02/164003.jpg,2017/01/02/164000.jpg,2017/01/02/163956.jpg,2017/01/02/163953.jpg,2017/01/02/174047.JPG,2017/01/02/130901.jpg,2017/01/02/120510.mp4,2017/01/02/120502.mp4,2017/01/02/120450.mp4,2017/01/02/094557.jpg,2017/01/02/130911.jpg,2017/01/01/004631.jpg,2017/01/01/165745.jpg,2017/01/01/141501.JPG,2017/01/01/133856.JPG,2017/01/01/132347.jpg,2017/01/01/132343.jpg,2017/01/01/132316.jpg,2017/01/01/132306.jpg,2017/01/01/120337.jpg,2017/01/01/120323.jpg,2017/01/01/120320.jpg,2017/01/01/120318.jpg,2017/01/01/115952.jpg,2017/01/01/115944.jpg,2017/01/01/000135.jpg";

  imageRouter.get('/info/:year/media.lst', function(req, res) {
    res.send(images.replace(new RegExp("2017", 'g'), req.params.year)).end();
  });

  function renderImage(f,width, height, addStripes, cb) {
    var color = imageGenerator.generateColor(f);
    imageGenerator.generateImage(width, height, color, function(err, image) {
      if(addStripes) {
        var whiteColor = {r: 255, g: 255, b: 255, a: 255};
        imageGenerator.addStripes(image.data, whiteColor, function(err, image) {
          cb(image.data);
        });
      } else {
        cb(image.data);
      }
    });
  }

  function sendImage(res, img) {
    res.contentType('image/jpeg');
    res.end(img);
  }

  var MAX = 16;
  var bigImages = [], smallImages = [], count = 0;
  function addBig(img) {
    bigImages.push(img);
  }
  function addSmall(img) {
    smallImages.push(img)
  }
  for(var i = 0; i < MAX; ++i) {
    var w = Math.round(100 + Math.random()*1820), h = Math.round(100 + Math.random()*980);
    renderImage(i,w, h, true, addBig);
    renderImage(i, 300, 200, false, addSmall);
  }

  function next() {
      ++count;
      if(count >= MAX) {
        count = 0;
      }
      return count;
  }

  imageRouter.get('/1920/:year/:month/:day/:file', function(req, res) {
    sendImage(res, bigImages[next()]);
  });

  imageRouter.get('/300/:year/:month/:day/:file', function(req, res) {
    sendImage(res, smallImages[next()]);
  });

  imageApiRouter.post('/delete',function(req,res){
      if(!req.body.length) {
        res.status(400).end("Missing post data");
        return;
      }
      res.end("OK");
  });

  app.use('/images/', imageRouter);
  app.use('/api/images/', imageApiRouter);
};
