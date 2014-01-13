{
    "personalInformation":[
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
        ]
    ],
    "buildings":[
        {
            "id":"bagId",
            "geometry":{
                "type":"polygon",
                "coordinates":[
                    [51.509, -0.08],
                    [51.503, -0.06],
                    [51.51, -0.047]
                ]
            }
        }
    ],
    "contactInformation":[
        {
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
        }
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
            "building":"barId",
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
            },
            "info":"http://www.extrainfopagina.nl"
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
            },
            "info":"http://www.extrainfopagina.nl"
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
            },
            "info":"http://www.extrainfopagina.nl"
        }
    ],
    "hoofdafsluiterwater":[
        {
            "building":"bagId",
            "header":"Hoofdafsluiter water",
            "geometry":{
                "type": "Point",
                "coordinates": [
                    51.690599, 5.3064146
                ]
            },
            "info":"http://www.extrainfopagina.nl"
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

        },
        "info":"http://www.extrainfopagina.nl"
    ]
}