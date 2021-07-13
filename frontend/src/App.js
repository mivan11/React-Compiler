import React, {useState, useEffect} from 'react'
import {Table, Form, Button, InputGroup} from 'react-bootstrap'
import axios from 'axios'
import porukeServer from './servisi/poruke'
import zadaciServer from './servisi/zadaci'
import prijavaMetode from './servisi/login'
import LoginForma from './komponente/LoginForma'
import ZadatakForma from './komponente/ZadatakForma'
import Promjenjiv from './komponente/Promjenjiv'
import TablicaRjesenja from './komponente/TablicaRjesenja'

//var rez=""

const App=()=>{
  var izlaz=""
  const [data, postaviUnos] = useState ([])
  const [Kod, postaviKod] = useState('')
  const [Inputi, postaviInpute] = useState('')
  const [Rezultati, postaviRezultate] = useState('')
  const [InputRadio, postaviInputRadio] = useState('')
  const [Lang, postaviLang] = useState('')
  const [Zadaci, postaviZadatke]=useState('')
  const [Zadatak, postaviZadatak]=useState('')
  const [Ime, postaviIme] = useState('')
  const [username, postaviUsername] = useState('')
  const [pass, postaviPass] = useState('')
  const [Korisnik, postaviKorisnika] = useState(null)
  const [Rjesenja, postaviRjesenja] = useState([])
  const [brojac, postaviBrojac]=useState(0)
  const [duljina, postaviDuljinu]=useState(0)


  const promjenaKoda = (e) => {
      postaviKod(e.target.value)
  }

  const promjenaInputa = (e) => {
      postaviInpute(e.target.value)
  }

  const promjenaInputRadio = (e) => {
    postaviInputRadio(e.target.value)
  }

  const promjenaLang = (e) => {
    postaviLang(e.target.value)
  }

  const promjenaRezultata = (e) => {
      postaviRezultate(e.target.value)
  }

  const promjenaZadataka = (e) => {
    postaviZadatke(e.target.value)
}

  const promjenaZadatka = (e) => {
    postaviZadatak(e.target.value)
  }

  const promjenaIme = (e) => {
    postaviIme(e.target.value)
  }

  const promjenaRjesenja = (e) => {
    postaviRjesenja(e.target.value)
  }

  useEffect( () => {
    const logiraniKorisnikJSON = window.localStorage.getItem('prijavljeniKorisnik')
    if (logiraniKorisnikJSON) {
      const korisnik = JSON.parse(logiraniKorisnikJSON)
      postaviKorisnika(korisnik)
      zadaciServer.postaviToken(korisnik.token)
    }
  }, [])

  const userLogin = async (e) => {
    e.preventDefault()
    
  

    try{
      const rez = await prijavaMetode.prijava({
        username, pass
      })
      console.log('Prijava', username, pass);
      window.localStorage.setItem('prijavljeniKorisnik', JSON.stringify(rez))
      zadaciServer.postaviToken(rez.token)
      postaviKorisnika(rez)
      postaviUsername('')
      postaviPass('')
    } catch (exception){
      alert('Neispravni podaci')
    }
  }

  const Odjava = async (e) => {
    e.preventDefault()
      localStorage.removeItem(Korisnik);
      window.localStorage.setItem('prijavljeniKorisnik', JSON.stringify(''))
      window.localStorage.clear();
      window.location.reload();
      postaviKorisnika('')
      postaviUsername('')
      postaviPass('')
  }

  const kompajlirajSve = (e) => {
    e.preventDefault()
    const noviKod = {
      id: -1,
      kod: Kod,
      inputi: Inputi,
      lang: Lang,
      inputRadio: InputRadio,
      rezultati:"",
    }

    porukeServer
    .stvori(noviKod)
    .then(res=>{
        postaviRezultate(res.data.toString())
    })
  }

  const dodajNovi = (e) => {
    e.preventDefault()
    const noviKod = {
      id: data.length + 1,
      kod: Kod,
      inputi: Inputi,
      lang: Lang,
      inputRadio: InputRadio,
      rezultati: Rezultati,
      ime:Ime,
  }
    porukeServer
    .stvori(noviKod)
    .then(res=>{
      postaviKod('')
      postaviInpute('')
      postaviLang('')
      postaviInputRadio('')
      postaviRezultate('')
    })
  }

  const izbrisiRjesenja = (e) => {
    e.preventDefault()
    porukeServer
    .izbrisi()
    .then(res=>{
    })
  }

  const zadaci = () => {
    return Zadaci.map(Zadata => {
      return (
        <tr>
          <td>{Zadata.zadatak} </td>
       </tr>
      )
    })
  }

  const dohvatiZadatke = (e) => {
    e.preventDefault()
    zadaciServer
    .dohvati()
    //.then( res => postaviDuljinu(res.data[res.data.length]))
    .then( res => {
      //postaviZadatke(res.data[brojac-1].zadatak===undefined?"Nema više zadataka!":res.data[brojac-1].zadatak))
      const daLiJePrazno=res.data.length
      const dulj=res.data.length+1
      if(daLiJePrazno==0)
      {
        postaviZadatke("Nema zadataka. Pričekajte da se dodaju zadaci.")
      }
      else
      {
        postaviDuljinu(dulj)
        if(brojac!==duljina){
          postaviZadatke(res.data[brojac-1].zadatak)
          //postaviZadatke("brojac"+(brojac-1))
        }
        else
        {
          postaviBrojac(0)
          postaviZadatke("Došli ste do kraja testa, nema više zadataka!")
        }
      }
    })
  }

  const povecajBrojac=()=>postaviBrojac(brojac+1)
  const umanjiBrojac=()=>postaviBrojac(brojac-1)

  /*useEffect(() => {
    porukeServer
      .dohvati()
      //.then(res=>postaviRjesenja(res.data));
      .then((response) => postaviRjesenja(response.data.map(p=> p.id)))

  }, [])*/


  const tablicaSRjesenjima = () => {
    return (
      <TablicaRjesenja
        Rjesenja={Rjesenja}
      />  
    )
  }

/*   const renderTable = () => {
      return (
        <div>
          <Table striped>
            <tbody>         
              <tr>
                <td>Ime i prezime </td>
                <td>Kodovi</td>
                <td>Inputi </td>
                <td>Rezultati prevođenja</td>
              </tr>
            </tbody>
            {Rjesenja.map(Rjesenje => {
              return(  
                <tbody>          
                  <tr>
                    <td>{Rjesenje.ime} </td>
                    <td>{Rjesenje.kod} </td>
                    <td>{Rjesenje.inputi} </td>
                    <td>{Rjesenje.rezultati} </td>
                  </tr>
                </tbody>
              )
            })
            }
          </Table>
        </div>
      )
  }  */

 /*  const nultarenderTable = () => {
    return (
      <div>
        <Table striped>
          <tbody>         
            <tr>
              <td>Ime i prezime </td>
              <td>Kodovi</td>
              <td>Inputi </td>
              <td>Rezultati prevođenja</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )} */

/*   const renderTable = () => {
    return Rjesenja.map(Rjesenje => {
      return (
        <div>
          <Table striped>
            <tbody>           
              <tr>
                <td>{Rjesenje.ime} </td>
                <td>{Rjesenje.kod} </td>
                <td>{Rjesenje.inputi} </td>
                <td>{Rjesenje.rezultati} </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )
    })
  } */

  const dohvatiRjesenja = (e) => {
    e.preventDefault()
      porukeServer
        .dohvati()
        .then( res => {
          const daLiImaRjesenja=res.data.length
          if(daLiImaRjesenja==0)
          {
            //"Nema rješenja. Recite učenicima da spremaju svoja rješenja."
          }
          else
          {
            postaviRjesenja(res.data)
          }
          //postaviRjesenja({ Rjesenja : res.Ime })
          //postaviRjesenja(res.data.map(p =>  p={p}) 
          //)
          //postaviRjesenja(res.data.toString())
        })
  }

  const dodajZadatak = (e) => {
    e.preventDefault()
    const noviZadatak = {
        id: data.length + 1,
        zadatak: Zadatak,
      }
    zadaciServer
    .stvori(noviZadatak)
    .then(res=>{
      postaviZadatak('')
      postaviKod('')
      postaviInpute('')
      postaviLang('')
      postaviInputRadio('')
      postaviRezultate('')
    })
  }

  const izbrisiZadatke = (e) => {
    e.preventDefault()
    zadaciServer
    .izbrisi()
    .then(res=>{
    })
  }

  const loginForma = () => {
    return (
      <Promjenjiv natpis='Prijavi se'>
        <LoginForma
            username={username}
            pass={pass}
            promjenaImena={({ target }) => postaviUsername(target.value)}
            promjenaLozinke={({ target }) => postaviPass(target.value)}
            userLogin={userLogin}
          />
          <br></br>
      </Promjenjiv>
    )
  }

  const zadatakForma = () => {
    return (
      <Promjenjiv natpis="Zadaci i rješenja">
        <div>
          <Form className="zadaciAdd" id="dodajZad" name="dodajZad" onSubmit={dodajZadatak}>
            <textarea rows="2" cols="150" id="zad" name="zad" value={Zadatak} onChange={promjenaZadatka} placeholder="Dodaj zadatak"></textarea>
            <br></br>
            <Button type="submit">Dodaj zadatak</Button>&emsp; &emsp;
            <Button onClick={izbrisiZadatke} type="submit">Izbriši zadatke</Button>
          </Form> 
          <br></br>     
        {/*   <form onSubmit={izbrisiZadatke}>
            <Button type="submit">Izbriši zadatke</Button>
          </form> */}
          
          <br></br>
          <Form onSubmit={dohvatiRjesenja}>
           {/* {nultarenderTable()}  */}
           {tablicaSRjesenjima()}
            {/* {renderTable()}  */}
         {/*    {tablicaSRjesenjima} */}
            <Button type="submit">Dohvati rješenja</Button>&emsp; &emsp;
            <Button onClick={izbrisiRjesenja} type="submit">Izbriši rješenja</Button>
            {/* <textarea placeholder="Rješenja" rows="10" cols="100" id="zada" name="zada" value={Rjesenja} onChange={promjenaRjesenja}></textarea> */}
          </Form>
          <br></br>
          {/*        <form onSubmit={izbrisiRjesenja}>
            <button type="submit">Izbriši rješenja</button>
          </form> */}
          <br></br>
        </div>
      </Promjenjiv>
    )
  }


return(
    <div className="container">
      <div>
        {Korisnik === null ? loginForma() : 
          <div>
            <p>Prijavljeni ste kao: {Korisnik.ime} &emsp;
            <Button onClick={Odjava} type="submit">Odjava</Button></p>
            {zadatakForma()}
          </div>   
        }   
      </div>
      <br></br>
      <div>
     {/*    {nultarenderTable()}
        {renderTable()}  */}
      </div>
      <br></br>
      <div>
        <Form onSubmit={dohvatiZadatke}>
          <textarea placeholder="Dohvati zadatke za rješavanje" rows="2" cols="150" id="zada" name="zada" value={Zadaci} onChange={promjenaZadataka}></textarea>
          <Button type="submit" onClick={povecajBrojac}>Dohvati zadatke</Button>
        </Form>
      </div>
      <div>
        <Form onSubmit={kompajlirajSve}>
          <br></br>
          <textarea rows="1" cols="40" id="name" name="name" value={Ime} onChange={promjenaIme} placeholder="Unesi ime i prezime"></textarea>
          <br></br>
          <textarea rows="20" cols="150" id="code" name="code" value={Kod} onChange={promjenaKoda} placeholder="Dodaj kod"></textarea>
          <br></br>
          <textarea rows="5" cols="150" id="input" name="input" value={Inputi}  onChange={promjenaInputa} placeholder="Dodaj inpute"></textarea>
          <br></br>
          <br></br>
          Odaberi programski jezik:  <select name="lang" onChange={promjenaLang}>
            <option value="C">C</option>
            <option value="Python">Python</option>
          </select>
          &emsp;  &emsp;
          Kompajliraj s inputima:&emsp;
          <input type="radio" name="inputRadio" id="inputRadio" value="true" onChange={promjenaInputRadio}/> Da &emsp;
          <input type="radio" name="inputRadio" id="inputRadio" value="false" onChange={promjenaInputRadio}/> Ne
          <br></br>
          <br></br>
          <Button type="submit">Kompajliraj</Button>
          <br></br>
          <br></br>
          <textarea rows="10" cols="150" id="output" placeholder="Rezultati prevođenja" name="output" value={Rezultati} onChange={promjenaRezultata}></textarea>
          <br></br>
          <Button type="submit" onClick={dodajNovi}>Završi i spremi</Button>
          <br></br>
        </Form>
        <br></br>
      {/*   <Form onSubmit={dodajNovi}>
          <Button type="submit">Spremi</Button>
        </Form> */}
      </div>
    </div>
  )
}

export default App

