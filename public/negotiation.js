$(document).ready(function() {
    let config = {
        apiKey: "AIzaSyAJYY0Az45sH0Sw6jAz3JvR4yjJBIMtbzU",
        authDomain: "squad-67b43.firebaseapp.com",
        databaseURL: "https://squad-67b43.firebaseio.com/",
    };
    firebase.initializeApp(config);
    let database = firebase.database();

    const isNegoOfNego = false;
    // const isNegoOfNego = sessionStorage.getItem('isNegoOfNego');

    let databaseRef;

    if(isNegoOfNego){
        databaseRef = 'Negotiations/samplenegoid';
        // databaseRef = 'Negotiations/' + sessionStorage.getItem('offerid');
    }
    else{
        databaseRef = 'Offers/' + sessionStorage.getItem('offerid');
    }

    let offerOwner = undefined;

    // Initialize based on offer
    let formdiv = document.getElementById('formdiv');
    database.ref(databaseRef).once('value', function(snapshot){
        document.getElementById('start_date').setAttribute('value', snapshot.val().start);
        document.getElementById('end_date').setAttribute('value', snapshot.val().end);

        let isPossible = snapshot.val().negotiation;
        const trueradio = document.getElementById('isNegoTrue');
        const falseradio = document.getElementById('isNegoFalse');
        if(isPossible){
            trueradio.setAttribute('checked', "");
        }
        else{
            falseradio.setAttribute('checked', "");
        }

        let worktimes = document.getElementById('worktime');
        snapshot.child('time').forEach(function (data){
            let newtime = document.createElement('div');
            newtime.className = "inline fields";

            let blankField = document.createElement('div');
            blankField.className = "two wide field";
            newtime.appendChild(blankField);

            const targetDay = data.val().day;
            let daySelection = document.createElement('div');
            daySelection.className = "one field";
            let selection = document.createElement('select');
            selection.className = "ui fluid dropdown";

            let nothing = document.createElement('option');
            nothing.setAttribute('value', '');
            nothing.innerText = "Day";
            selection.appendChild(nothing);

            let monday = document.createElement('option');
            monday.setAttribute('value', 'Mon');
            monday.innerText = "Mon";
            if(targetDay === 'Mon'){
                monday.setAttribute('selected', 'selected');
            }
            selection.appendChild(monday);

            let tuesday = document.createElement('option');
            tuesday.setAttribute('value', 'Tue');
            tuesday.innerText = "Tue";
            if(targetDay === 'Tue'){
                tuesday.setAttribute('selected', 'selected');
            }
            selection.appendChild(tuesday);

            let wednesday = document.createElement('option');
            wednesday.setAttribute('value', 'Wed');
            wednesday.innerText = "Wed";
            if(targetDay === 'Wed'){
                wednesday.setAttribute('selected', 'selected');
            }
            selection.appendChild(wednesday);

            let thursday = document.createElement('option');
            thursday.setAttribute('value', 'Thur');
            thursday.innerText = "Thur";
            if(targetDay === 'Thur'){
                thursday.setAttribute('selected', 'selected');
            }
            selection.appendChild(thursday);

            let friday = document.createElement('option');
            friday.setAttribute('value', 'Fri');
            friday.innerText = "Fri";
            if(targetDay === 'Fri'){
                friday.setAttribute('selected', 'selected');
            }
            selection.appendChild(friday);

            let saturday = document.createElement('option');
            saturday.setAttribute('value', 'Sat');
            saturday.innerText = "Sat";
            if(targetDay === 'Sat'){
                saturday.setAttribute('selected', 'selected');
            }
            selection.appendChild(saturday);

            let sunday = document.createElement('option');
            sunday.setAttribute('value', 'Sun');
            sunday.innerText = "Sun";
            if(targetDay === 'Sun'){
                sunday.setAttribute('selected', 'selected');
            }
            selection.appendChild(sunday);
            daySelection.appendChild(selection);
            newtime.appendChild(daySelection);

            let startTimeSelection = document.createElement('div');
            startTimeSelection.className = "three wide field";
            startTimeSelection.innerHTML = "<input type=\"time\" value=\"" + data.val().start + "\">";
            newtime.appendChild(startTimeSelection);

            let timeUntil = document.createElement('div');
            timeUntil.className = "one field";
            timeUntil.innerHTML = "<strong>~</strong>";
            newtime.appendChild(timeUntil);

            let endTimeSelection = document.createElement('div');
            endTimeSelection.className = "three wide field";
            endTimeSelection.innerHTML = "<input type=\"time\" value=\"" + data.val().end + "\">";
            newtime.appendChild(endTimeSelection);

            let minusButton = document.createElement('div');
            minusButton.className = "one field";
            minusButton.innerHTML = "<button class=\"yellow circular ui icon button delete_time\"><i class=\"icon minus\"></i></button>";
            newtime.appendChild(minusButton);
            worktimes.appendChild(newtime);
        });

        if(worktimes.childNodes.length === 1){
            worktimes.lastChild.removeChild(worktimes.lastChild.lastChild);
        }
        let plusButton = document.createElement('div');
        plusButton.className = "one field";
        plusButton.innerHTML = "<button id=\"more_time\" class=\"yellow circular ui icon button\"><i class=\"icon plus\"></i></button>";
        worktimes.lastChild.appendChild(plusButton);

        offerOwner = snapshot.val().user;

        if (offerOwner !== "Me"){
            document.getElementById('inAndOutIcon').className = "icon sign-in";
        }
        else{
            document.getElementById('inAndOutIcon').className = "icon sign-out";
        }

        let currentTime = date.getFullYear() + '-';
        if(date.getMonth() < 9){
            currentTime = currentTime + '0' + (date.getMonth() + 1) + '-';
        }
        else{
            currentTime = currentTime + (date.getMonth() + 1) + '-';
        }
        if(date.getDate() < 10){
            currentTime = currentTime + '0' + date.getDate();
        }
        else{
            currentTime = currentTime + date.getDate();
        }

        document.getElementById('start_date').setAttribute('min', currentTime);
        document.getElementById('end_date').setAttribute('min', currentTime);
    }).then(function(){
        document.getElementById('loader').remove();
    });

    /// After press delete time button
    $(document).on('click', '.delete_time', function(){
        let worktimes = document.getElementById('worktime');
        let lastTime = worktimes.lastChild;
        let plusButton = lastTime.lastChild;
        let isLast = false;
        let isSingle = false;

        let targetTime = $(this).closest('div').parent();

        if(lastTime === targetTime[0]){
            isLast = true;
        }
        if(worktimes.childNodes.length === 2){
            isSingle = true;
        }
        targetTime.remove();

        if(isSingle){
            if(isLast){
                lastTime = worktimes.lastChild;
                lastTime.removeChild(lastTime.lastChild);
                lastTime.appendChild(plusButton);
            }
            else{
                lastTime = worktimes.lastChild;
                lastTime.removeChild(lastTime.lastChild);
                lastTime.removeChild(lastTime.lastChild);
                lastTime.appendChild(plusButton);
            }
        }
        else if(isLast){
            lastTime = worktimes.lastChild;
            lastTime.appendChild(plusButton);
        }
    });

    /// After press more time button
    $(document).on('click', "#more_time", function(){
        let worktimes = document.getElementById('worktime');
        let lastTime = worktimes.lastChild;
        let plusButton = lastTime.lastChild;
        lastTime.removeChild(plusButton);

        if (worktimes.childNodes.length === 1){
            let minusButton2 = document.createElement('div');
            minusButton2.className = "one field";
            minusButton2.innerHTML = "<button class=\"yellow circular ui icon button delete_time\"><i class=\"icon minus\"></i></button>";
            lastTime.appendChild(minusButton2);
        }

        let newtime = document.createElement('div');
        newtime.className = "inline fields";

        let blankField = document.createElement('div');
        blankField.className = "two wide field";
        newtime.appendChild(blankField);

        let daySelection = document.createElement('div');
        daySelection.className = "one field";
        daySelection.innerHTML = "<select class=\"ui fluid dropdown\">\n" +
            "\t<option value=\"\">Day</option>\n" +
            "\t<option value=\"Mon\">Mon</option>\n" +
            "\t<option value=\"Tue\">Tue</option>\n" +
            "\t<option value=\"Wed\">Wed</option>\n" +
            "\t<option value=\"Thur\">Thur</option>\n" +
            "\t<option value=\"Fri\">Fri</option>\n" +
            "\t<option value=\"Sat\">Sat</option>\n" +
            "\t<option value=\"Sun\">Sun</option></select>";
        newtime.appendChild(daySelection);

        let startTimeSelection = document.createElement('div');
        startTimeSelection.className = "three wide field";
        startTimeSelection.innerHTML = "<input type=\"time\">";
        newtime.appendChild(startTimeSelection);

        let timeUntil = document.createElement('div');
        timeUntil.className = "one field";
        timeUntil.innerHTML = "<strong>~</strong>";
        newtime.appendChild(timeUntil);

        let endTimeSelection = document.createElement('div');
        endTimeSelection.className = "three wide field";
        endTimeSelection.innerHTML = "<input type=\"time\">";
        newtime.appendChild(endTimeSelection);

        let minusButton = document.createElement('div');
        minusButton.className = "one field";
        minusButton.innerHTML = "<button class=\"yellow circular ui icon button delete_time\"><i class=\"icon minus\"></i></button>";
        newtime.appendChild(minusButton);
        newtime.appendChild(plusButton);

        worktimes.appendChild(newtime);
    });

    // Section for submit button & add form to firebase
    $(document).on('click', "#submit", function(){
        let em = document.getElementById('errorMessage');
        if (em !== null){
            em.remove();
        }
        // Check validation
        let isValid = true;
        let errorlist = [];

        let startDate = document.getElementById('start_date').value;
        if(startDate === ""){
            isValid = false;
            errorlist.push('Start workday is blank');
        }

        let endDate = document.getElementById('end_date').value;
        if(endDate === ""){
            isValid = false;
            errorlist.push('End workday is blank');
        }
        if (startDate !== "" && endDate !== "" && startDate > endDate){
            isValid = false;
            errorlist.push('End workday is faster than start workday');
        }


        let worktimes = document.getElementById('worktime');
        for(let i = 0; i < worktimes.childNodes.length; i++){
            let targetTime = worktimes.childNodes.item(i);
            let day = targetTime.childNodes.item(1).lastChild.value;
            let start = targetTime.childNodes.item(2).lastChild.value;
            let end = targetTime.childNodes.item(4).lastChild.value;

            if(day === "" || start === "" || end === ""){
                isValid = false;
                if (i % 10 === 0 && i % 100 === 10){
                    errorlist.push((i + 1) + 'st worktime is blank');
                }
                else if (i % 10 === 1 && i % 100 === 11){
                    errorlist.push((i + 1) + 'nd worktime is blank');
                }
                else if (i % 10 === 2 && i % 100 === 12){
                    errorlist.push((i + 1) + 'rd worktime is blank');
                }
                else{
                    errorlist.push((i + 1) + 'th worktime is blank');
                }
            }
            if(start !== "" && end !== "" && start >= end){
                isValid = false;
                if (i % 10 === 0 && i % 100 === 10){
                    errorlist.push('End time of ' + (i + 1) + 'st worktime is faster than start time');
                }
                else if (i % 10 === 1 && i % 100 === 11){
                    errorlist.push('End time of ' + (i + 1) + 'nd worktime is faster than start time');
                }
                else if (i % 10 === 2 && i % 100 === 12){
                    errorlist.push('End time of ' + (i + 1) + 'rd worktime is faster than start time');
                }
                else{
                    errorlist.push('End time of ' + (i + 1) + 'th worktime is faster than start time');
                }
            }
        }

        let isNego = undefined;
        if(document.getElementById('isNegoFalse').checked){
            isNego = false;
        }
        else if(document.getElementById('isNegoTrue').checked){
            isNego = true;
        }
        if(isNego === undefined){
            isValid = false;
            errorlist.push('Negotiation Possible? is blank');
        }

        if(isValid){
            let reallysubmit = confirm('Do you really want to negotiate like this?');
            if(reallysubmit){
                let negoKey = database.ref('Negotiations').push();
                negoKey.set({
                    start: startDate,
                    end: endDate,
                    negotiation: isNego,
                    to: 'Me',
                    from: offerOwner,
                    madeBy: 'Me'
                });

                for(let i = 0; i < worktimes.childNodes.length; i++){
                    let targetTime = worktimes.childNodes.item(i);
                    let timeKey = database.ref('Negotiations/' + negoKey.key + '/time').push();
                    timeKey.set({
                        day: targetTime.childNodes.item(1).lastChild.value,
                        start: targetTime.childNodes.item(2).lastChild.value,
                        end: targetTime.childNodes.item(4).lastChild.value
                    })
                }
                alert('Successfully sent negotiation!');
                location.href = '/';
            }
        }
        else{
            let form = document.getElementById('form');
            let message = document.createElement('div');
            message.className = "ui error message";
            message.setAttribute('id', 'errorMessage');

            let messageHeader = document.createElement('div');
            messageHeader.className = "header";
            messageHeader.innerText = "There were some errors with your submission";
            message.appendChild(messageHeader);

            let messagelist = document.createElement('ul');
            messagelist.className = "list";

            for(let i = 0; i < errorlist.length; i++){
                let singleitem = document.createElement('li');
                singleitem.innerText = errorlist[i];
                messagelist.appendChild(singleitem);
            }

            message.appendChild(messagelist);
            form.appendChild(message);
        }
    });

    // Section for Cancel button
    $(document).on('click', "#cancel", function(){
        let reallycancel = confirm('Do you really want to cancel and go back?');
        if(reallycancel){
            location.href = "/detail.html";
        }
    });
});