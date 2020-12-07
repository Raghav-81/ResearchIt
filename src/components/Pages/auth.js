import React , {useState, useContext} from 'react'
import { Form, Button } from 'react-bootstrap'
import {useHistory} from "react-router-dom"
import UserContext from "../context/UserContext";
import axios from "axios";
import ErrorNotice from "../Helpers/ErrorNotice";

export function Login(){
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email: email, password: password };
      const loginRes = await axios.post(
        "http://localhost:5000/api/users/Login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.id,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      console.log(err.response.data.msg)
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
  <div className="Login">
    {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
    )}
    <br /> <br />
    <Form onSubmit = {submit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>
          UserName/Email address
        </Form.Label>
        <Form.Control placeholder="UserName/Email" 
          onChange={(e) => setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>
          Password
        </Form.Label>
        <Form.Control type="password" placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remember Me" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </div>
  )
}

export function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [userName, setUserName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, userName };
      await axios.post("http://localhost:5000/api/users/register", newUser);
      const loginRes = await axios.post("http://localhost:5000/api/users/Login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
    return (
      <div className="Register">
        {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
    )}
    <br /> <br />
        <Form onSubmit = {submit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>
              Email address
            </Form.Label>
            <Form.Control placeholder="Email"  
              onChange={(e) => setEmail(e.target.value)}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
      <Form.Group>
        <Form.Label>
          UserName
        </Form.Label>
        <Form.Control placeholder="UserName"
          onChange={(e) => setUserName(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>
          Password
        </Form.Label>
        <Form.Control type="password" placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formconfirmPassword">
        <Form.Label>
          Confirm Password
        </Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" 
          onChange={(e) => setPasswordCheck(e.target.value)}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  </div>
  ) 
}