{
    "personalInformation":[

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
    "buildings":[
        {
            "id":"bagId",
            "geometry":{
                "type":"point",
                "coordinates":[51.690599, 5.3064146],
                "zoom":"18"
            }
        }
    ],
    "contactInformation":[
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
    "information":[
    {"contact":{
        "header":"header",
        "body":"<p>Ennui Brooklyn esse single-origin coffee. Ea dreamcatcher butcher stumptown. Bespoke occaecat stumptown blog single-origin coffee, forage do Pitchfork you probably haven't heard of them cred. Pork belly occupy aliqua tote bag, ethical master cleanse DIY velit locavore. Odio reprehenderit elit excepteur, Williamsburg pop-up velit beard Marfa ethnic Tumblr wayfarers. Shabby chic squid cornhole, assumenda hoodie reprehenderit anim +1 roof party disrupt Pitchfork seitan do. Minim pickled Terry Richardson Truffaut kale chips.</p><p>Vero butcher kogi wolf, Austin cray Helvetica pickled PBR Etsy Portland leggings banjo. Commodo Echo Park Marfa mumblecore, lomo retro jean shorts Shoreditch hoodie Pitchfork. 3 wolf moon enim chambray direct trade. Nulla raw denim fugiat, tousled mixtape aliqua try-hard cliche sartorial craft beer. Disrupt pariatur quinoa, deep v roof party incididunt aliquip hoodie bicycle rights vero. Forage farm-to-table Blue Bottle, actually narwhal PBR paleo you probably haven't heard of them YOLO master cleanse tofu occaecat. Duis pickled accusamus, irony mollit cred actually.</p>"
    }
    }
]

}