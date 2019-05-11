$(document).ready(function() {

    // Section for Worktime
    /// Worktime div initialize
    function initializeWorkTime(){
        let worktimes = document.getElementById('worktime');

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

        let plusButton = document.createElement('div');
        plusButton.className = "one field";
        plusButton.innerHTML = "<button id=\"more_time\" class=\"yellow circular ui icon button\"><i class=\"icon plus\"></i></button>";
        newtime.appendChild(plusButton);

        worktimes.appendChild(newtime);
    }

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

    initializeWorkTime();

    // Section for submit button & add form to firebase
    let config = {
        apiKey: "AIzaSyAJYY0Az45sH0Sw6jAz3JvR4yjJBIMtbzU",
        authDomain: "squad-67b43.firebaseapp.com",
        databaseURL: "https://squad-67b43.firebaseio.com/",
    };
    firebase.initializeApp(config);
    let database = firebase.database();

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
                if (i % 10 === 1 && i % 100 === 11){
                    errorlist.push(i + 'st worktime is blank');
                }
                else if (i % 10 === 2 && i % 100 === 12){
                    errorlist.push(i + 'nd worktime is blank');
                }
                else if (i % 10 === 2 && i % 100 === 12){
                    errorlist.push(i + 'rd worktime is blank');
                }
                else{
                    errorlist.push(i + 'th worktime is blank');
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
            let reallysubmit = confirm('Do you really want to enroll like this?');
            if(reallysubmit){
                let enrollKey = database.ref('Offers').push();
                enrollKey.set({
                    start: startDate,
                    end: endDate,
                    negotiation: isNego,
                    user: 'Me',
                });

                for(let i = 0; i < worktimes.childNodes.length; i++){
                    let targetTime = worktimes.childNodes.item(i);
                    let timeKey = database.ref('Offers/' + enrollKey.key + '/time').push();
                    timeKey.set({
                        day: targetTime.childNodes.item(1).lastChild.value,
                        start: targetTime.childNodes.item(2).lastChild.value,
                        end: targetTime.childNodes.item(4).lastChild.value
                    })
                }
                alert('Successfully enrolled!');
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

    // Section for Accept button
    $(document).on('click', "#cancel", function(){
        let reallycancel = confirm('Do you really want to cancel and go back to main page?');
        if(reallycancel){
            location.href = "/";
        }
    });
});