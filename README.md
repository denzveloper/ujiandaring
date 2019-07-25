# Ujian Daring (UjiDaring Client)

Ujian Daring Polindra(Client) developed with ❤ by **DzEN/DzEN**(*known as **DENZVELOPER***) and this application supported by **Politeknik Negeri Indramayu**. build with Ionic 4 with Angular. This Apps for my "*Tugas Akhir*" D3-*Teknik Informatika*.

Ujian Daring is a App can help teacher to get result the exam(this repository contain frontend only).

see references:
1. **Exam Server System** (No Avaiable Yet/Private Repos)
2. **Exam Correction System** (No Avaiable Yet/Private Repos)

## API
1. Get Info User (Ex. Json):
    > POST to Server is: "nim, password"
    ~~~~
{
    "data": {
        "detail": {
            "nama": "Acerola-Orion Heart-Under-Blade",
            "idsoal": 666,
            "idmapel": 999,
            "nim": 598,
            "kelas": "D3TI",
            "mapel": "Projek",
            "dosen": "Bambang",
            "waktu": 60,
            "tanggal": "10 Oktober 2010",
            "photo": "https://www.gravatar.com/avatar/4013c583d3f3e4381cc0d384c8c70a51?s=150"
        },
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
    },
    "meta": {
        "status_code": 200,
        "message": "Test"
    }
}
    ~~~~

2. Get Result Exam:
    > No Avaiable Yet
