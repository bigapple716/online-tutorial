var keywords = []
var count = 1;
var fade_time 


var interval = function(){ 
    $("span.keyword").fadeOut("fast", function(){        
        $(this).html(keywords[count]);        
        count++;        
        if(count == keywords.length) {
          $(this).fadeOut(1);                 
          clearInterval(intervalId);  }   
        $(this).fadeIn(0);    
    });
};


$(document).ready(function () {
    $("#nav-item-quiz").addClass("active");

    $("#start_quiz_techinque2").click( function () {
        quizId = 1
        window.location.href = '/quiz/technique2/' + quizId 
    });

    try {
        quiz_data = quiz["question"]
        quiz_id = quiz["quiz_id"]
        fade_time = quiz["speed"]
        keywords = quiz_data
    }
    catch(err) {
       console.log(err)
    }
    intervalId = setInterval(interval, fade_time);

    $("#quiz2_done").click( function () {      
        window.location.href = '/quiz_questions/'+ quiz_id 
    });
    // Go to feedback 
    $("#quiz_questions_done").click( function () {
        $('input[name^="answers"]').each(function(){
            grade=0;
            if ($(this).is(":checked")) {
                if($(this).attr('id') == "correct" ){
                    grade=1
                }else{
                    grade=0
                }
                window.location.href = '/quiz/feedback/'+ grade + data["next_quiz"]
                ;}
        });

        if ($('input[name="answers"]:checked').length == 0) {
            $(".warning").text("you must select one answer");
        }
    });   
   
    
});


