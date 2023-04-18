const uri = "http://localhost:9090/polling";
function addItem() {
    //  console.log("polling aditem");
    alert("Thanks For Voting");
    window.location.href='http://localhost:9090/';
    const item = {
        voter_id: document.getElementById("voter_id").value,
        ward: document.getElementById("ward").value,
        party_name: document.getElementById("party_name").value,
    };
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", uri, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(item));
}