function getInputSelection(el) {
    var start = 0, end = 0, normalizedValue, range,
        textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();

        if (range && range.parentElement() == el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");

            // Create a working TextRange that lives only in the input
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());

            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = el.createTextRange();
            endRange.collapse(false);

            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }

    return {
        start: start,
        end: end
    };
}


$(document).ready(function(){
    $("#nav-item-learn").addClass("active");

    var numberOfElementsRead = 0;
    var indexNum = 0

    $('#myBtn1').on("click", function() {
        txt = data["reading"]
        let elemId = 0
        /* document.getElementById("texto").innerHTML = txt*/
        document.getElementById("texto").innerHTML = ""
        elem_list = txt.split(" ")
        /*$('#texto').each(function() {*/
        while (elemId < elem_list.length){
            document.getElementById("texto").innerHTML += '<span class = "text-chopped" id = "'+ elemId + '">'+ elem_list[elemId] + " " + "</span>";
            elemId++;
        }
        /*);
        */
        numberOfElementsRead = 0;
    })
    $('#myBtn2').on("click", function() {
        txt = data["reading_hard"]
        let elemId = 0
        document.getElementById("texto").innerHTML = ""
        elem_list = txt.split(" ")
        /*$('#texto').each(function() {*/
        while (elemId < elem_list.length){
            document.getElementById("texto").innerHTML += '<span class = "text-chopped" id = "'+ elemId + '">'+ elem_list[elemId] + " " + "</span>";
            elemId++;
        }
        /* Set the id of the element */
        /* Set the id of the element */
        numberOfElementsRead = 0;
    })

 

    $(document).mousemove(function(event){
        /* console.log(`${event.pageX}, ${event.pageY}`); */
        {
            $(".text-chopped").mouseover(function() {
                   
                   elemId = parseInt($(this).attr('id'))
                   console.log(`Now ${elemId} expect ${indexNum} total ${elem_list.length}`)
                   
                   if (indexNum < elem_list.length){
                       if (elemId === indexNum){
                           console.log("Highlight")
                           $(this).addClass("read");
                           $(this).css('background-color','#ffff66');
                           numberOfElementsRead += 1;
                           resultSpan = document.getElementById("result");
                           console.log(numberOfElementsRead)
                           indexNum++
                       }
                   }
                /*
                   if ($(this).attr('class') === 'text-chopped'){
                    $(this).addClass("read");
                    $(this).css('background-color','#ffff66');

                    numberOfElementsRead += 1;
                    resultSpan = document.getElementById("result");
                    console.log(numberOfElementsRead)
                */
                    /* The location of the mouse 
                       x_axis = event.pageX
                       y_axis = event.pageY
                       elemId_list = []
                    */
                    /* Set the id of the words as x_y 
                       $(this).attr('id', x_axis +'_'+ y_axis)
                       /* If the in the same line (y the same) 
                       var elemId = $(this).attr('id')
                       elemId_list.append(elemId)
                       
                       if (elemId.split('_')[0] < event.pageX && elemId.split('_')[1] === event.pageY)
                       {
                    */

                       
                    /*} */
                        
               });
           
            var resultSpan = document.getElementById("result");
            if (numberOfElementsRead == 0){
             resultSpan.innerHTML = "No text read. ";
            }
            else{
             resultSpan.innerHTML = "You've read " + numberOfElementsRead +" text from a total length of " + $('#texto').children('span').length;
            }
       
           // input = document.getElementById("texto")
           // var inputContent = input.value.length;
           // // You may want to focus the textbox in case it's not
           // input.focus();
           // var result = getInputSelection(input);
           // var resultSpan = document.getElementById("result");
           
           // if(result.start == result.end){
           //     resultSpan.innerHTML = "No text selected. Position of cursor is " + result.start +" of " +inputContent;
           // }else{
           //     resultSpan.innerHTML = "You've selected text ("+result.start+" to "+ result.end +") from a total length of " + inputContent;
           // }
           
       }
       });

       
})

