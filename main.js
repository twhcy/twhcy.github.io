//bindPopup
function onEachFeature(feature, layer) {
    //let popupContent = `<p>I started out as a GeoJSON ${feature.geometry.type}, but now I'm a Leaflet vector!</p>`;
    let popupContent = `自動雨量站：`;
    if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
    }

    layer.bindPopup(popupContent);
}

document.addEventListener("DOMContentLoaded", function () {
    var map = L.map('map').setView([23.505, 121.09], 7);
    var bicycleRental = {
        "type": "FeatureCollection",
        "features": [
            {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        121.0505,
                        23.594
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "P1"
                },
                "id": 51
            },
            {
                "geometry": {
                    "type": "Point",
                    "coordinates": [
                        121.09983,
                        23.575028
                    ]
                },
                "type": "Feature",
                "properties": {
                    "popupContent": "P2"
                },
                "id": 52
            }
        ]
    };
    var campus = {
        "type": "Feature",
        "properties": {
            "popupContent": "This is the Auraria West Campus",
            "style": {
                weight: 2,
                color: "#999",
                opacity: 1,
                fillColor: "#B0DE5C",
                fillOpacity: 10.8
            }
        },
        "geometry": {
            "type": "MultiPolygon",
            "coordinates": [
                [
                    [
                        [121.0432014465332, 23.74732195489861],
                        [121.0715255737305, 23.74620006835170],
                        [121.0921249389647, 23.74468219277038],
                        [121.01067161560059, 23.74362625960105],
                        [121.01195907592773, 23.74290029616054],
                        [121.0989913940431, 23.74078835902781],
                        [121.0758171081543, 23.74059036160317],
                        [121.0346183776855, 23.74059036160317],
                        [121.0097274780272, 23.74059036160317],
                        [121.0062942504881, 23.74072235994946],
                        [121.0020027160645, 23.74191033368865],
                        [121.0071525573731, 23.74276830198601],
                        [121.0097274780272, 23.74369225589818],
                        [121.0097274780272, 23.74461619742136],
                        [121.0123023986816, 23.74534214278395],
                        [121.0183105468751, 23.74613407445653],
                        [121.0432014465332, 23.74732195489861]
                    ], [
                        [121.0361204147337, 23.74354376414072],
                        [121.0301122665405, 23.74278480127163],
                        [121.0221729278564, 23.74316428375108],
                        [121.0283956527711, 23.74390674342741],
                        [121.0361204147337, 23.74354376414072]
                    ]
                ], [
                    [
                        [121.0942707061768, 23.73989736613708],
                        [121.0942707061768, 23.73910536278566],
                        [121.0685214996338, 23.73923736397631],
                        [121.0384807586671, 23.73910536278566],
                        [121.0174522399902, 23.73903936209552],
                        [121.0041484832764, 23.73910536278566],
                        [121.0041484832764, 23.73979836621592],
                        [121.0535011291504, 23.73986436617916],
                        [121.0942707061768, 23.73989736613708]
                    ]
                ]
            ]
        }
    };

    const sgetRain = document.querySelector("#getRain");
    sgetRain.addEventListener("click", function (event) {
        event.preventDefault();
        alert("GET");
        var RainStation = {
            "type": "FeatureCollection",
            "features": []
        };
        /*

        RainStation.features.push(Station);
        Station.geometry.coordinates = [121.0955, 23.55];
        console.log(Station);
        RainStation.features.push(Station);
        console.log(RainStation);
        */

        //"https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=rdec-key-123-45678-011121314&stationId=C0F000,C0F0A0,C0F0B0,C0F0C0,C0F0D0,C0F0E0,C0F850,C0F861,C0F930,C0F970,C0F9A0,C0F9I0,C0F9K0,C0F9L0,C0F9M0,C0F9N0,C0F9O0,C0F9P0,C0F9Q0,C0F9R0,C0F9S0,C0F9T0,C0F9U0,C0F9V0,C0F9X0,C0F9Y0,C0F9Z0,C0FA00,C0FA10,C0FA20,C0FA30&elementName=RAIN,MIN_10,HOUR_3,HOUR_6,HOUR_12,HOUR_24,NOW"        
        postData("https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=rdec-key-123-45678-011121314&elementName=RAIN,MIN_10,HOUR_3,HOUR_6,HOUR_12,HOUR_24,NOW"
            , {})
            .then(data => {
                //console.log(data);
                if (data.success == "true") {
                    for (let index = 0; index < data.records.location.length; index++) {
                        const element = data.records.location[index];
                        var Station;
                        Station = {
                            "geometry": {
                                "type": "Point",
                                "coordinates": [element.lon, element.lat]
                            },
                            "type": "Feature",
                            "properties": {
                                "popupContent": `${element.locationName}<BR>${element.time.obsTime}<br>${element.weatherElement[6].elementName}:${element.weatherElement[6].elementValue}`,
                                "data": element.weatherElement[6].elementValue
                            },
                            "id": index
                        };
                        RainStation.features.push(Station);
                    }
                    //console.log(RainStation);
                    const RainStationLayer = L.geoJSON(RainStation, {

                        style(feature) {
                            return feature.properties && feature.properties.style;
                        },

                        onEachFeature,

                        pointToLayer(feature, latlng) {
                            var Rr = 5;
                            if (feature.properties.data > 0) {
                                Rr = feature.properties.data*3;
                            }
                            else {
                                Rr = 2.5;
                            }
                            return L.circleMarker(latlng, {
                                radius: Rr,                                
                                fillColor: '#ff7800',
                                color: '#000',
                                weight: 1,
                                opacity: 0.8,
                                fillOpacity: 0.58
                            });
                        }
                    }).addTo(map);

                }
            }
            ) // JSON from `response.json()` call
            .catch(error => console.error(error));

        //GetCWBRainData();
    });

    //https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=rdec-key-123-45678-011121314&stationId=C0F000,C0F0A0,C0F0B0,C0F0C0,C0F0D0,C0F0E0,C0F850,C0F861,C0F930,C0F970,C0F9A0,C0F9I0,C0F9K0,C0F9L0,C0F9M0,C0F9N0,C0F9O0,C0F9P0,C0F9Q0,C0F9R0,C0F9S0,C0F9T0,C0F9U0,C0F9V0,C0F9X0,C0F9Y0,C0F9Z0,C0FA00,C0FA10,C0FA20,C0FA30&elementName=RAIN,MIN_10,HOUR_3,HOUR_6,HOUR_12,HOUR_24,NOW

    const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; <a href=\"http://www.openstreetmap.org/copyright\">OpenStreetMap</a>"
    }).addTo(map);
    /*
        const bicycleRentalLayer = L.geoJSON([bicycleRental, campus], {
    
            style(feature) {
                return feature.properties && feature.properties.style;
            },
    
            onEachFeature,
    
            pointToLayer(feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 8,
                    fillColor: '#ff7800',
                    color: '#000',
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8
                });
            }
        }).addTo(map);
        */
});

