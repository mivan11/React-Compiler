import axios from 'axios'
const osnovnUrl = 'http://localhost:3001/api/zadaci'
let token = null
const postaviToken = noviToken => {
    token = `bearer ${noviToken}`
}
const dohvati = () => {
    return axios.get(osnovnUrl);
}

const izbrisi = () => {
    return axios.delete(osnovnUrl);
}

const osvjezi = (id, noviObjekt) => {
    return axios.put(`${osnovnUrl}/${id}`, noviObjekt);
}
 
/*const stvori = noviObjekt => {
    return axios.post(osnovnUrl, noviObjekt)
}*/

const stvori = noviObjekt => {
    const config = {
        headers: {Authorization: token}
    }
    const odgovor = axios.post(osnovnUrl, noviObjekt, config)
    return odgovor;
  }

export default { dohvati, stvori, osvjezi, izbrisi, postaviToken}
