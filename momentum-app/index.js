//Js for the time

function showTime(){
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();

  
  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  
  var time = h + ":" + m + " ";
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;
  
  setTimeout(showTime, 1000);
  
}

showTime();

//Js for the name and greeting input
const greeting = document.getElementById('greeting'),
  name = document.getElementById('name');

function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    document.body.style.backgroundImage = "url('day.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    document.body.style.backgroundImage = "url('day.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    document.body.style.backgroundImage = "url('night.png')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}


name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);

setBgGreet();
getName();

//Js for the Todo List
(function(){
  
  var list = document.querySelector('#list'),
      form = document.querySelector('form'),
      item = document.querySelector('#item');
  
  form.addEventListener('submit',function(e){
    e.preventDefault();
    list.innerHTML += '<li>' + item.value + '</li>';
    store();
    item.value = "";
  },false)
  
  list.addEventListener('click',function(e){
    var t = e.target;
    if(t.classList.contains('checked')){
      t.parentNode.removeChild(t);
    } else {
      t.classList.add('checked');
    }
    store();
  },false)
  
  function store() {
    window.localStorage.myitems = list.innerHTML;
  }
  
  function getValues() {
    var storedValues = window.localStorage.myitems;
    if(!storedValues) {
      list.innerHTML = '<li>Make a to do list</li>'+
                       '<li>Check off first thing on the to do list</li>'+
                       '<li>Realize you have already accomplished 2 things in the list</li>'+
                       '<li>Reward yourself with a nap</li>';
    }
    else {
      list.innerHTML = storedValues;
    }
  }
  getValues();
})();

//Js for the Main Focus

const focus = document.getElementById('focus');

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

getFocus();

// Js for the Calendar **copied this one but I understand the part**
var calendarNode = document.querySelector("#calendar");

var currDate = new Date();
var currYear = currDate.getFullYear();
var currMonth = currDate.getMonth() + 1;

var selectedYear = currYear;
var selectedMonth = currMonth;
var selectedMonthName = getMonthName(selectedYear, selectedMonth);
var selectedMonthDays = getDayCount(selectedYear, selectedMonth);

renderDOM(selectedYear, selectedMonth);

function getMonthName (year, month) {
    let selectedDate = new Date(year, month-1, 1);
    return selectedDate.toLocaleString('default', { month: 'long' });
}

function getMonthText () {
    if (selectedYear === currYear)
        return selectedMonthName;
    else
        return selectedMonthName + ", " + selectedYear;
}

function getDayName (year, month, day) {
    let selectedDate = new Date(year, month-1, day);
    return selectedDate.toLocaleDateString('en-US',{weekday: 'long'});
}

function getDayCount (year, month) {
    return 32 - new Date(year, month-1, 32).getDate();
}

function getDaysArray () {
    let emptyFieldsCount = 0;
    let emptyFields = [];
    let days = [];

    switch(getDayName(selectedYear, selectedMonth, 1))
    {
        case "Tuesday":
            emptyFieldsCount = 1;
            break;
        case "Wednesday":
            emptyFieldsCount = 2;
            break;
        case "Thursday":
            emptyFieldsCount = 3;
            break;
        case "Friday":
            emptyFieldsCount = 4;
            break;
        case "Saturday":
            emptyFieldsCount = 5;
            break;
        case "Sunday":
            emptyFieldsCount = 6;
            break;
    }
  
    emptyFields = Array(emptyFieldsCount).fill("");
    days = Array.from(Array(selectedMonthDays + 1).keys());
    days.splice(0, 1);
    
    return emptyFields.concat(days);
}

