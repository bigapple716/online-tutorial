
function typeWriter(speed) {
    var running = false;
    var txt = reading["reading"]
    let j = 0
    $("#text").empty();
    while (j<txt.length){
        document.getElementById("text").innerHTML += '<span class = wrap id ="temp'+ j +'">'+ txt[j]+ " " + "</span>";
        j++;
    }
    i = 0
    document.getElementById("myBtn1").disabled = true;
    document.getElementById("myBtn2").disabled = true;
    document.getElementById("myBtn3").disabled = true;
    running = true;
    txtlength = txt.length
    setTimeout(function() {updateTypeWriter(speed);}, 500);
}

  function updateTypeWriter(speed) {
      if (i < txtlength) {
          let query = "temp" + i
          $("#"+query).addClass("white");
          i++;
          setTimeout(function() {updateTypeWriter(speed);}, speed);
      } else {         
          running = false;
          document.getElementById("myBtn1").disabled = false;
          document.getElementById("myBtn2").disabled = false;
          document.getElementById("myBtn3").disabled = false;
      }
  }

  $(document).ready(function () {
    $("#nav-item-learn").addClass("active");

    $('#myBtn1').on("click", function() {
        speed = 150
        typeWriter(speed)
    })
    $('#myBtn2').on("click", function() {
        speed = 250
        typeWriter(speed)
        })
    $('#myBtn3').on("click", function() {
        speed = 500
        typeWriter(speed)
    })
  })