$(document).ready(function() {

    let config = {
        apiKey: "AIzaSyAJYY0Az45sH0Sw6jAz3JvR4yjJBIMtbzU",
        authDomain: "squad-67b43.firebaseapp.com",
        databaseURL: "https://squad-67b43.firebaseio.com/",
    };
    firebase.initializeApp(config);
    let database = firebase.database();
    const type = sessionStorage.getItem('type');
    let offerOwner = undefined;

    function initialize(){
        let date = new Date();
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

        let worktimes = document.getElementById('worktime');
        const trueradio = document.getElementById('isNegoTrue');
        const falseradio = document.getElementById('isNegoFalse');

        if(type === 'Enroll'){
            document.getElementById('name').innerHTML = "<i class=\"icon sign-out\"></i>등록";

            // Worktime Section
            let newtime = document.createElement('div');
            newtime.className = "inline fields";

            let blankField = document.createElement('div');
            blankField.className = "two wide field";
            newtime.appendChild(blankField);

            let daySelection = document.createElement('div');
            daySelection.className = "one field";
            daySelection.innerHTML = "<select class=\"ui fluid dropdown\">\n" +
                "\t<option value=\"\">요일</option>\n" +
                "\t<option value=\"Mon\">월</option>\n" +
                "\t<option value=\"Tue\">화</option>\n" +
                "\t<option value=\"Wed\">수</option>\n" +
                "\t<option value=\"Thur\">목</option>\n" +
                "\t<option value=\"Fri\">금</option>\n" +
                "\t<option value=\"Sat\">토</option>\n" +
                "\t<option value=\"Sun\">일</option></select>";
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

            document.getElementById('loader').remove();
        }
        else {
            const detailtype = sessionStorage.getItem('detailtype');
            const detailid = sessionStorage.getItem('detailid');
            const databaseRef = detailtype + '/' + detailid;

            if (type === 'Modify') {
                document.getElementById('name').innerHTML = "<i class=\"icon sign-out\"></i>등록한 제안 수정";
                database.ref(databaseRef).once('value', function (snapshot) {
                    document.getElementById('start_date').setAttribute('value', snapshot.val().start);
                    document.getElementById('end_date').setAttribute('value', snapshot.val().end);

                    let isPossible = snapshot.val().negotiation;
                    if (isPossible === "true" || isPossible === true) {
                        trueradio.setAttribute('checked', "");
                    } else {
                        falseradio.setAttribute('checked', "");
                    }

                    snapshot.child('time').forEach(function (data) {
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
                        nothing.innerText = "요일";
                        selection.appendChild(nothing);

                        let monday = document.createElement('option');
                        monday.setAttribute('value', 'Mon');
                        monday.innerText = "월";
                        if (targetDay === 'Mon') {
                            monday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(monday);

                        let tuesday = document.createElement('option');
                        tuesday.setAttribute('value', 'Tue');
                        tuesday.innerText = "화";
                        if (targetDay === 'Tue') {
                            tuesday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(tuesday);

                        let wednesday = document.createElement('option');
                        wednesday.setAttribute('value', 'Wed');
                        wednesday.innerText = "수";
                        if (targetDay === 'Wed') {
                            wednesday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(wednesday);

                        let thursday = document.createElement('option');
                        thursday.setAttribute('value', 'Thur');
                        thursday.innerText = "목";
                        if (targetDay === 'Thur') {
                            thursday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(thursday);

                        let friday = document.createElement('option');
                        friday.setAttribute('value', 'Fri');
                        friday.innerText = "금";
                        if (targetDay === 'Fri') {
                            friday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(friday);

                        let saturday = document.createElement('option');
                        saturday.setAttribute('value', 'Sat');
                        saturday.innerText = "토";
                        if (targetDay === 'Sat') {
                            saturday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(saturday);

                        let sunday = document.createElement('option');
                        sunday.setAttribute('value', 'Sun');
                        sunday.innerText = "일";
                        if (targetDay === 'Sun') {
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

                    if (worktimes.childNodes.length === 1) {
                        worktimes.lastChild.removeChild(worktimes.lastChild.lastChild);
                    }
                    let plusButton = document.createElement('div');
                    plusButton.className = "one field";
                    plusButton.innerHTML = "<button id=\"more_time\" class=\"yellow circular ui icon button\"><i class=\"icon plus\"></i></button>";
                    worktimes.lastChild.appendChild(plusButton);

                    const date = new Date();
                    let currentTime = date.getFullYear() + '-';
                    if (date.getMonth() < 9) {
                        currentTime = currentTime + '0' + (date.getMonth() + 1) + '-';
                    } else {
                        currentTime = currentTime + (date.getMonth() + 1) + '-';
                    }
                    if (date.getDate() < 10) {
                        currentTime = currentTime + '0' + date.getDate();
                    } else {
                        currentTime = currentTime + date.getDate();
                    }

                    document.getElementById('start_date').setAttribute('min', currentTime);
                    document.getElementById('end_date').setAttribute('min', currentTime);
                }).then(function () {
                    document.getElementById('loader').remove();
                });

            } else if (type === 'Negotiate') {
                database.ref(databaseRef).once('value', function (snapshot) {
                    if(sessionStorage.getItem('detailtype') === "Negotiations"){
                        offerOwner = snapshot.val().from;
                        if (offerOwner !== "Me"){
                            document.getElementById('name').innerHTML = "<i class=\"icon sign-in\"></i>" + offerOwner + " 가게에서 알바를 받아오는 협상";
                        }
                        else{
                            document.getElementById('name').innerHTML = "<i class=\"icon sign-out\"></i>" + snapshot.val().to + " 가게로 알바를 보내는 협상";
                        }
                    }
                    else{
                        offerOwner = snapshot.val().user;
                        document.getElementById('name').innerHTML = "<i class=\"icon sign-in\"></i>" + offerOwner + " 가게에서 알바를 받아오는 협상";
                    }

                    document.getElementById('start_date').setAttribute('value', snapshot.val().start);
                    document.getElementById('end_date').setAttribute('value', snapshot.val().end);

                    let isPossible = snapshot.val().negotiation;
                    if (isPossible === "true" || isPossible === true) {
                        trueradio.setAttribute('checked', "");
                    } else {
                        falseradio.setAttribute('checked', "");
                    }

                    let worktimes = document.getElementById('worktime');
                    snapshot.child('time').forEach(function (data) {
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
                        nothing.innerText = "요일";
                        selection.appendChild(nothing);

                        let monday = document.createElement('option');
                        monday.setAttribute('value', 'Mon');
                        monday.innerText = "월";
                        if (targetDay === 'Mon') {
                            monday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(monday);

                        let tuesday = document.createElement('option');
                        tuesday.setAttribute('value', 'Tue');
                        tuesday.innerText = "화";
                        if (targetDay === 'Tue') {
                            tuesday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(tuesday);

                        let wednesday = document.createElement('option');
                        wednesday.setAttribute('value', 'Wed');
                        wednesday.innerText = "수";
                        if (targetDay === 'Wed') {
                            wednesday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(wednesday);

                        let thursday = document.createElement('option');
                        thursday.setAttribute('value', 'Thur');
                        thursday.innerText = "목";
                        if (targetDay === 'Thur') {
                            thursday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(thursday);

                        let friday = document.createElement('option');
                        friday.setAttribute('value', 'Fri');
                        friday.innerText = "금";
                        if (targetDay === 'Fri') {
                            friday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(friday);

                        let saturday = document.createElement('option');
                        saturday.setAttribute('value', 'Sat');
                        saturday.innerText = "토";
                        if (targetDay === 'Sat') {
                            saturday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(saturday);

                        let sunday = document.createElement('option');
                        sunday.setAttribute('value', 'Sun');
                        sunday.innerText = "일";
                        if (targetDay === 'Sun') {
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

                    if (worktimes.childNodes.length === 1) {
                        worktimes.lastChild.removeChild(worktimes.lastChild.lastChild);
                    }
                    let plusButton = document.createElement('div');
                    plusButton.className = "one field";
                    plusButton.innerHTML = "<button id=\"more_time\" class=\"yellow circular ui icon button\"><i class=\"icon plus\"></i></button>";
                    worktimes.lastChild.appendChild(plusButton);

                    const date = new Date();
                    let currentTime = date.getFullYear() + '-';
                    if (date.getMonth() < 9) {
                        currentTime = currentTime + '0' + (date.getMonth() + 1) + '-';
                    } else {
                        currentTime = currentTime + (date.getMonth() + 1) + '-';
                    }
                    if (date.getDate() < 10) {
                        currentTime = currentTime + '0' + date.getDate();
                    } else {
                        currentTime = currentTime + date.getDate();
                    }

                    document.getElementById('start_date').setAttribute('min', currentTime);
                    document.getElementById('end_date').setAttribute('min', currentTime);
                }).then(function () {
                    document.getElementById('loader').remove();
                });
            } else if (type === 'NegoModify') {
                database.ref(databaseRef).once('value', function (snapshot) {
                    offerOwner = snapshot.val().from;
                    if (offerOwner !== "Me"){
                        document.getElementById('name').innerHTML = "<i class=\"icon sign-in\"></i>" + offerOwner + " 가게에서 알바를 받아오는 협상 수정";
                    }
                    else{
                        document.getElementById('name').innerHTML = "<i class=\"icon sign-out\"></i>" + snapshot.val().to + " 가게로 알바를 보내는 협상 수정";
                    }

                    document.getElementById('start_date').setAttribute('value', snapshot.val().start);
                    document.getElementById('end_date').setAttribute('value', snapshot.val().end);

                    let isPossible = snapshot.val().negotiation;
                    if (isPossible === "true" || isPossible === true) {
                        trueradio.setAttribute('checked', "");
                    } else {
                        falseradio.setAttribute('checked', "");
                    }

                    let worktimes = document.getElementById('worktime');
                    snapshot.child('time').forEach(function (data) {
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
                        nothing.innerText = "요일";
                        selection.appendChild(nothing);

                        let monday = document.createElement('option');
                        monday.setAttribute('value', 'Mon');
                        monday.innerText = "월";
                        if (targetDay === 'Mon') {
                            monday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(monday);

                        let tuesday = document.createElement('option');
                        tuesday.setAttribute('value', 'Tue');
                        tuesday.innerText = "화";
                        if (targetDay === 'Tue') {
                            tuesday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(tuesday);

                        let wednesday = document.createElement('option');
                        wednesday.setAttribute('value', 'Wed');
                        wednesday.innerText = "수";
                        if (targetDay === 'Wed') {
                            wednesday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(wednesday);

                        let thursday = document.createElement('option');
                        thursday.setAttribute('value', 'Thur');
                        thursday.innerText = "목";
                        if (targetDay === 'Thur') {
                            thursday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(thursday);

                        let friday = document.createElement('option');
                        friday.setAttribute('value', 'Fri');
                        friday.innerText = "금";
                        if (targetDay === 'Fri') {
                            friday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(friday);

                        let saturday = document.createElement('option');
                        saturday.setAttribute('value', 'Sat');
                        saturday.innerText = "토";
                        if (targetDay === 'Sat') {
                            saturday.setAttribute('selected', 'selected');
                        }
                        selection.appendChild(saturday);

                        let sunday = document.createElement('option');
                        sunday.setAttribute('value', 'Sun');
                        sunday.innerText = "일";
                        if (targetDay === 'Sun') {
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

                    if (worktimes.childNodes.length === 1) {
                        worktimes.lastChild.removeChild(worktimes.lastChild.lastChild);
                    }
                    let plusButton = document.createElement('div');
                    plusButton.className = "one field";
                    plusButton.innerHTML = "<button id=\"more_time\" class=\"yellow circular ui icon button\"><i class=\"icon plus\"></i></button>";
                    worktimes.lastChild.appendChild(plusButton);

                    const date = new Date();
                    let currentTime = date.getFullYear() + '-';
                    if (date.getMonth() < 9) {
                        currentTime = currentTime + '0' + (date.getMonth() + 1) + '-';
                    } else {
                        currentTime = currentTime + (date.getMonth() + 1) + '-';
                    }
                    if (date.getDate() < 10) {
                        currentTime = currentTime + '0' + date.getDate();
                    } else {
                        currentTime = currentTime + date.getDate();
                    }

                    document.getElementById('start_date').setAttribute('min', currentTime);
                    document.getElementById('end_date').setAttribute('min', currentTime);
                }).then(function () {
                    document.getElementById('loader').remove();
                });
            }
            else {
                location.href = '/ko/404.html';
            }
        }
    }

    initialize();

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
            "\t<option value=\"\">요일</option>\n" +
            "\t<option value=\"Mon\">월</option>\n" +
            "\t<option value=\"Tue\">화</option>\n" +
            "\t<option value=\"Wed\">수</option>\n" +
            "\t<option value=\"Thur\">목</option>\n" +
            "\t<option value=\"Fri\">금</option>\n" +
            "\t<option value=\"Sat\">토</option>\n" +
            "\t<option value=\"Sun\">일</option></select>";
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
            errorlist.push('근무 시작일이 비어있습니다.');
        }
        let endDate = document.getElementById('end_date').value;
        if(endDate === ""){
            isValid = false;
            errorlist.push('근무 종료일이 비어있습니다.');
        }
        if (startDate !== "" && endDate !== "" && startDate > endDate){
            isValid = false;
            errorlist.push('근무 종료일이 근무 시작일보다 빠릅니다.');
        }


        let worktimes = document.getElementById('worktime');
        for(let i = 0; i < worktimes.childNodes.length; i++){
            let targetTime = worktimes.childNodes.item(i);
            let day = targetTime.childNodes.item(1).lastChild.value;
            let start = targetTime.childNodes.item(2).lastChild.value;
            let end = targetTime.childNodes.item(4).lastChild.value;

            if(day === "" || start === "" || end === ""){
                isValid = false;
                errorlist.push((i + 1) + '번째 근무 시간이 비어있습니다.');
            }
            if(start !== "" && end !== "" && start >= end){
                isValid = false;
                errorlist.push('End time of ' + (i + 1) + '번째 근무 시간의 시작 시간보다 종료 시간이 더 빠릅니다.');
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
            sessionStorage.setItem('name', document.getElementById('name').innerHTML);
            sessionStorage.setItem('start_date', startDate);
            sessionStorage.setItem('end_date', endDate);
            sessionStorage.setItem('negotiation', isNego);
            if(type === 'Negotiate' || type == 'NegoModify'){
                sessionStorage.setItem('from', offerOwner);
                sessionStorage.setItem('to', 'Me');
            }

            let times = [];

            for(let i = 0; i < worktimes.childNodes.length; i++){
                let targetTime = worktimes.childNodes.item(i);
                let singleTime = [];
                singleTime.push(targetTime.childNodes.item(1).lastChild.value);
                singleTime.push(targetTime.childNodes.item(2).lastChild.value);
                singleTime.push(targetTime.childNodes.item(4).lastChild.value);
                times.push(singleTime);
            }
            sessionStorage.setItem('times', JSON.stringify(times));

            location.href = '/ko/confirm.html';
        }
        else{
            let form = document.getElementById('form');
            let message = document.createElement('div');
            message.className = "ui error message";
            message.setAttribute('id', 'errorMessage');

            let messageHeader = document.createElement('div');
            messageHeader.className = "header";
            messageHeader.innerText = "현재 제출하시려는 페이지에 다음과 같은 오류가 있습니다.";
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
        let reallycancel = confirm('취소하고 이전 페이지로 돌아가시겠습니까?');
        if(reallycancel){
            history.back();
        }
    });
});