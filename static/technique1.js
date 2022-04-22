function stopwatch_audio() {
  'use strict';

  let white_noise = new Audio('/static/data/white-noise-10min.mp3');
  white_noise.loop = true;

  //declare
  let output = document.getElementById('timer');
  let toggle = document.getElementById('toggle');
  let clear = document.getElementById('clear');
  let running = false;
  let paused = false;
  let timer;

  // timer start time
  let then;
  // pause duration
  let delay;
  // pause start time
  let delayThen;

  // start timer
  let start = function () {
    delay = 0;
    running = true;
    then = Date.now();
    timer = setInterval(run, 51);
    toggle.innerHTML = 'Stop';
    clear.disabled = true;

    white_noise.play();  // audio control
  };

  // parse time in ms for output
  let parseTime = function (elapsed) {
    // array of time multiples [hours, min, sec, decimal]
    let d = [3600000, 60000, 1000, 10];
    let time = [];
    let i = 0;

    while (i < d.length) {
      let t = Math.floor(elapsed / d[i]);

      // remove parsed time for next iteration
      elapsed -= t * d[i];

      // add '0' prefix to m,s,d when needed
      t = (i > 0 && t < 10) ? '0' + t : t;
      time.push(t);
      i++;
    }

    return time;
  };

  // run
  let run = function () {
    // get output array and print
    let time = parseTime(Date.now() - then - delay);
    output.innerHTML = time[0] + ':' + time[1] + ':' + time[2] + '.' + time[3];
  };

  // stop
  let stop = function () {
    paused = true;
    delayThen = Date.now();
    toggle.innerHTML = 'Resume';
    clear.dataset.state = 'visible';
    clear.disabled = false;
    clearInterval(timer);

    // call one last time to print exact time
    run();

    // audio control
    white_noise.pause();
    white_noise.currentTime = 0;
  };

  // resume
  let resume = function () {
    paused = false;
    delay += Date.now() - delayThen;
    timer = setInterval(run, 51);
    toggle.innerHTML = 'Stop';
    clear.dataset.state = '';
    clear.disabled = true;

    white_noise.play();  // audio control
  };

  // clear
  let reset = function () {
    running = false;
    paused = false;
    toggle.innerHTML = 'Start';
    output.innerHTML = '0:00:00.00';
    clear.dataset.state = '';
    clear.disabled = true;

    white_noise.pause();  // audio control
  };

  // evaluate and route
  let router = function () {
    if (!running) start();
    else if (paused) resume();
    else stop();
  };

  clear.disabled = true;
  toggle.addEventListener('click', router);
  clear.addEventListener('click', reset);
}

function check_first_last_paragraph(data) {
  let paragraph_list = data["paragraphs"][level];

  // check whether current paragraph is the last one
  if (paragraph_idx - 1 < 0) {
    console.log('prev-paragraph-btn hidden');
    $("#prev-paragraph-btn").hide();
  }

  // check whether current paragraph is the last one
  if (paragraph_idx + 1 >= paragraph_list.length) {
    console.log('next-paragraph-btn hidden');
    $("#next-paragraph-btn").hide();
  }
}

function check_last_level() {
  let paragraph_list = data["paragraphs"][level];

  if (next_level === '' || paragraph_idx + 1 < paragraph_list.length) {
    console.log('next-level-btn hidden');
    $("#next-level-btn").hide();
  }
}

$(document).ready(function () {
  stopwatch_audio();
  check_first_last_paragraph(data);
  check_last_level();
})