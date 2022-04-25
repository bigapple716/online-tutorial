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

/* 
document.getElementById("trigger").addEventListener("click", function(), false);

 */
$(document).mousemove(function(event){
 /* console.log(`${event.pageX}, ${event.pageY}`); */
 {
    $('#myBtn1').on("click", function() {
         txt = data["reading"]
    })
    $('#myBtn2').on("click", function() {
         txt = data["reading_hard"]
    })

    document.getElementById("texto").value = txt
    input = document.getElementById("texto")
    var inputContent = input.value.length;
        // You may want to focus the textbox in case it's not
    input.focus();
    var result = getInputSelection(input);
    var resultSpan = document.getElementById("result");
    
    if(result.start == result.end){
        resultSpan.innerHTML = "No text selected. Position of cursor is " + result.start +" of " +inputContent;
    }else{
        resultSpan.innerHTML = "You've selected text ("+result.start+" to "+ result.end +") from a total length of " + inputContent;
    }
    
}
});
