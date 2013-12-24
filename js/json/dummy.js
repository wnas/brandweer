{
    "data": {
        "contact": {
            "firstname":{
                "type":"text",
                "value": "gerben"
             },
            "lastname":{
                "type":"text",
                "value": "Hoeve"
            },
            "address":{
                "type":"group",
                "value":{
                    "street":{
                        "type":"text",
                        "value":"straatnaam"
                    },
                    "number":{
                        "type":"number",
                        "value":"2"
                    },
                    "addition":{
                        "type":"text",
                        "value":""
                    }
                }
            },
            "email":{
                "type":"email",
                "value":"e@ma.il"
            },
            "telephone":{
                "type":"tel",
                "value":"06-12345678"
            }
        },
//        "contact": {
//            "firstname":"Gerben",
//            "surname":"Hoeve",
//            "companyname":"GH designs",
//            "address": {
//                "street":"grote markt",
//                "number":"2",
//                "addition": "",
//                "postalcode":"1234aa",
//                "municipality":"Den Bosch"
//            },
//            "email":"gerben@mail.ma",
//            "telephone":"+316123456789"
//        },
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
                "function":"functions",
                "subfunction": "subfunction",
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

