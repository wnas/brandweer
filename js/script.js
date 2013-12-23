var brandweer = function () {
    var config = {
        // foo: bar
        "src":"js/json/dummy.js",
        "data":{
            "dummy":{
                "contact":{
                    "firstname":"voornaam",
                    "surname":"achternaam",
                    "companyname":"bedrijfsnaam",
                    "address":{
                        "street":"straat naam",
                        "number":"2",
                        "addition":"a",
                        "postalcode":"1234aa",
                        "municipality":"Den Bosch"
                    },
                    "email":"gerben@mail.ma",
                    "tel":"+316123456789"
                },
                "buildings":[
                    {
                        "entrance":{
                            "main":{
                                "geometry":{
                                    "type":"Point",
                                    "coordinates":[
                                        51.690599, 5.3064146
                                    ]
                                }
                            },
                            "sub":[
                                {
                                    "geometry":{
                                        "type":"Point",
                                        "coordinates":[
                                            51.690599, 5.3064146
                                        ]
                                    }
                                }
                            ]
                        },
                        "function":"functiona",
                        "subfunction":"subfunctiona",
                        "gas":{
                            "places":[
                                {
                                    "amount":"1",
                                    "geometry":{
                                        "type":"Point",
                                        "coordinates":[
                                            51.690599, 5.3064146
                                        ]
                                    }
                                }
                            ]
                        },
                        "substances":{
                            "places":[
                                {
                                    "kind":"foo",
                                    "amount":"1",
                                    "geometry":{
                                        "type":"Point",
                                        "coordinates":[
                                            51.690599, 5.3064146
                                        ]
                                    }
                                }
                            ]
                        },
                        "drogeStijgLeiding":[
                            {
                                "geometry":{
                                    "type":"Point",
                                    "coordinates":[
                                        51.690599, 5.3064146
                                    ]
                                }
                            }
                        ],
                        "rwa":[
                            {
                                "geometry":{
                                    "type":"Point",
                                    "coordinates":[
                                        51.690599, 5.3064146
                                    ]
                                }
                            },
                            {
                                "geometry":{
                                    "type":"Point",
                                    "coordinates":[
                                        51.690599, 5.3064146
                                    ]
                                }
                            }
                        ],
                        "stories":"2",
                        "bvh":"yes",
                        "people":[
                            {
                                "kind":"bewoners",
                                "day":"5",
                                "evening":"5",
                                "night":"5"
                            },
                            {
                                "kind":"bezoekers",
                                "day":"3",
                                "evening":"5",
                                "night":"0"
                            },
                            {
                                "kind":"personeel",
                                "day":"5",
                                "evening":"7",
                                "night":"0"
                            }
                        ]

                    },
                    {
                        "entrance":{
                            "main":{
                                "geometry":{
                                    "type":"Point",
                                    "coordinates":[
                                        51.690599, 5.3064146
                                    ]
                                }
                            },
                            "sub":[
                                {
                                    "geometry":{
                                        "type":"Point",
                                        "coordinates":[
                                            51.690599, 5.3064146
                                        ]
                                    }
                                },
                                {
                                    "geometry":{
                                        "type":"Point",
                                        "coordinates":[
                                            51.690599, 5.3064146
                                        ]
                                    }
                                }
                            ]

                        },
                        "function":"functionb",
                        "subfunction":"subfunctionb",
                        "gas":{
                            "places":[
                                {
                                    "amount":"2",
                                    "geometry":{
                                        "type":"Point",
                                        "coordinates":[
                                            51.690599, 5.3064146
                                        ]
                                    }
                                },
                                {
                                    "amount":"3",
                                    "geometry":{
                                        "type":"Point",
                                        "coordinates":[
                                            51.690599, 5.3064146
                                        ]
                                    }
                                }
                            ]
                        },
                        "stories":"1",
                        "bvh":"no",
                        "people":[
                            {
                                "kind":"personeel",
                                "day":"5",
                                "evening":"0",
                                "night":"0"
                            }
                        ]

                    }

                ],
                "excercise":"yes"
            }
        }


    }, init = function () {
        // populate();
        doMaps();
    }, populate = function () {
        // console.log($.get(config.src));
        $.getJSON(config.src, function (data) {
            console.log(data.dummy);
            var cn = data.dummy.contact.companyname;
            //alert(cn);
        });
        console.log(config.data.dummy);
        var contact = config.data.dummy.contact;
        for (key in contact) {
            if (typeof contact[key] === "object") {
                var address = config.data.dummy.contact[key];
                for (i in address) {
                    console.log(address[i]);
                }
            } else {
                console.log(contact[key]);
            }
        }
    }, doMaps = function () {
        var data = {"type":"FeatureCollection", "features":[
            {"type":"Feature", "id":"pand.fid--19c913a3_1431ecdbc7e_-2139", "geometry":{"type":"MultiPolygon", "coordinates":[
                [
                    [
                        [151134.604, 415740.892],
                        [151134.449, 415739.894],
                        [151137.551, 415739.411],
                        [151137.703, 415740.416],
                        [151142.074, 415739.735],
                        [151143.109, 415746.354],
                        [151141.518, 415746.601],
                        [151141.902, 415749.071],
                        [151135.006, 415750.142],
                        [151134.958, 415749.837],
                        [151135.426, 415749.764],
                        [151135.086, 415747.606],
                        [151131.249, 415748.202],
                        [151130.207, 415741.589],
                        [151134.604, 415740.892]
                    ]
                ]
            ]}, "geometry_name":"geometrie", "properties":{"gid":9334824, "identificatie":796100000431787, "bouwjaar":2010, "status":"Pand in gebruik", "gebruiksdoel":"woonfunctie", "oppervlakte_min":194, "oppervlakte_max":194, "aantal_verblijfsobjecten":1}}
        ], "crs":{"type":"EPSG", "properties":{"code":"28992"}}}

        var test = {"type":"FeatureCollection", "features":[
            {"type":"Feature", "id":"verblijfsobject.fid--460cbd04_1431ecce602_72a9", "geometry":{"type":"Point", "coordinates":[151131.532, 415746.58]}, "geometry_name":"geometrie", "properties":{"gid":8635823, "identificatie":796010000431789, "oppervlakte":194, "status":"Verblijfsobject in gebruik", "gebruiksdoel":"woonfunctie", "openbare_ruimte":"Hark", "huisnummer":15, "huisletter":null, "toevoeging":null, "postcode":"5236PD", "woonplaats":"'s-Hertogenbosch", "bouwjaar":2010, "pandidentificatie":796100000431787, "pandstatus":"Pand in gebruik", "pandgeometrie":{"type":"MultiPolygon", "coordinates":[
                [
                    [
                        [151134.604, 415740.892],
                        [151134.449, 415739.894],
                        [151137.551, 415739.411],
                        [151137.703, 415740.416],
                        [151142.074, 415739.735],
                        [151143.109, 415746.354],
                        [151141.518, 415746.601],
                        [151141.902, 415749.071],
                        [151135.006, 415750.142],
                        [151134.958, 415749.837],
                        [151135.426, 415749.764],
                        [151135.086, 415747.606],
                        [151131.249, 415748.202],
                        [151130.207, 415741.589],
                        [151134.604, 415740.892]
                    ]
                ]
            ]}}}
        ], "crs":{"type":"EPSG", "properties":{"code":"28992"}}}

        var milo = {
            "type":"FeatureCollection",
            "features":[
                {
                    "type":"Feature",
                    "id":"pand.fid--19c913a3_1431ecdbc7e_-2139",
                    "geometry":{
                        "type":"MultiPolygon",
                        "coordinates":[
                            [
                                [
                                    [151134.604, 415740.892],
                                    [151134.449, 415739.894],
                                    [151137.551, 415739.411],
                                    [151137.703, 415740.416],
                                    [151142.074, 415739.735],
                                    [151143.109, 415746.354],
                                    [151141.518, 415746.601],
                                    [151141.902, 415749.071],
                                    [151135.006, 415750.142],
                                    [151134.958, 415749.837],
                                    [151135.426, 415749.764],
                                    [151135.086, 415747.606],
                                    [151131.249, 415748.202],
                                    [151130.207, 415741.589],
                                    [151134.604, 415740.892]
                                ]
                            ]
                        ]},
                    "geometry_name":"geometrie",
                    "properties":{
                        "gid":9334824,
                        "identificatie":796100000431787,
                        "bouwjaar":2010,
                        "status":"Pand in gebruik",
                        "gebruiksdoel":"woonfunctie",
                        "oppervlakte_min":194,
                        "oppervlakte_max":194,
                        "aantal_verblijfsobjecten":1
                    }
                }
            ], "crs":{
                "type":"EPSG",
                "properties":{
                    "code":"28992"
                }
            }
        };


//        var coords = [51.690599, 5.3064146];
//       // var map = L.map('map').setView(coords, 18);
//        var cloudmadeUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg',
//            subDomains = ['1', '2', '3', '4'],
//            cloudmade = new L.TileLayer(cloudmadeUrl, {subdomains:subDomains, maxZoom:18});
//
//        map.addLayer(cloudmade);
//
//        var marker = L.marker(coords).addTo(map);
//
//        marker.bindPopup("<h3>Ha gerben!</h3><p>hier zitten we</p>").openPopup();
//
//        L.geoJson(milo).addTo(map);
    };
    return {
        init:init
    };
}();

