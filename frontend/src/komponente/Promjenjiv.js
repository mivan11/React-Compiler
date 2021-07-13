import React, {useState} from 'react'
import {Table, Form, Button} from 'react-bootstrap'

const Promjenjiv = (props) => {
    const [vidljivo, postaviVidljivo] = useState(false)
 
    const sakrij = { display: vidljivo ? 'none' : '' }
    const prikazi = { display: vidljivo ? '' : 'none' }
 
    const promjenaVidljivosti = () => {
        postaviVidljivo(!vidljivo)
    }

    return (
        <div>
          <div style={sakrij}>
            <Button onClick={promjenaVidljivosti}>{props.natpis}</Button>
          </div>
          <div style={prikazi}>
            {props.children}
            <Button onClick={promjenaVidljivosti}>Sakrij</Button>
          </div>
        </div>
      )
}
export default Promjenjiv