# Ujian Daring (UjiDaring Client)

Ujian Daring Polindra(Client) developed with ❤ by **DzEN/DzEN**(*known as **DENZVELOPER***) and this application supported by **Politeknik Negeri Indramayu**. build with Ionic 4 with Angular. This Apps for my "*Tugas Akhir*" D3-*Teknik Informatika*.

Ujian Daring is a App can help teacher to get result the exam(this repository contain frontend only).

see references:
1. **Exam Server System** (No Avaiable Yet/Private Repos)
2. **Exam Correction System** (No Avaiable Yet/Private Repos)

## API
1. Get Info User (Ex. Json):
    > POST to Server is: 
    ~~~~
    {
        "nim":5346464,
        "password":"56464654"
    }
    ~~~~
    Result:
    type: 1 => Essay, type: 2 => multi answer one select, type: 3 => multi answer multi select
    ~~~~
    {
        "data": {
            "detail": {
                "nama": "Acerola-Orion Heart-Under-Blade",
                "nim": 598,
                "kelas": "D3TI",
                "photo": "https://www.gravatar.com/avatar/4013c583d3f3e4381cc0d384c8c70a51?s=150"
            },
            "data_soal": {
                "idsoal": 666,
                "idmapel": 999,
                "mapel": "Projek",
                "dosen": "Bambang",
                "waktu": 60,
                "tanggal": "10 Oktober 2010",
                "soal": [
                    {
                        "id": 0,
                        "quest": "Sistem operasi dengan Maskot Pinguin?",
                        "type": 1,
                        "jawaban": []
                    },
                    {
                        "id": 1,
                        "quest": "Alternatif Microsoft Office Word?",
                        "type": 1,
                        "jawaban": []
                    },
                    {
                        "id": 2,
                        "quest": "Letak Politeknik Negeri Indramayu?",
                        "type": 2,
                        "jawaban": [
                            {
                                "pilihan": "Lohbener",
                                "selected": false
                            },
                            {
                                "pilihan": "Lohsalah",
                                "selected": false
                            },
                            {
                                "pilihan": "LohGimanani?",
                                "selected": false
                            },
                            {
                                "pilihan": "Plumbon",
                                "selected": false
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "quest": "Jurusan Politeknik Negeri Indramayu?",
                        "type": 3,
                        "jawaban": [
                            {
                                "pilihan": "Teknik Informatika",
                                "selected": false
                            },
                            {
                                "pilihan": "Teknik Perkapalan",
                                "selected": false
                            },
                            {
                                "pilihan": "Teknik Spesialis Dingin",
                                "selected": false
                            },
                            {
                                "pilihan": "Teknik Mesin",
                                "selected": false
                            }
                        ]
                    }
                ]
            }
        },
        "meta": {
            "status": 200,
            "message": "OK"
        }
    }
    ~~~~

2. Get Result Exam (Ex. Json):
    > POST to Server is: 
    Selected: true => Answer selected by user, Selected: false => Answer isnt selected by user
    ~~~~
    {
        "user":{
            "nama":"Acerola-Orion Heart-Under-Blade",
            "nim":598,
            "kelas":"D3TI",
            "photo":"https://www.gravatar.com/avatar/4013c583d3f3e4381cc0d384c8c70a51?s=150"
        },
        "data":{
            "idsoal":666,
            "idmapel":999,
            "mapel":"Projek",
            "dosen":"Bambang",
            "waktu":60,
            "tanggal":"10 Oktober 2010",
            "soal":[
                {
                    "id":0,
                    "quest":"Sistem operasi dengan Maskot Pinguin?",
                    "type":1,
                    "jawaban":"5645645"
                },
                {
                    "id":1,
                    "quest":"Alternatif Microsoft Office Word?",
                    "type":1,
                    "jawaban":"45646456"
                },
                {
                    "id":2,
                    "quest":"Letak Politeknik Negeri Indramayu?",
                    "type":2,
                    "jawaban":[
                    {
                        "pilihan":"Lohbener",
                        "selected":false
                    },
                    {
                        "pilihan":"Lohsalah",
                        "selected":false
                    },
                    {
                        "pilihan":"LohGimanani?",
                        "selected":true
                    },
                    {
                        "pilihan":"Plumbon",
                        "selected":false
                    }
                    ]
                },
                {
                    "id":3,
                    "quest":"Jurusan Politeknik Negeri Indramayu?",
                    "type":3,
                    "jawaban":[
                    {
                        "pilihan":"Teknik Informatika",
                        "selected":false
                    },
                    {
                        "pilihan":"Teknik Perkapalan",
                        "selected":false
                    },
                    {
                        "pilihan":"Teknik Spesialis Dingin",
                        "selected":true
                    },
                    {
                        "pilihan":"Teknik Mesin",
                        "selected":false
                    }
                    ]
                }
            ]
        }
    }
    ~~~~
    Result:
    ~~~~
    {
        "data": {
            "nama": "Acerola-Orion Heart-Under-Blade",
            "idsoal": 666,
            "idmapel": 999,
            "nim": 598,
            "nilai": 99
        },
        "meta": {
            "status": 200,
            "message": "OK"
        }
    }
    ~~~~

3. Get Result Password (Ex. Json):
    > POST to Server is: 
    pasb: *password Before*, pasn: *password New*, pasc: *new password Confirmation*
    ~~~~
    {
        "nim":1603008,
        "password":{
            "pasb":"password",
            "pasn":"mautauaja",
            "pasc":"mautauaja"
        }
    }
    ~~~~
    Result:
    ~~~~
    {
        "meta": {
            "status": 200,
            "message": "OK"
        }
    }
    ~~~~

__*Example all api on (Bahasa Indonesia):*__
*https://gist.github.com/denzveloper/10fb00e6aa655ce74254cec8528de1ee*


**This App cant run after 2038 Problem because some fetures require *timestamp***
