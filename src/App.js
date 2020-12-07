import React ,  {useState, useEffect} from "react"
import {Helmet} from 'react-helmet';
import Axios from  "axios";
import "./App.css"
import "bootstrap/dist/css/bootstrap.css"
import UserContext from "./components/context/UserContext"
import NavBar from "./components/Pages/NavBar"
import Trending from "./components/Pages/Trending"
import {Home, Contact, About} from "./components/Pages/Home"
import {Login, Register} from "./components/Pages/auth"
import Profile from "./components/Pages/Profile"
import {Route,Switch,BrowserRouter} from "react-router-dom"
import Post from "./components/Helpers/NewPost"
function App(){
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/api/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/api/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data.id,
        });
      }
    };
    checkLoggedIn();
  }, []);
  return(
    <BrowserRouter>
      <div className = "App">
       <UserContext.Provider value = {{userData , setUserData}}>
       <Helmet>
            <style>{'body { background-color: black; }'}</style>
        </Helmet>
        <NavBar/>
          <br></br>
          <br></br>
        <div className="content">
        <Switch>
          <Route exact path = "/Login" component = {Login}/>
              <Route exact path = "/register" component = {Register}/>
              
              <Route exact path="/trending" component={Trending}/>
              <Route exact path = "/profile" component = {Profile}/>
            <Route exact path="/" component={Home}/>
            <Route path = "/about" component = {About}/>
            <Route path = "/contact" component = {Contact}/>
            <Route path = "/newpost" component= {Post} />
        </Switch>
        </div>
      </UserContext.Provider>
      </div>
    </BrowserRouter>
    )
}

export default App