brandweer.init();

/*

 /**
 * Leaflet biedt standaard geen ondersteuning voor proj4js, de bibliotheek
 * die nodig is voor het omzetten van het transformeren van coordinaat-
 * systemen.
 *
 * Hiervoor heeft Bart van den Eijnden een stukje integratie geschreven.
 * bron: https://github.com/bartvde/PDOK-Leaflet
 */

L.CRS.proj4js = (function () {
    var createProjection = function (code, def, /*L.Transformation*/ transformation) {
        if (typeof(def) !== 'undefined') {
            Proj4js.defs[code] = def;
        }
        var proj = new Proj4js.Proj(code);

        return {
            project: function (latlng) {
                var point = new L.Point(latlng.lng, latlng.lat);
                return Proj4js.transform(Proj4js.WGS84, proj, point);
            },

            unproject: function (point, unbounded) {
                var point2 = Proj4js.transform(proj, Proj4js.WGS84, point.clone());
                return new L.LatLng(point2.y, point2.x, unbounded);
            }
        };
    };

    return function (code, def, transformation) {
        return L.Util.extend({}, L.CRS, {
            code: code,
            transformation: transformation ? transformation: new L.Transformation(1, 0, -1, 0),
            projection: createProjection(code, def)
        });
    };
}());

// maak een array met de resoluties benodigd voor het tileschema:
var rd_res = [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420];
// maak van de projectiestring voor het Rijksdriehoekstelsel een Leaflet projectie object:
var rd = L.CRS.proj4js('EPSG:28992',
    '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 ' +
        '+ellps=bessel +units=m ' +
        '+towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs',
    new L.Transformation(
        1,
        285401.920,
        -1,
        903401.920
    ));
// Override de scale instelling voor het schema:
rd.scale = function(zoom) {
    return 1 / rd_res[zoom];
};
// Kaart initialiseren:
var map = new L.Map('map', {
    continuousWorld: true,
    crs: rd,
    layers: [
        // De layer van de openbasiskaart
        new L.TileLayer(
            'http://www.openbasiskaart.nl/mapcache/tms/1.0.0/osm@rd/{z}/{x}/{y}.png', {
                tms: true,
                minZoom: 3,
                maxZoom: 13,
                continuousWorld: true
            }
        )
    ],
    center: new L.LatLng(52, 5.3),
    zoom: 3
});

