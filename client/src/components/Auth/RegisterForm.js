import React, { useContext, useState } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {Link} from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import AlertMessage from "../Layout/AlertMessage"
function RegisterForm(){
  // Context
  const { registerUser } = useContext(AuthContext) 
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  

  // Local State
  const {username, password, confirmPassword} = registerForm
  const onChangeRegisterForm = event => setRegisterForm({...registerForm, [event.target.name]: event.target.value})

  const register = async event => { 
    event.preventDefault()
    if (password !== confirmPassword) {
      setAlert({type: 'danger', message: 'Password do not match'})
      setTimeout(() => setAlert(null), 5000)
      return
    }
    try {
      const registerData = await registerUser(registerForm)
      console.log(registerData)
      if (!registerData.success) {
        setAlert({type: 'danger', message: registerData.message})
        setTimeout(() => setAlert(null), 5000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [alert, setAlert] = useState(null)

  return (
    <>
    <Form className="my-4" onSubmit={register}>
      <AlertMessage info={alert}/>
      <Form.Group>
        <Form.Control 
          type="text" 
          placeholder="Username" 
          name="username" 
          required 
          value={username} 
          onChange={onChangeRegisterForm} 
        />
      </Form.Group>

      <Form.Group>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          name="password" 
          required
          value={password}
          onChange={onChangeRegisterForm}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control 
          type="password" 
          placeholder="Confirm Password" 
          name="confirmPassword" 
          required 
          value={confirmPassword}
          onChange={onChangeRegisterForm}
        />
      </Form.Group>
      
      <Button type="submit" variant="success">Register</Button>
    </Form>
    <p>
      Already have an account?
      <Link to="/login">
        <Button variant="info" size="sm" type="button" className="ml-2">Login</Button>
      </Link>
    </p>
  </>


  )
}

export default RegisterForm
