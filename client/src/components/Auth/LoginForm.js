import React, { useState, useContext } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import {Link} from "react-router-dom"
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from "../Layout/AlertMessage"
function LoginForm(){
  // Context
  const { loginUser } = useContext(AuthContext) 
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })
  

  // Local State
  const {username, password} = loginForm
  const onChangeLoginForm = event => setLoginForm({...loginForm, [event.target.name]: event.target.value})

  const login = async event => { 
    event.preventDefault()
  
    try {
      const loginData = await loginUser(loginForm)
      console.log(loginData)
      if (loginData.success) {
        // history.push('/dashboard')
      } else {
        setAlert({type: 'danger', message: loginData.message})
        setTimeout(() => setAlert(null), 5000)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [alert, setAlert] = useState(null)

  return (
    <>
    <Form className="my-4" onSubmit={login}>
      <AlertMessage info={alert}/>
      <Form.Group>
        <Form.Control 
          type="text"
          placeholder="Username"
          name="username"
          required value={username}
          onChange={onChangeLoginForm}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control 
          type="password"
          placeholder="Password"
          name="password"
          required
          value={password}
          onChange={onChangeLoginForm}
        />
      </Form.Group>
      
      <Button type="submit" variant="success">Login</Button>
    </Form>
    <p>
      Don't you have account?
      <Link to="/register">
        <Button variant="info" size="sm" type="button" className="ml-2">Register</Button>
      </Link>
    </p>
  </>


  )
}

export default LoginForm
