
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDnxrZZ6tmF7ODYVwUv5Ah88IZ8hpGUqGY",
    authDomain: "train-time-sheet-9872d.firebaseapp.com",
    databaseURL: "https://train-time-sheet-9872d.firebaseio.com",
    projectId: "train-time-sheet-9872d",
    storageBucket: "train-time-sheet-9872d.appspot.com",
    messagingSenderId: "163118023360"
};
firebase.initializeApp(config);

var data = firebase.database();

var inputName;
var inputDest;
var inputFreq;
var inputStart;
var newTrain;
var timeRemainder;
var start;
var minutesAway
console.log(data.ref());
//pulls info from database to display on page load
// function onPageLoad() {
//     for (data.ref())
//     data.ref().({

//     name: inputName,
//     destination: inputDest,
//     frequency: inputFreq,
//     start: inputStart,
//     dateAdded: firebase.database.ServerValue.TIMESTAMP
// })
// }
 
//actions for submit button click
function submitClick(event) {
    event.preventDefault();
    varSetter();
        var newTrain = {
            name: inputName,
            destination: inputDest,
            frequency: inputFreq,
            start: inputStart,
            dateAdded: firebase.database.ServerValue.TIMESTAMP,
        }
    pushToData(newTrain);
    fieldClear();  
    };

//sets typed input to variable
function varSetter() {
    event.preventDefault();
    inputName = $("#typed-name").val().trim();
    inputDest = $("#typed-dest").val().trim();
    inputFreq = $("#typed-freq").val().trim();
    inputStart = $("#typed-start").val().trim();
}

//pushes input to firebase
function pushToData(newTrain) {
    data.ref().push(newTrain);
}

//clears input fields after submit
function fieldClear() {
    $("#typed-name").val("")
    $("#typed-dest").val("")
    $("#typed-freq").val("")
    $("#typed-start").val("")
}



//creates and adds new row to table
    data.ref().orderByChild("dateAdded").on("child_added", function(snapshot) {
        newName = snapshot.val().name;
        newDest = snapshot.val().destination;
        newFreq = snapshot.val().frequency;
        newStart = snapshot.val().start;
        console.log(typeof newStart);



        //start formatted for moment
        var startConverted = moment(newStart, "HH:mm").subtract(1, "years");
        console.log(startConverted);
        //set the current time var
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        // Difference between the times
        var diffTime = moment().diff(moment(startConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);
        // Time apart (remainder)
        var timeRemainder = diffTime % newFreq;
        console.log(timeRemainder);
        // Minute Until Train
        var minutesAway = newFreq - timeRemainder;
        console.log("MINUTES TILL TRAIN: " + minutesAway);
        // Next Train
        var nextTrain = moment().add(minutesAway, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


        newRow = $("<tr>").append(
            $("<td>").text(newName),
            $("<td>").text(newDest),
            $("<td>").text(newFreq),
            $("<td>").text(nextTrain),
            $("<td>").text(minutesAway));
            $("tbody").append(newRow);
        });
        $("#submit").on("click", submitClick);