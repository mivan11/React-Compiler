import React from 'react'
import {Table, Form, Button} from 'react-bootstrap'

const TablicaRjesenja = (props) => (
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
          {props.Rjesenja.map(Rjesenje => {
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

 
export default TablicaRjesenja