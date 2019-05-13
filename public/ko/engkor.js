function weekEngKor(val){
    if (val === "Mon"){
        return '월';
    }
    else if (val === "Tue"){
        return '화';
    }
    else if (val === "Wed"){
        return '수';
    }
    else if (val === "Thur"){
        return '목';
    }
    else if (val === "Fri"){
        return '금';
    }
    else if (val === "Sat"){
        return '토';
    }
    else if (val === "Sun"){
        return "일";
    }
    else {
        return val;
    }
}

function statusEngKor(val){
    if (val === "Negotiation Received"){
        return "협상 받음";
    }
    else if (val === "Accepted"){
        return "수락됨";
    }
    else {
        return val;
    }
}