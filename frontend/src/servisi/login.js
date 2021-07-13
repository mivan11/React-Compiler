import axios from 'axios';
const osnovniUrle = 'http://localhost:3001/api/login'
//const osnovniUrle = '/api/login' 

const prijava = async podaci => {
  const odgovor = await axios.post(osnovniUrle, podaci);
  return odgovor.data;
}
 
export default {prijava}