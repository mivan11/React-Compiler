	
import React, {useState} from 'react'
import zadaciServer from '../servisi/zadaci'

const ZadatakForma = (props) => {
    const [unosPoruke, postaviUnos] = useState('Unesi zadatak...');
    const promjenaUnosa = (e) => {
        postaviUnos(e.target.value);
    }

    const novaPoruka = (e) => {
        e.preventDefault();
        // novi objekt spremit će preko props.spremiPoruku metode (slanje "gore")
        props.spremiPoruku({            
            sadrzaj: unosPoruke,
            datum: new Date().toISOString(),
        });
        postaviUnos('');
    }

    return (
        <div className="formaDiv">
            <form onSubmit={novaPoruka}>
                <input value={unosPoruke} 
                    onChange={promjenaUnosa} />
                <button type="submit">Spremi</button>   
            </form>
        </div>   
    );
}

export default ZadatakForma