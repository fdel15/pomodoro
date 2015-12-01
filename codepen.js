var clicked = false
var work = true

$(document).ready(function(){
  clickToStartHeader();
  updateSession();
  $(".minus").click(minusButton);
  $(".plus").click(addButton);
  $("#timerHeader").click(function(){
    clicked = !clicked
    if(clicked === true) {
      startTimer();
      setHeader();
    } else {
      stopTimer();
    }
  });
});

function workHeader() {
  $("#timerHeader").text("Work!")
}

function breakHeader() {
  $("#timerHeader").text("Break")
}

function clickToStartHeader() {
  $("#timerHeader").text("Click To Start")
}

function setHeader() {
  if(work) {
    return workHeader();
  } else {
    return breakHeader();
  };
}

function addButton(event) {
  var target = $(event.target)
  var time = target.siblings("span");
  var value = parseInt(time.text())
  value++
  time.text(value);
  if(target.parent().siblings("h3")[0].textContent != "Break") {
    updateSession();
    work = true;
  };
  clickToStartHeader();
}

function minusButton(event) {
  var target = $(event.target)
  var time = target.siblings("span");
  var value = parseInt(time.text())
  if(value > 0) {
    value--
  }
  time.text(value);
  if(target.parent().siblings("h3")[0].textContent != "Break") {
    updateSession();
    work = true;
  };
  clickToStartHeader();
}

function updateSession() {
  var setTime = $("#setTime");
  var session = $("#time");
  session.text(setTime.text() + ":00")
}

function getTimeObject() {
    var dateObj = new Date();
    var time = $("#time").text().split(":");
    var minutes = parseInt(time[0]);
    var seconds = parseInt(time[1]);

    dateObj.setMinutes(minutes)
    dateObj.setSeconds(seconds)
    return dateObj
}

function currentMinutes(timeObject) {
  return timeObject.getMinutes();
}

function currentSeconds(timeObject) {
  return timeObject.getSeconds();
}

function updateTime(timeObject) {
  var minutes = currentMinutes(timeObject).toString();
  var seconds = currentSeconds(timeObject).toString()
  if(seconds.length === 1){
    seconds = "0" + seconds;
  }
  var string = minutes + ":" + seconds;
  $("#time").text(string);
}

function countDown(){
  var time = getTimeObject();
  time.setSeconds(currentSeconds(time) - 1);
  updateTime(time);
  timeExpired(time);
}

function startTimer()  {
  clock = setInterval(countDown, 1000);
  $(".plus").off();
  $(".minus").off();
}

function stopTimer() {
  clearInterval(clock);
  clickToStartHeader();
  $(".plus").on("click", addButton);
  $(".minus").on("click", minusButton);
}

function timeExpired(time) {
  var audio = new Audio("http://www.orangefreesounds.com/wp-content/uploads/2015/09/Chinese-gong-sound.mp3")
 if(currentMinutes(time) === 0 && currentSeconds(time) === 0) {
   audio.play();
   work = !work
   if($("#timerHeader").text() === "Work!") {
    breakTime();
   } else {
     stopTimer();
     updateSession();
   }
 }
}

function breakTime() {
  var breakTime = $("#breakTime").text()
  breakHeader();
  $("#time").text(breakTime + ":00")
}