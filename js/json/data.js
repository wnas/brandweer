{
    "personalInformation":[

            {
                "name":"firstname",
                "type":"text",
                "value": "emiel",
                "placeholder":"Voornaam",
                "required":"f-required"

            },
            {
                "name":"surname",
                "type":"text",
                "value": "Hoeve",
                "placeholder":"Achternaam",
                "required":"f-required"
            },
            {
                "name":"bedrijfsnaam",
                "type":"text",
                "value": "Geweldig bedrijf",
                "placeholder":"Bedrijfsnaam",
                "required":"f-required"
            },
            {
                "name":"street",
                "type":"text",
                "value":"straatnaam",
                "placeholder":"Straatnaam",
                "required":""
            },
            {
                "name":"number",
                "type":"number",
                "value":"2",
                "placeholder":"Huisnummer",
                "required":"f-required"
            },
            {
                "name":"huisnummer toevoeging",
                "type":"text",
                "value":"",
                "placeholder":"Toevoeging",
                "required":""

            },
            {
                "name":"postcode",
                "type":"text",
                "value":"1245 ab",
                "placeholder":"Postcode ( 1234 ab )",
                "required":"f-required"
            },
            {
                "name":"email",
                "type":"email",
                "value":"e@ma.il",
                "placeholder":"uw email adres",
                "required":""

            },
            {
                "name":"telephone",
                "type":"tel",
                "value":"06-12345678",
                "placeholder":"06 12345678",
                "required":""
            }

    ],
    "buildings":[
        {
            "id":"bagId",
            "geometry":{
                "type":"point",
                "coordinates":[51.690599, 5.3064146]
            }
        }
    ],
    "contactInformation":[
       [
            {
                "name":"firstname",
                "type":"text",
                "value": "",
                "placeholder":"Voornaam",
                "required":"f-required"
            },
            {
                "name":"surname",
                "type":"text",
                "value": "",
                "placeholder":"Achternaam",
                "required":"f-required"
            },
            {
                "name":"email",
                "type":"email",
                "value":"",
                "placeholder":"jan@provider.nl",
                "required":""
            },
            {
                "name":"telephone",
                "type":"tel",
                "value":"",
                "placeholder":"06 12345678",
                "required":""
            }
        ]
    ],
    "functions":[
        {
            "building":"bagId",
            "functions":[
                {
                    "name":"wonen",
                    "value":"w",
                    "subFunction":[
                        {
                            "name":"permanente bewoning",
                            "value":"pb"
                        },
                        {
                            "name":"vakantie woning",
                            "value":"vw"
                        }
                    ]
                },
                {
                    "name":"horeca",
                    "value":"h",
                    "subFunction":[
                        {
                            "name":"kroeg",
                            "value":"k"
                        },
                        {
                            "name":"restaurant",
                            "value":"r"
                        }
                    ]
                }
            ]
        }
    ],
    "entrances":[
        {
            "building":"bagId",
            "header":"mainEntrance",
            "geometry":{
                "type": "Point",
                "coordinates": [
                    51.690599, 5.3064146
                ]
            },
            "amount":"5"
        }
    ],
    "sleutelbuis":[
        {
            "building":"bagId",
            "header":"sleutelbuis",
            "geometry":{
                "type": "Point",
                "coordinates": [
                    51.690599, 5.3064146
                ]
            }
        }
    ],
    "gasafsluiter":[
        {
            "building":"bagId",
            "header":"gasafsluiter",
            "geometry":{
                "type": "Point",
                "coordinates": [
                    51.690599, 5.3064146
                ]
            }
        }
    ],
    "hoofdschakelaarElektriciteit":[
        {
            "building":"bagId",
            "header":"Hoofdschakelaar electriciteit",
            "geometry":{
                "type": "Point",
                "coordinates": [
                    51.690599, 5.3064146
                ]
            }
        }
    ],
    "hoofdafsluiterwater":[
        {
            "building":"bagId",
            "header":"Hoofdafsluiter water",
            "body":"bla die bla",
            "geometry":{
                "type": "Point",
                "coordinates": [
                    51.690599, 5.3064146
                ]
            }
        }
    ],
    "gasflessen":[
        {
           "building":"bagId",
            "header":"gasflessen",
            "geometry":{
                "type": "Point",
                "coordinates": [
                    51.690599, 5.3064146
                ]
            },
            "amount":"4"

        },
        {
            "building":"bagId",
            "header":"gasflessen",
            "geometry":{
                "type": "Point",
                "coordinates": [
                    51.690569, 5.3064146
                ]
            },
            "amount":"2"

        }
    ],
    "information":{
        "contact": {
            "header":"header",
            "body":"bodytest"
        },
        "contactInformation": {
            "header":"header",
            "body":"bodytest"
        }
    }

}