var brandweer = function(){
	var config = {
		// foo: bar
		"src":"js/json/dummy.js",
        "data": {
            "dummy": {
                "contact": {
                    "firstname":"voornaam",
                    "surname":"achternaam",
                    "companyname":"bedrijfsnaam",
                    "address": {
                        "street":"straat naam",
                        "number":"2",
                        "addition": "a",
                        "postalcode":"1234aa",
                        "municipality":"Den Bosch"
                    },
                    "email":"gerben@mail.ma",
                    "tel":"+316123456789"
                },
                "buildings": [
                    {
                        "entrance":{
                            "main":{
                                "geometry":{
                                    "type": "Point",
                                    "coordinates": [
                                        51.690599, 5.3064146
                                    ]
                                }
                            },
                            "sub": [
                                {
                                    "geometry":{
                                        "type": "Point",
                                        "coordinates": [
                                            51.690599, 5.3064146
                                        ]
                                    }
                                }
                            ]
                        },
                        "function":"functiona",
                        "subfunction": "subfunctiona",
                        "gas":{
                            "places": [
                                {
                                    "amount":"1",
                                    "geometry":{
                                        "type": "Point",
                                        "coordinates": [
                                            51.690599, 5.3064146
                                        ]
                                    }
                                }
                            ]
                        },
                        "substances":{
                            "places": [
                                {
                                    "kind":"foo",
                                    "amount":"1",
                                    "geometry":{
                                        "type": "Point",
                                        "coordinates": [
                                            51.690599, 5.3064146
                                        ]
                                    }
                                }
                            ]
                        },
                        "drogeStijgLeiding": [
                            {
                                "geometry":{
                                    "type": "Point",
                                    "coordinates": [
                                        51.690599, 5.3064146
                                    ]
                                }
                            }
                        ],
                        "rwa": [
                            {
                                "geometry":{
                                    "type": "Point",
                                    "coordinates": [
                                        51.690599, 5.3064146
                                    ]
                                }
                            },
                            {
                                "geometry":{
                                    "type": "Point",
                                    "coordinates": [
                                        51.690599, 5.3064146
                                    ]
                                }
                            }
                        ],
                        "stories": "2",
                        "bvh": "yes",
                        "people": [
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
                                    "type": "Point",
                                    "coordinates": [
                                        51.690599, 5.3064146
                                    ]
                                }
                            },
                            "sub": [
                                {
                                    "geometry":{
                                        "type": "Point",
                                        "coordinates": [
                                            51.690599, 5.3064146
                                        ]
                                    }
                                },
                                {
                                    "geometry":{
                                        "type": "Point",
                                        "coordinates": [
                                            51.690599, 5.3064146
                                        ]
                                    }
                                }
                            ]

                        },
                        "function":"functionb",
                        "subfunction": "subfunctionb",
                        "gas":{
                            "places": [
                                {
                                    "amount":"2",
                                    "geometry":{
                                        "type": "Point",
                                        "coordinates": [
                                            51.690599, 5.3064146
                                        ]
                                    }
                                },
                                {
                                    "amount":"3",
                                    "geometry":{
                                        "type": "Point",
                                        "coordinates": [
                                            51.690599, 5.3064146
                                        ]
                                    }
                                }
                            ]
                        },
                        "stories": "1",
                        "bvh": "no",
                        "people": [
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


    },	init = function(){
		populate();
	},	populate = function(){
		// console.log($.get(config.src));
//		$.getJSON( config.src , function( data ) {
//			console.log(data.dummy);
//			var cn = data.dummy.contact.companyname;
//			alert(cn);
//		});
        console.log(config.data.dummy);
        var contact = config.data.dummy.contact;
        for( key in contact){
            if ( typeof contact[key] === "object"){
                var address = config.data.dummy.contact[key];
                for (i in address){
                    console.log(address[i]);
                }
            } else {
                console.log(contact[key]);
            }
        }
	};
	return {
		init:init
	};
}();

brandweer.init();