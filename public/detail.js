$(document).ready(function() {

    // import offer detail
    let config = {
        apiKey: "AIzaSyAJYY0Az45sH0Sw6jAz3JvR4yjJBIMtbzU",
        authDomain: "squad-67b43.firebaseapp.com",
        databaseURL: "https://squad-67b43.firebaseio.com/",
    };
    firebase.initializeApp(config);
    let database = firebase.database();

    const offerid = '-LeNQ_rxVkSm7SQmduLz';
    // const offerid = sessionStorage.getItem('offerid');

    database.ref('Offers/' + offerid).once('value', function(snapshot){
        let start_date = snapshot.val().start.split('-');
        document.getElementById('start_date').innerHTML = "<h3>" + start_date[0] + ". " + start_date[1] + ". " + start_date[2] + "</h3>";
        let end_date = snapshot.val().end.split('-');
        document.getElementById('end_date').innerHTML = "<h3>" + end_date[0] + ". " + end_date[1] + ". " + end_date[2] + "</h3>";

        let isPossible = snapshot.val().negotiation;
        const trueradio = document.getElementById('isNegoTrue');
        const falseradio = document.getElementById('isNegoFalse');
        if(isPossible){
            trueradio.setAttribute('checked', "");
            falseradio.setAttribute('disabled', 'disabled');
        }
        else{
            falseradio.setAttribute('checked', "");
            trueradio.setAttribute('disabled', 'disabled');
        }

        let worktimes = document.getElementById('worktime');
        snapshot.child('time').forEach(function (data){
            let newtime = document.createElement('div');
            newtime.className = "inline fields";

            let blankField = document.createElement('div');
            blankField.className = "two wide field";
            newtime.appendChild(blankField);

            let daySelection = document.createElement('div');
            daySelection.className = "one wide field";
            daySelection.innerHTML = "<h3>" + data.val().day + ".</h3>";
            newtime.appendChild(daySelection);

            let startTimeSelection = document.createElement('div');
            startTimeSelection.className = "one wide field";
            startTimeSelection.innerHTML = "<h3>" + data.val().start + ".</h3>";
            newtime.appendChild(startTimeSelection);

            let timeUntil = document.createElement('div');
            timeUntil.className = "one field";
            timeUntil.innerHTML = "<h3>~</h3>";
            newtime.appendChild(timeUntil);

            let endTimeSelection = document.createElement('div');
            endTimeSelection.className = "one wide field";
            endTimeSelection.innerHTML = "<h3>" + data.val().end + ".</h3>";
            newtime.appendChild(endTimeSelection);

            worktimes.appendChild(newtime);
        });
    });

    // Section for Accept button
    $(document).on('click', "#accept", function(){
        let reallyaccept = confirm('Do you really want to accept this offer?');
        if(reallyaccept){
            alert('Offer accepted');
            location.href = "/";
        }
    });

    // Section for Negotiation button
    $(document).on('click', "#negotiate", function(){
        location.href = '/negotiation.html';
    });
});