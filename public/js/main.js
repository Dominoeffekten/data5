"use strict";
const $ = function (foo) {
    return document.getElementById(foo);
};

//API CVR
    let xhrAPi = new XMLHttpRequest()
    xhrAPi.addEventListener("load", function() {
        let obj = JSON.parse(xhrAPi.responseText);
        //console.log(obj);

        var navn = obj.name;
        var city = obj.city;
        var start = obj.startdate;
        var pro = obj.protected;
        var desc = obj.industrydesc;
        var credit = obj.creditbankrupt;
        for(var i = 0; i <= 1; i++){
            //var owners = obj.owners[i].name;
        }
        if (credit == false){
            credit = "Nej";
        } else{
            credit = "Ja";
        }
        if (pro == false){
            pro = "Nej";
        } else{
            pro = "Ja";
        }

        $("company").innerHTML += `<h2>${navn}</h2>
        <p>
            <b>Ejer: </b> <br>
            <b>Start dato:</b> ${start}<br> 
            <b>By:</b> ${city} <br> 
            <b>Beskyttet:</b> ${pro} <br>
            <b>Konkurs:</b> ${credit} <br>
            <b>Beskrivelse:</b> ${desc} 
        </p>`
        
            //API GEO
            let xhrGEO = new XMLHttpRequest()
            xhrGEO.addEventListener("load", function() {
                
                let obj = JSON.parse(xhrGEO.responseText);
                //console.log(obj);
                var r = obj.results
                for(var i = 0; i <= r.length; i++){
                    var lat = r[0].annotations.DMS.lat;
                    var lng = r[0].annotations.DMS.lng;
                }
                lat = lat.slice(8, 16);
                lng = lng.slice(7, 15);

                $("company").innerHTML += `
                <h3>Koordinater</h3>
                <p>
                    <b>Breddegrad/Latitude:</b> ${lat} <br>
                    <b>Længdegrad/Longitude:</b> ${lng} <br>
                </p>` 
                var lng =  44.58000
            var lat = 22.19964

                let xhr = new XMLHttpRequest()
                xhr.open("GET", "https://mastedatabasen.dk/Master/antenner/55.700677,12.59074.json", true);
                //xhr.open("GET", "https://mastedatabasen.dk/Master/antenner/"+lng+","+lng+".json", true);



                xhr.addEventListener("load", function() {
                    let obj = JSON.parse(xhr.responseText);
                    //console.log(obj);
                    var drift = obj.idriftsaettelsesdato;
                    var nr = obj.husnr;
                    var gade = obj.vejnavn.navn
                    var by = obj.postnummer.navn;

                    $("company").innerHTML += `<h3>Næremste mast</h3>
                    <p>
                        <b>Gade:</b> ${gade} ${nr}<br>
                        <b>By: </b> ${by} <br>
                        <b>Idræftsættelsedato: </b> ${drift}
                    </p>`
                    
                    
                });
                xhr.send();
            });
            var city = "kolding";
            xhrGEO.open("GET", "https://api.opencagedata.com/geocode/v1/json?q="+city+"&key=dc74b79795e34f829f7c960c29d694f2");
            xhrGEO.send();
        
    });

$("go").addEventListener("click", function(){
    let input = $("cvrNum").value;
    xhrAPi.open("GET", "https://cvrapi.dk/api?search="+input+"&country=dk");



    xhrAPi.send();
});

