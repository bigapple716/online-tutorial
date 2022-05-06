let time2 = 0
function timer() {
    'use strict';
    //declare
    var output = document.getElementById('timer');
    var running = false;
    var timer;
  
    // timer start time
    var then;
    // pause duration
    var delay;

    // start timer
    var start = function () {
      delay = 0;
      running = true;
      then = Date.now();
      timer = setInterval(run, 51);
    };
  
    // parse time in ms for output
    var parseTime = function (elapsed) {
      // array of time multiples [hours, min, sec, decimal]
      var d = [3600000, 60000, 1000, 10];
      var time = [];
      var i = 0;
  
      while (i < d.length) {
        var t = Math.floor(elapsed / d[i]);
  
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
    var run = function () {
      // get output array and print
      var time = parseTime(Date.now() - then - delay);
      output.innerHTML = time[0] + ':' + time[1] + ':' + time[2] + '.' + time[3];
    };

    start()

  }
  

$(document).ready(function () {
    $("#nav-item-quiz").addClass("active");

    $("#start_quiz").click( function () {
        $(this).remove()
        $("#quiz-paragraph").css({"color":"black"});
        var r= $('<button class="btn paragraph-btn quiz_done" id="done_quiz" >Done </button>');
        $("#quiz_div").append(r);
        timer();
    });
    $(document).on('click', '#done_quiz', function() {
        console.log("hi")
        final_time = document.getElementById('timer').innerHTML;
        textarea = data["paragraph"]
        console.log("textarea",textarea)
        hour = final_time.slice(0, 1) * 60 * 60;
        min = final_time.slice(2, 4) * 60;
        sec = final_time.slice(5, 7) ;
        ms = final_time.slice(8, 10) / 1000.0;

        hours   = Math.floor(sec / 3600); // get hours
        minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
        seconds = (sec - (hours * 3600) - (minutes * 60)) + ms + hour + min; //  get seconds

        words = textarea.split(" ");
        num_words = words.length
        wpm = Math.round(num_words / (seconds / 60)) 
        console.log(wpm)

       window.location.href = '/quiz/technique1_questions/'+ data["quiz_id"] + "/" + wpm
    });

    $("#done_button").click( function () {
      $('input[name^="answers"]').each(function(){
          grade=0;
          if ($(this).is(":checked")) {
              if($(this).attr('id') == "correct" ){
                  grade=1
              }else{
                  grade=0
              }
              window.location.href = '/quiz/technique1_feedback/'+ grade + quiz['next_quiz']
              }
      });

      if ($('input[name="answers"]:checked').length == 0) {
        $(".warning").text("you must select one answer");
    }
  });   

    $("#next_round").click( function () {
      window.location.href = '/quiz/technique1/'+ next
      });
  })