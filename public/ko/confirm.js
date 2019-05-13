$(document).ready(function() {
    let config = {
        apiKey: "AIzaSyAJYY0Az45sH0Sw6jAz3JvR4yjJBIMtbzU",
        authDomain: "squad-67b43.firebaseapp.com",
        databaseURL: "https://squad-67b43.firebaseio.com/",
    };
    firebase.initializeApp(config);
    let database = firebase.database();

    function initialize(){
        let name = sessionStorage.getItem('name');
        document.getElementById('name').innerHTML = name + ' 확인';

        let start_date = sessionStorage.getItem('start_date').split('-');
        document.getElementById('start_date').innerHTML = "<h3>" + start_date[0] + ". " + start_date[1] + ". " + start_date[2] + "</h3>";
        let end_date = sessionStorage.getItem('end_date').split('-');
        document.getElementById('end_date').innerHTML = "<h3>" + end_date[0] + ". " + end_date[1] + ". " + end_date[2] + "</h3>";

        let isPossible = sessionStorage.getItem('negotiation');
        const trueradio = document.getElementById('isNegoTrue');
        const falseradio = document.getElementById('isNegoFalse');
        if(isPossible === "true" || isPossible === true){
            trueradio.setAttribute('checked', "");
            falseradio.setAttribute('disabled', 'disabled');
        }
        else{
            falseradio.setAttribute('checked', "");
            trueradio.setAttribute('disabled', 'disabled');
        }

        let worktimes = document.getElementById('worktime');
        let times = JSON.parse(sessionStorage.getItem('times'));
        for(let i = 0; i < times.length; i++){
            let newtime = document.createElement('div');
            newtime.className = "inline fields";

            let blankField = document.createElement('div');
            blankField.className = "two wide field";
            newtime.appendChild(blankField);

            let daySelection = document.createElement('div');
            daySelection.className = "one wide field";
            daySelection.innerHTML = "<h3>" + weekEngKor(times[i][0]) + ".</h3>";
            newtime.appendChild(daySelection);

            let startTimeSelection = document.createElement('div');
            startTimeSelection.className = "one wide field";
            startTimeSelection.innerHTML = "<h3>" + times[i][1] + ".</h3>";
            newtime.appendChild(startTimeSelection);

            let timeUntil = document.createElement('div');
            timeUntil.className = "one field";
            timeUntil.innerHTML = "<h3>~</h3>";
            newtime.appendChild(timeUntil);

            let endTimeSelection = document.createElement('div');
            endTimeSelection.className = "one wide field";
            endTimeSelection.innerHTML = "<h3>" + times[i][2] + ".</h3>";
            newtime.appendChild(endTimeSelection);

            worktimes.appendChild(newtime);
        }
    }

    initialize();

    $(document).on('click', "#submit", function(){
        const type = sessionStorage.getItem('type');
        const startDate = sessionStorage.getItem('start_date');
        const endDate = sessionStorage.getItem('end_date');
        const isNego = sessionStorage.getItem('negotiation');
        let times = JSON.parse(sessionStorage.getItem('times'));

        if(type === "Enroll") {
            let reallysubmit = confirm('Do you really want to enroll like this?');
            if (reallysubmit) {
                let enrollKey = database.ref('Offers').push();
                enrollKey.set({
                    start: startDate,
                    end: endDate,
                    negotiation: isNego,
                    user: 'Me',
                });

                for (let i = 0; i < times.length; i++) {
                    let targetTime = times[i];
                    let timeKey = database.ref('Offers/' + enrollKey.key + '/time').push();
                    timeKey.set({
                        day: targetTime[0],
                        start: targetTime[1],
                        end: targetTime[2]
                    })
                }

                sessionStorage.clear();
                sessionStorage.setItem('detailtype', 'Offers');
                sessionStorage.setItem('detailid', enrollKey.key);
                alert('등록되었습니다.');
                location.href = '/ko/detail.html';
            }
        }
        else if(type === "Modify"){
            let reallysubmit = confirm('Do you really want to modify like this?');
            if(reallysubmit){
                const offerid = sessionStorage.getItem('detailid');
                database.ref('Offers/' + offerid).set({
                    start: startDate,
                    end: endDate,
                    negotiation: isNego,
                    user: 'Me',
                });

                database.ref('Offers/' + offerid + '/time').remove();
                for (let i = 0; i < times.length; i++) {
                    let targetTime = times[i];
                    let timeKey = database.ref('Offers/' + offerid + '/time').push();
                    timeKey.set({
                        day: targetTime[0],
                        start: targetTime[1],
                        end: targetTime[2]
                    })
                }

                sessionStorage.clear();
                sessionStorage.setItem('detailtype', 'Offers');
                sessionStorage.setItem('detailid', offerid);
                alert('수정되었습니다.');
                location.href = '/ko/detail.html';
            }
        }
        else if(type === "Negotiate"){
            let reallysubmit = confirm('Do you really want to negotiate like this?');
            if(reallysubmit){
                const from = sessionStorage.getItem('from');
                const to = sessionStorage.getItem('to');

                let negoKey = database.ref('Negotiations').push();
                negoKey.set({
                    start: startDate,
                    end: endDate,
                    negotiation: isNego,
                    to: to,
                    from: from,
                    madeBy: 'Me',
                    status: 'Negotiation Received'
                });

                for (let i = 0; i < times.length; i++) {
                    let targetTime = times[i];
                    let timeKey = database.ref('Negotiations/' + negoKey.key + '/time').push();
                    timeKey.set({
                        day: targetTime[0],
                        start: targetTime[1],
                        end: targetTime[2]
                    })
                }

                sessionStorage.clear();
                sessionStorage.setItem('detailtype', 'Negotiations');
                sessionStorage.setItem('detailid', negoKey.key);
                alert('협상이 전송되었습니다.');
                location.href = '/ko/detail.html';
            }
        }
        else if(type === "NegoModify"){
            let reallysubmit = confirm('Do you really want to modify negotiation like this?');
            if(reallysubmit){
                const from = sessionStorage.getItem('from');
                const to = sessionStorage.getItem('to');

                const negoid = sessionStorage.getItem('detailid');
                database.ref('Negotiations/' + negoid).set({
                    start: startDate,
                    end: endDate,
                    negotiation: isNego,
                    to: to,
                    from: from,
                    madeBy: 'Me',
                    status: 'Negotiation Received'
                });

                database.ref('Negotiations/' + negoid + '/time').remove();
                for (let i = 0; i < times.length; i++) {
                    let targetTime = times[i];
                    let timeKey = database.ref('Negotiations/' + negoid + '/time').push();
                    timeKey.set({
                        day: targetTime[0],
                        start: targetTime[1],
                        end: targetTime[2]
                    })
                }

                sessionStorage.clear();
                sessionStorage.setItem('detailtype', 'Negotiations');
                sessionStorage.setItem('detailid', negoid);
                alert('협상이 수정되었습니다.');
                location.href = '/ko/detail.html';
            }
        }
        else{
            location.href = '/ko/404.html';
        }
    });

    // Section for Cancel button
    $(document).on('click', "#cancel", function(){
        history.back();
    });
});