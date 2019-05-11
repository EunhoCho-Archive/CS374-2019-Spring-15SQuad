$(document).ready(function() {

    // import offer detail
    let config = {
        apiKey: "AIzaSyAJYY0Az45sH0Sw6jAz3JvR4yjJBIMtbzU",
        authDomain: "squad-67b43.firebaseapp.com",
        databaseURL: "https://squad-67b43.firebaseio.com/",
    };
    firebase.initializeApp(config);
    let database = firebase.database();

    const offerid = sessionStorage.getItem('offerid');

    database.ref('Offers/' + offerid).once('value', function(snapshot){
        const offerOwner = snapshot.val().user;

        if (offerOwner !== "Me"){
            document.getElementById('inAndOutIcon').className = "icon sign-in";
        }
        else{
            document.getElementById('inAndOutIcon').className = "icon sign-out";
        }

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

        let userid = 'Me';
        // let userid = sessionStorage.getItem('userid');

        let buttonarea = document.getElementById('offerButtons');
        let firstButton = document.createElement('button');
        firstButton.className = "ui primary button";
        let buttonDiv = document.createElement('div');
        buttonDiv.className = "or";
        let secondButton = document.createElement('button');
        secondButton.className = "ui yellow button";

        if (userid === snapshot.val().user){
            firstButton.innerText = "Delete";
            firstButton.setAttribute('id', 'delete');
            secondButton.innerText = "Modify";
            secondButton.setAttribute('id', 'modify');
        }
        else{
            firstButton.innerText = "Accept";
            firstButton.setAttribute('id', 'accept');
            secondButton.innerText = "Negotiate";
            secondButton.setAttribute('id', 'negotiate');
        }

        buttonarea.appendChild(firstButton);
        buttonarea.appendChild(buttonDiv);
        buttonarea.appendChild(secondButton);

    }).then(function(){
        document.getElementById('loader').remove();
    });

    // Section for Accept button
    $(document).on('click', "#accept", function(){
        let reallyaccept = confirm('Do you really want to accept this offer?');
        if(reallyaccept){
            alert('Offer accepted');
            location.href = "/";
        }
        // Not implemented whole accept process yet.
    });

    // Section for Delete button
    $(document).on('click', "#delete", function(){
        let reallyaccept = confirm('Do you really want to delete this offer?');
        if(reallyaccept){
            alert('Successfully deleted');
            location.href = "/";
        }
        // Not implemented whole delete process yet.
    });

    // Section for Modification button
    $(document).on('click', "#modify", function(){
        sessionStorage.setItem('type', 'Modify');
        location.href = '/enroll.html';
    });

    // Section for Negotiation button
    $(document).on('click', "#negotiate", function(){
        sessionStorage.setItem('type', 'Negotiate');
        sessionStorage.setItem('negofrom', 'Offer');
        location.href = '/enroll.html';
    });
});