# ujiandaring

Ujian Daring Polindra(Client)

Ujian Daring is a App can help teacher to get result the exam(this repository contain frontend only).

see references:
1. **Exam Server System** (No Avaiable Yet/Private Repos)
2. **Exam Correction System** (No Avaiable Yet/Private Repos)

## API
1. Get Info User (Ex. Json):
> POST to Server is: "nim, password"
~~~~
{
    "data":{
        "detail":{
            "nama":"Acerola-Orion Heart-Under-Blade","nim":23602,"kelas":"D3TI","mapel":"Projek","dosen":"Bambang","waktu":60,"tanggal":"10 Oktober 2010"},
        "soal":[{
            "quest":"Sistem operasi dengan Maskot Pinguin?","kind":1},
            {"quest":"Alternatif Microsoft Office Word?","kind":1},
            {"quest":"Letak Politeknik Negeri Indramayu?","kind":2,"answer":["Lohbener","Lohsalah","LohGimanani?","Plumbon"]},
            {"quest":"Jurusan Politeknik Negeri Indramayu?","kind":3,"answer":["Teknik Informatika","Teknik Perkapalan","Teknik Spesialis Dingin","Teknik Mesin"]}]},

    "meta":{"status_code":200,"message":"Test"}
}
~~~~

2. Get Result Exam:
> No Avaiable Yet