function postData(url, data) {
    // Default options are marked with *
    return fetch(url, {
        //body: JSON.stringify(data), // must match 'Content-Type' header
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: 'same-origin', // include, same-origin, *omit
        /*
        headers: {
            'user-agent': 'Mozilla/4.0 MDN Example',
            'content-type': 'application/json'
        },
        */
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        redirect: 'follow', // manual, *follow, error
        //referrer: 'no-referrer', // *client, no-referrer
    })
        .then(response => response.json()) // 輸出成 json
}

//中央氣象局開放資料平臺之資料擷取API
//https://opendata.cwb.gov.tw/dist/opendata-swagger.html?urls.primaryName=openAPI
//工作站清單
//var CWBRainData;
//取得氣象局開放資料
function GetCWBRainData() {
    $.ajax({
        method: "GET",
        async: false,
        url: "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0002-001?Authorization=rdec-key-123-45678-011121314",
        data: { stationId: "C0F000,C0F0A0,C0F0B0,C0F0C0,C0F0D0,C0F0E0,C0F850,C0F861,C0F930,C0F970,C0F9A0,C0F9I0,C0F9K0,C0F9L0,C0F9M0,C0F9N0,C0F9O0,C0F9P0,C0F9Q0,C0F9R0,C0F9S0,C0F9T0,C0F9U0,C0F9V0,C0F9X0,C0F9Y0,C0F9Z0,C0FA00,C0FA10,C0FA20,C0FA30", elementName: "RAIN,MIN_10,HOUR_3,HOUR_6,HOUR_12,HOUR_24,NOW" },
        //data:{jq:"LManagerlist"},
        dataType: "json",
        beforeSend: function () {
            $("#CWBRain").html("wait....");
        }
    }
    ).done(function (CWBRainData) {
        //console.log(data);
        if (CWBRainData.success == "true") {
            var records = CWBRainData.records.location;
            var fields = CWBRainData.result.fields;
            //$('#getRain').append()
            //var cols = Object.keys(CWBRainData.records);
            console.log(fields);
            console.log(records);
            var strHTML = "";

            strHTML = "<table><thead><tr><th>緯度(lat)</th><th>經度(lon)</th><th>站名(locationName)</th><th>站代碼(stationId)</th>";
            strHTML += "<th>時間(time.obsTime)</th><th>雨(weatherElement.RAIN)</th><th>十分鐘(weatherElement.MIN_10)</th>";
            strHTML += "<th>3小時(weatherElement.HOUR_3)</th><th>6小時(weatherElement.HOUR_6)</th><th>12小時(weatherElement.HOUR_12)</th>";
            strHTML += "<th>24小時(weatherElement.HOUR_24)</th><th>現在(weatherElement.NOW)</th></tr></thead><tbody>";

            $("#CWBRain").html(strHTML);
            //$("#CWBRain").append("<td>時間(time.obsTime)</td><td>雨(weatherElement.RAIN)</td><td>十分鐘(weatherElement.MIN_10)</td>");
            //$("#CWBRain").append("<td>3小時(weatherElement.HOUR_3)</td><td>6小時(weatherElement.HOUR_6)</td><td>12小時(weatherElement.HOUR_12)</td>");
            //$("#CWBRain").append("<td>24小時(weatherElement.HOUR_24)</td><td>現在(weatherElement.NOW)</td></th>");

            for (var i = 0; i < records.length; i++) {
                strHTML += "<tr>";

                strHTML += "<td>" + records[i].lat + "</td>";
                strHTML += "<td>" + records[i].lon + "</td>";
                strHTML += "<td>" + records[i].locationName + "</td>";
                strHTML += "<td>" + records[i].stationId + "</td>";
                strHTML += "<td>" + records[i].time.obsTime + "</td>";
                for (var j = 0; j < records[i].weatherElement.length; j++) {
                    strHTML += "<td>" + records[i].weatherElement[j].elementValue + "</td>";
                }

                strHTML += "</tr>";
            }

            strHTML += "</tbody></table>";
            $("#CWBRain").html(strHTML);
        }
        else {
            alert("ERROR");
        }
        //LManaList = data;
        //alert(data[0].msg);
    });

}
