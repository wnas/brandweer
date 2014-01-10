var brandweer = function () {
    var config = {
        // foo: bar
        "src":"js/json/dummy.json",
        "data":{
            "dummy":{
                "contact":{
                    "firstname":"Milo",
                    "surname":"van der Linden",
                    "companyname":"ollyMolly",
                    "address":{
                        "street":"straat naam",
                        "number":"2",
                        "addition":"a",
                        "postalcode":"1234aa",
                        "municipality":"Den Bosch"
                    },
                    "email":"gerben@mail.ma",
                    "telephone":"+316123456789"
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
        populate();


        testing();
    }, populate = function () {
        // console.log($.get(config.src));
        $.getJSON(config.src, function (data) {

            var cn = data.dummy.contact.companyname;
            //alert(cn);
        });

        var contact = config.data.dummy.contact;
        for (key in contact) {
            if (typeof contact[key] === "object") {
                var address = config.data.dummy.contact[key];
                for (i in address) {
                    $('#'+i).val(address[i]);
                }
            } else {
                $('#'+key).val(contact[key]);
            }
        }
    }, doMaps = function () {
        $('#kaart').show();
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


        var coords = [51.690599, 5.3064146];
      var map = L.map('map').setView(coords, 18);
        var cloudmadeUrl = 'http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.jpg',
            subDomains = ['1', '2', '3', '4'],
            cloudmade = new L.TileLayer(cloudmadeUrl, {subdomains:subDomains, maxZoom:18});

        map.addLayer(cloudmade);

        var marker = L.marker(coords).addTo(map);

        marker.bindPopup("<h3>Ha gerben!</h3><p>hier zitten we</p>").openPopup();

        L.geoJson(milo).addTo(map);
    },  testing = function(){

        $('#contact button[type=submit]').click(function(){
            $('fieldset').hide();
            doMaps();

        })
    };

    return {
        init:init
    };
}();

brandweer.init();