function renderDOM (year, month) {
  let newCalendarNode = document.createElement("div");
  newCalendarNode.id = "calendar";
  newCalendarNode.className = "calendar";
  
  let dateText = document.createElement("div");
  dateText.append(getMonthText());
  dateText.className = "date-text";
  newCalendarNode.append(dateText);
  
  let leftArrow = document.createElement("div");
  leftArrow.append("«");
  leftArrow.className = "button";
  leftArrow.addEventListener("click", goToPrevMonth);
  newCalendarNode.append(leftArrow);
  
  let curr = document.createElement("div");
  curr.append("📅");
  curr.className = "button";
  curr.addEventListener("click", goToCurrDate);
  newCalendarNode.append(curr);
  
  let rightArrow = document.createElement("div");
  rightArrow.append("»");
  rightArrow.className = "button";
  rightArrow.addEventListener("click", goToNextMonth);
  newCalendarNode.append(rightArrow);
  
  let dayNames = ["M", "T", "W", "T", "F", "S", "S"];
  
  dayNames.forEach((cellText) => {
    let cellNode = document.createElement("div");
    cellNode.className = "cell cell--unselectable";
    cellNode.append(cellText);
    newCalendarNode.append(cellNode);
  });
  
  let days = getDaysArray(year, month);
  
  days.forEach((cellText) => {
    let cellNode = document.createElement("div");
    cellNode.className = "cell";
    cellNode.append(cellText);
    newCalendarNode.append(cellNode);
  });
  
  calendarNode.replaceWith(newCalendarNode);
  calendarNode = document.querySelector("#calendar");
}

function goToPrevMonth () {
    selectedMonth--;
    if (selectedMonth === 0) {
        selectedMonth = 12;
        selectedYear--;
    }
    selectedMonthDays = getDayCount(selectedYear, selectedMonth);
    selectedMonthName = getMonthName(selectedYear, selectedMonth);
  
    renderDOM(selectedYear, selectedMonth);
}

function goToNextMonth () {
    selectedMonth++;
    if (selectedMonth === 13) {
        selectedMonth = 0;
        selectedYear++;
    }
    selectedMonthDays = getDayCount(selectedYear, selectedMonth);
    selectedMonthName = getMonthName(selectedYear, selectedMonth);
  
    renderDOM(selectedYear, selectedMonth);
}

function goToCurrDate () {
    selectedYear = currYear;
    selectedMonth = currMonth;

    selectedMonthDays = getDayCount(selectedYear, selectedMonth);
    selectedMonthName = getMonthName(selectedYear, selectedMonth);
  
    renderDOM(selectedYear, selectedMonth);
}

//Js for the quotes
var quoteOptions = [{
  quote: "“Find something that makes you happy and don't let anyone take it away from you.”",
  name: "Luke Hemmings"
}, {
  quote: "“Don't cry because it's over, smile because it happened.”",
  name: "Dr. Seuss"
}, {
  quote: "“Be yourself; everyone else is already taken.”",
  name: "Oscar Wilde"
}, {
  quote: "“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.”",
  name: "Albert Einstein"
}, {
  quote: "“As he read, I fell in love the way you fall asleep: slowly, and then all at once.”",
  name: " John Green"
}, {
  quote: "“You know you're in love when you can't fall asleep because reality is finally better than your dreams.”",
  name: "Dr. Seuss"
}, {
  quote: "“A room without books is like a body without a soul.”",
  name: "Marcus Tullius Cicero"
}, {
  quote: "“So many books, so little time.”",
  name: "Frank Zappa"
}, {
  quote: "“You only live once, but if you do it right, once is enough.”",
  name: "Mae West"
}, {
  quote: "“Be the change that you wish to see in the world.”",
  name: "Mahatma Gandhi"
}, ];

function initialize_generate() {
  var sweetspot = Math.floor((Math.random() * quoteOptions.length));
  for (var i = 0; i <= quoteOptions.length; i++) {

    if (i === sweetspot) {
      var quoteHtml = generate_html(quoteOptions[i]);
      $(".quote").empty().append(quoteHtml);
      //console.log("test");
      var tweet_code = generate_tweet(quoteOptions[i]);
      console.log(tweet_code);
    }
  }
}

function generate_html(quoteObj) {

  var quoteHtml = "<i> " + quoteObj["quote"] + " </i> <br> <b> - " + quoteObj["name"] + " </b>";
  return quoteHtml
}
