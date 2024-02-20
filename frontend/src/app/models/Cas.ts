export class Cas{
    _id:string
    datum_od:Date
    datum_do:Date
    teme:string=""
    ucenik:string[]=[]
    nastavnik:string=""
    potvrdjen:boolean=false
    odrzan:boolean=false
    predmet:string=""
    komentar_nastavnika:string
    komentar_ucenika:string
    ocena:number
    ime_ucenika:string
    prezime_ucenika:string
    razlog_otkazivanja:string=""
    //ocene koje su drugi nastavnici dali tom uceniku
    ocene_ucenika:number[]=[]
    //novaOcena i noviKomentar su pomocna polja kod dosijea
    novaOcena:number=0
    noviKomentar:string=""
    //datum kada je nastavnik potvrdio cas(ili otkazao uz obrazlozenje)
    datum_potvrde:Date
    //datum kada je ucenik procitao da je cas potvrdjen
    datum_citanja:Date
    broj_ucesnika:number
}