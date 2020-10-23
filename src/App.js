import React ,  {Component } from "react"
import {Helmet} from 'react-helmet';
import "./App.css"
import "bootstrap/dist/css/bootstrap.css"
import NavBar from "./components/NavBar"
import Trending from "./components/Trending"
import Home from "./components/Home"
import { BrowserRouter, Route,Switch,HashRouter} from "react-router-dom"
class App extends Component{
  render(){
    return(
    <HashRouter>
      <div className = "App">
       <Helmet>
            <style>{'body { background-color: black; }'}</style>
        </Helmet>
        <NavBar />
          <br></br>
          <br></br>
        <div className="content">
            <Route path="/" component={Home}/>
            <Route path="/trending" component={Trending}/>
        </div>
      </div>
    </HashRouter>
    )
  }
}

export default App