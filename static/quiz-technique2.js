var keywords = []
var count = 1;
let fade_time = 400;
var interval = function(){ 
    $("span.keyword").fadeOut(fade_time, function(){        
        $(this).html(keywords[count]);        
        count++;        
        if(count == keywords.length) {
          $(this).fadeOut(fade_time);                 
          clearInterval(intervalId);  }   
        $(this).fadeIn(fade_time);    
    });
};

$(document).ready(function () {
    var next_time = Number(fade_time) + 100
    seconds = fade_time / 1000
    $("#current_speed").text("current speed is " + seconds  + " per word")
    intervalId = setInterval(interval, 1000);
    
    $("#start_quiz_techinque2").click( function () {
        console.log(fade_time)
        quizId = 1
        window.location.href = '/quiz/technique2/' + quizId + next_time
    });

    try {
        quiz_data = quiz["question"]
        quiz_id = quiz["quiz_id"]
        keywords = quiz_data
    }
    catch(err) {
       console.log(err)
    }

    $("#quiz2_done").click( function () {      
        window.location.href = '/quiz_questions/'+ quiz_id 
    });
    // Go to feedback 
    $("#quiz_questions_done").click( function () {
        $('input[name^="answers"]').each(function(){
            grade=0;
            if ($(this).is(":checked")) {
                if($(this).attr('id') == 1 ){
                    grade=1
                }else{
                    grade=0
                }
                window.location.href = '/quiz/feedback/'+ grade + data["next_quiz"]
                ;}
        });

        if ($('input[name="answers"]:checked').length == 0) {
            // var m= $('<span class="warning" > you must select one answer</span>');
            // $(".quiz_warning").append(m);
            console.log('no answer')
        }
    });   
  

    $("#next_round").click( function () {
        if (next=='e'){
            alert("No more rounds left. Click Ok to return to the quiz page")
        } else{
            fade_time = fade_time + 100;
            window.location.href = '/quiz/technique2/'+ next + next_time }
        });

      try{
        next = String(next)
        console.log(next)
      } catch(err){console.log(err)} 
    
});


