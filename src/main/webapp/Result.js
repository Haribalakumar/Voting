// const uri = "http://localhost:9090/polling";
// let pollingDetail = [];
// let updateIndex = 0;
// function _displayItems() {
//     var html = "<table border='1|1'>";
//     for (var i = 0; i < pollingDetail.length; i++) {
//         html += "<tr>"; html += "<td>" + pollingDetail[i].party_name + "</td>";
//         html += "<td>" + pollingDetail[i].count + "</td>";
//         html += "</tr>";
//     }
//     html += "</table>";
//     document.getElementById("pollingDetail").innerHTML = html;
// }


const uri = "http://localhost:9090/result";
let pollingDetails = [];
function getAllVotes() {
    console.log("Display Item");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xhttp.responseText);
            console.log(response.nonPollingVotersList);
            _displayNonPolling(response.nonPollingVotersList);
            _displayPartyCounts(response.partyCountList);
            _displayGenderCounts(response.genderCountList);
            _displayPartyCountsByWard(response.groupedVotesbyward);
        }
    };
    xhttp.open("GET", uri, true);
    xhttp.send();
}
function _displayNonPolling(data) {
    pollingDetails = data;
    var html = "<table border='1|1'>";
    html += "<tr><th>VoterId</th><th>Name</th></tr>";
    for (var i = 0; i < data.length; i++) {
        html += "<tr>";
        html += "<td>" + data[i].voter_id + "</td>";
        html += "<td>" + data[i].name + "</td>";
        html += "</tr>";
    }
    html += "</table>";
    document.getElementById("nonpoll").innerHTML = html;
}
function _displayPartyCounts(data) {
    var html = "<table border='1|1'>";
    html += "<tr>";
    html += "<th>Party Name</th>";
    html += "<th>Count</th>";
    html += "</tr>";
    Object.entries(data).forEach(([key, value]) => {
        html += "<tr>";
        html += "<td>" + key + "</td>";
        html += "<td>" + value + "</td>";
        html += "</tr>";
    });
    html += "</table>";
    document.getElementById("party").innerHTML = html;
}
function _displayGenderCounts(data) {
    var html = "<table border='1|1'>";
    html += "<tr>";
    html += "<th>Gender</th>";
    html += "<th>Count</th>";
    html += "</tr>";
    Object.entries(data).forEach(([key, value]) => {
        html += "<tr>";
        html += "<td>" + key + "</td>";
        html += "<td>" + value + "</td>";
        html += "</tr>";
    });
    html += "</table>";
    document.getElementById("gender").innerHTML = html;
}
function _displayPartyCountsByWard(data) {
    var html = "<table border='1|1'>";
    html += "<tr>";
    html += "<th>Ward</th>";
    html += "<th>Party Name</th>";
    html += "<th>Count</th>";
    html += "</tr>";
    Object.entries(data).forEach(([ward, key]) => {
        Object.entries(key).forEach(([party, count]) => {
            html += "<tr>";
            html += "<td>" + ward + "</td>";
            html += "<td>" + party + "</td>";
            html += "<td>" + count + "</td>";
            html += "</tr>";
        });
    });
    html += "</table>";
    document.getElementById("ward").innerHTML = html;
}