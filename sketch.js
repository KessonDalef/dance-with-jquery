var cols = ["#ffffff", "#000000"];
var colsel = 0;
var numasd = 0;

var texts = ["YEHOOO!!", "YEHAAAA!!", "HEEEEEE!!!", "HOOOOO!!", "WOHOOO!!", "EEEEEE!!!"];
var txtsel = 0;

var input;
var fft;
var peak;

function setup() {
  noCanvas();
  input = new p5.AudioIn();

  input.start();

  fft = new p5.FFT(0.001);
  fft.setInput(input);

  peak = new p5.PeakDetect(60, 80, 0.4);

  //$('#upvolume').fadeOut('0');
  //$('#downvolume').fadeOut('0');
  $('#upvolume').hide();
  $('#downvolume').hide();

  setTimeout(function() {
    $('#sound').fadeOut('250');
    //$('#upvolume').show();
    //$('#downvolume').show();
    $('#upvolume').fadeIn('250');
    $('#downvolume').fadeIn('250');
  }, '50');
}

function draw() {
  volume = fft.analyze();
  vol = input.getLevel();
  peak.update(fft);

  $('#upvolume').css('width', '' + vol * 100 + '%');
  $('#downvolume').css('width', '' + vol * 100 + '%');

  if (peak.isDetected) {
    adding();
  }
}

function adding() {
  var name = 'asd' + numasd;
  var callname = '.' + name;
  //console.log(name);
  $('body').append('<div id="dv" class="asd' + numasd + '"> </div>');
  $('' + callname).css('background-color', '' + cols[colsel]);
  //$('' + callname).css('z-position', '' + numasd);
  $('' + callname).animate({
    width: '100%'
  }, {
    duration: 250,
    queue: false,
    complete: function() {
      $('' + callname).remove();
      var colz = '';
      var x = $(this).css('backgroundColor');
      var parts = x.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      delete(parts[0]);
      for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
      }
      colz = '#' + parts.join('');
      $('body').css('background-color', '' + colz);
      $('#yeho').css('color', '' + cols[colsel]);
      $('#yeho').html('' + texts[floor(Math.random() * (texts.length - 1))]);
      txtsel++;
      txtsel = txtsel % 2;
    }
  });
  $('' + callname).animate({
    height: '100%'
  }, {
    duration: 250,
    queue: false
  });
  colsel++;
  colsel = colsel % 2;
  numasd++;
}