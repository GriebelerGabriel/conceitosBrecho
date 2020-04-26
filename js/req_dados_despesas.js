var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            console.log('response text: ')
            console.log(this.responseText)

        }
    }
    var tipo = "POST"
    /*
    tipo pode ser POST, GET, DELETE, PATCH depende do que vc quer
    */
    
    var url = "/api/clientes"
    
    xhttp.open(tipo, url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    
    var body = { titulo: "exemplo", data: "2020-04-24"}
    
    xhttp.send(JSON.stringify(body));

    module.exports = body