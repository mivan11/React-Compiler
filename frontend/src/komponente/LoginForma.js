import React from 'react'
import {Table, Form, Button} from 'react-bootstrap'

const LoginForma = (props) => (
  <Form onSubmit={props.userLogin}>
    <div>Korisničko ime: 
        <input type='text' 
                value={props.username} 
                name='Username' 
                onChange={props.promjenaImena} />
    </div>

    <div>Lozinka:
        <input type='password' 
                value={props.pass} 
                name='Pass'
                onChange={props.promjenaLozinke} />
    </div>          
    <Button type='submit'>Prijava</Button>
    <br></br>     
  </Form>
);
 
export default LoginForma