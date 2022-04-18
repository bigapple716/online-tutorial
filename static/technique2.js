
function typeWriter(speed) {
    var running = false;
    var txt = data["reading"]
      document.getElementById("text").innerHTML = "";
      i = 0;
      document.getElementById("myBtn1").disabled = true;
      document.getElementById("myBtn2").disabled = true;
      document.getElementById("myBtn3").disabled = true;
      running = true;
      updateTypeWriter(speed);
  }

  function updateTypeWriter(speed) {
      var txt = data["reading"]
      if (i < txt.length) {
          document.getElementById("text").innerHTML += txt.charAt(i);
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
    $('#myBtn1').on("click", function() {
        speed = 54
        typeWriter(speed)
        updateTypeWriter(speed)
    })
    $('#myBtn2').on("click", function() {
        speed = 90
        typeWriter(speed)
        updateTypeWriter(speed)
        })
    $('#myBtn3').on("click", function() {
        speed = 180
        typeWriter(speed)
        updateTypeWriter(speed)
    })
  })