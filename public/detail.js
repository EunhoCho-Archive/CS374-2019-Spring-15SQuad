$(document).ready(function() {

    // import offer detail
    let config = {
        apiKey: "AIzaSyAJYY0Az45sH0Sw6jAz3JvR4yjJBIMtbzU",
        authDomain: "squad-67b43.firebaseapp.com",
        databaseURL: "https://squad-67b43.firebaseio.com/",
    };
    firebase.initializeApp(config);
    let database = firebase.database();

    const detailtype = sessionStorage.getItem('detailtype');
    const detailid = sessionStorage.getItem('detailid');
    const databaseRef = detailtype + '/' + detailid;

    if(detailtype == 'Offers'){
        database.ref(databaseRef).once('value', function(snapshot){
            const offerOwner = snapshot.val().user;

            if (offerOwner !== "Me") {
                document.getElementById('name').innerHTML = "<i class=\"icon sign-in\"></i>Offer from " + offerOwner;
            } else {
                document.getElementById('name').innerHTML = "<i class=\"icon sign-out\"></i>Offer made by Me";
            }

            let start_date = snapshot.val().start.split('-');
            document.getElementById('start_date').innerHTML = "<h3>" + start_date[0] + ". " + start_date[1] + ". " + start_date[2] + "</h3>";
            let end_date = snapshot.val().end.split('-');
            document.getElementById('end_date').innerHTML = "<h3>" + end_date[0] + ". " + end_date[1] + ". " + end_date[2] + "</h3>";

            let isPossible = snapshot.val().negotiation;
            const trueradio = document.getElementById('isNegoTrue');
            const falseradio = document.getElementById('isNegoFalse');
            if(isPossible === "true"){
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
                if(isPossible === "false"){
                    secondButton.className = "ui black button";
                }
            }

            buttonarea.appendChild(firstButton);
            buttonarea.appendChild(buttonDiv);
            buttonarea.appendChild(secondButton);

        }).then(function(){
            document.getElementById('loader').remove();
        });
    }
    else if(detailtype == 'Negotiations'){
        database.ref(databaseRef).once('value', function(snapshot){
            const offerOwner = snapshot.val().from;

            if (offerOwner !== "Me") {
                document.getElementById('name').innerHTML = "<i class=\"icon sign-in\"></i>Negotiation about worker from " + offerOwner + " to " + snapshot.val().to;
            } else {
                document.getElementById('name').innerHTML = "<i class=\"icon sign-out\"></i>Negotiation about worker from " + offerOwner + " to " + snapshot.val().to;
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

            let mainform = document.getElementById('statusField');
            let statusHeader = document.createElement('h2');
            statusHeader.className = "yellow ui dividing header";
            statusHeader.innerText = "Status";
            mainform.appendChild(statusHeader);

            let statusField = document.createElement('div');
            statusField.className = "inline fields";

            let blankField = document.createElement('div');
            blankField.className = "two wide field";
            statusField.appendChild(blankField);

            let mainStatus = document.createElement('div');
            mainStatus.className = "two wide field";
            if (snapshot.val().status === 'Negotiation Received' && snapshot.val().madeBy === 'Me'){
                mainStatus.innerHTML = "<h3>" + "Negotiation Sent" + "</h3>";
            }
            else{
                mainStatus.innerHTML = "<h3>" + snapshot.val().status + "</h3>";
            }
            statusField.appendChild(mainStatus);
            mainform.appendChild(statusField);

            let buttonarea = document.getElementById('offerButtons');
            let firstButton = document.createElement('button');
            firstButton.className = "ui primary button";
            let buttonDiv = document.createElement('div');
            buttonDiv.className = "or";
            let secondButton = document.createElement('button');
            secondButton.className = "ui yellow button";

            if (userid === snapshot.val().madeBy){
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
                if(isPossible === "false"){
                    secondButton.className = "ui black button";
                }
            }

            buttonarea.appendChild(firstButton);
            buttonarea.appendChild(buttonDiv);
            buttonarea.appendChild(secondButton);

        }).then(function(){
            document.getElementById('loader').remove();
        });
    }
    else{
        location.href = '/404.html';
    }

    // Section for Accept button
    $(document).on('click', "#accept", function(){
        let reallyaccept = confirm('Do you really want to accept this?');
        if(reallyaccept){
            alert('Offer accepted');
            location.href = "/";
        }
        // Not implemented whole accept process yet.
    });

    // Section for Delete button
    $(document).on('click', "#delete", function(){
        let reallyaccept = confirm('Do you really want to delete this?');
        if(reallyaccept){
            alert('Successfully deleted');
            location.href = "/";
        }
        // Not implemented whole delete process yet.
    });

    // Section for Modification button
    $(document).on('click', "#modify", function(){
        if(sessionStorage.getItem('detailtype') === 'Offers'){
            sessionStorage.setItem('type', 'Modify');
        }
        else{
            sessionStorage.setItem('type', 'NegoModify');
        }
        location.href = '/offer.html';
    });

    // Section for Negotiation button
    $(document).on('click', "#negotiate", function(){
        if(document.getElementById('negotiate').className !== "ui black button"){
            sessionStorage.setItem('type', 'Negotiate');
            location.href = '/offer.html';
        }
        else{
            alert("Negotiation is impossible");
        }
    });
});