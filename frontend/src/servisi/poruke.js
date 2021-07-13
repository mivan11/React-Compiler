import axios from 'axios'
const osnovniUrl = 'http://localhost:3001/api/kodovi'

const dohvati = () => {
    return axios.get(osnovniUrl);
}

const stvori = noviObjekt => {
    return axios.post(osnovniUrl, noviObjekt)
}
const izbrisi = () => {
    return axios.delete(osnovniUrl);
}

export default {
    dohvati: dohvati,
    stvori: stvori,
    izbrisi:izbrisi,
}
