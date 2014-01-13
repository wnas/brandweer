{
    "data": {
        "contact": [
            {
                "name":"firstname",
                "type":"text",
                "value": "emiel",
                "required":"f-required"

            },
            {
                "name":"surname",
                "type":"text",
                "value": "Hoeve",
                "required":"f-required"
            },
            {
                "name":"bedrijfsnaam",
                "type":"text",
                "value": "Geweldig bedrijf",
                "required":"f-required"
            },
            {
                "name":"street",
                "type":"text",
                "value":"straatnaam",
                "required":""
            },
            {
                "name":"number",
                "type":"number",
                "value":"2",
                "required":"f-required"
            },
            {
                "name":"huisnummer toevoeging",
                "type":"text",
                "value":"",
                "required":""

            },
            {
                "name":"postcode",
                "type":"text",
                "value":"1245 ab",
                "required":"f-required"
            },
            {
                "name":"email",
                "type":"email",
                "value":"e@ma.il",
                "required":""

            },
            {
                "name":"telephone",
                "type":"tel",
                "value":"06-12345678",
                "required":""
            }
        ],
        "contactPersonen":[
            [
               {
                    "name":"firstname",
                    "type":"text",
                    "value": "emiel",
                    "required":"f-required"

                },
                {
                    "name":"surname",
                    "type":"text",
                    "value": "Hoeve",
                    "required":"f-required"
                },
                {
                    "name":"telephone",
                    "type":"tel",
                    "value":"",
                    "required":"f-required"

                },
                {
                        "name":"email",
                        "type":"email",
                        "value":"e@ma.il",
                        "required":""

                }
            ],
            [
                {
                    "name":"firstname",
                    "type":"text",
                    "value": "emiel",
                    "required":"f-required"

                },
                {
                    "name":"surname",
                    "type":"text",
                    "value": "Hoeve",
                    "required":"f-required"
                },
                {
                    "name":"telephone",
                    "type":"tel",
                    "value":"",
                    "required":"f-required"

                },
                {
                    "name":"email",
                    "type":"email",
                    "value":"e@ma.il",
                    "required":""

                }
            ]
        ],
        "foo":[
            {"text":"hallo"},
            {"text":"daar"}
        ],
        "buildings":[
             {
                "entrance":[
                    {
                        "type":"main",
                        "geometry":{
                            "type": "Point",
                            "coordinates": [
                                51.690599, 5.3064146
                            ]
                        }
                    },

                    {
                        "type":"sub",
                        "geometry":{
                            "type": "Point",
                            "coordinates": [
                                51.690599, 5.3064146
                            ]
                        }
                    }

                ],
                "functions":[
                    {
                        "name":"a",
                        "function":"functionA",
                        "subfunction":
                            [
                                {
                                    "name":"foo",
                                    "value":"bar"
                                },
                                {
                                    "name":"foo2",
                                    "value":"bar2"
                                }
                            ]
                    },
                    {
                        "name":"b",
                        "function":"functionB",
                        "subfunction": [
                            {
                                "name":"foo3",
                                "value":"bar3"
                            },
                            {
                                "name":"foo4",
                                "value":"bar4"
                            }
                        ]

                    },
                    {
                        "name":"c",
                        "function":"functionC",
                        "subfunction":[
                            {
                                "name":"foo5",
                                "value":"bar5"
                            },
                            {
                                "name":"foo6",
                                "value":"bar6"
                            }
                        ]

                    }
                ],
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
                         },
                         {
                             "kind":"bar",
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
                     },
                     {
                         "kind":"piepeltjes",
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
                "functions":[
                    {
                        "name":"andere ingang of gebouw...",
                        "function":"functionA",
                        "subfunction":
                            [
                                {
                                    "name":"foo",
                                    "value":"bar"
                                },
                                {
                                    "name":"foo2",
                                    "value":"bar2"
                                }
                            ]
                    },
                    {
                        "name":"b",
                        "function":"functionB",
                        "subfunction": [
                            {
                                "name":"foo3",
                                "value":"bar3"
                            },
                            {
                                "name":"foo4",
                                "value":"bar4"
                            }
                        ]

                    },
                    {
                        "name":"c",
                        "function":"functionC",
                        "subfunction":[
                            {
                                "name":"foo5",
                                "value":"bar5"
                            },
                            {
                                "name":"foo6",
                                "value":"bar6"
                            }
                        ]

                    }
                ],
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

