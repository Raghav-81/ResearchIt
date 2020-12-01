import React, { Component , useContext, useState} from 'react';
import UserContext from "./context/UserContext";
import {Button , Card} from "react-bootstrap";
import ErrorNotice from "./context/ErrorNotice"
import axios from "axios";
export function Home(){
  const { userData, setUserData } = useContext(UserContext);
  return (
    <div className = "LoggedIN">
     {userData.user?(
      <p>
      	Logged in
      </p>
     )
     :
     (
     	<>
     <Card>
    <Card.Img variant="top" src="https://www.azquotes.com/picture-quotes/quote-scientific-research-is-one-of-the-most-exciting-and-rewarding-of-occupations-frederick-sanger-100-92-43.jpg" style={ { height: 300} }/>
  </Card>
  <Card body style = {{"background-color": "white","color": "black"}}>We at ResearchIt believe in spreading research all over the world. Publishing , Criticizing , Improving is what makes the field of research so graceful</Card>
  <br /> <br />
  <h3 id = "headings"> Why Us??!</h3>
   <br /> <br /> <br />
   <div className="row row-cols-2 row-cols-md-2">
    <div className="col mb-4">
      <div className="card">
        <img src="data:image/jpeg;base64,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"
             className="card-img-top"
             alt="..."/>
        <div className="card-body">
          <h5 className="card-title">Collaboration</h5>
          <p className="card-text">
            We let our users connect to other users thereby faciliatating collaboration with each other.
            <br /> Our users thereby connect to people from all over the world.
          </p>
        </div>
      </div>
    </div>
    <div className="col mb-4">
      <div className="card">
        <img src="https://www.cognibrain.com/wp-content/uploads/2018/02/How-to-Publish-your-Paper.jpg" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">Publish your Paper</h5>
          <p className="card-text">
            Ever wanted to be noticed while publishing your paper? 
            <br />
            We allow a social forum to publish your research and look at your fellow researcher's work as well.

          </p>
        </div>
      </div>
    </div>
  </div>
   </>
     )}
    </div>
    )
}

export function About(){
	return(
		<div className ="about">

		<h3 id = "headings">
      Founders
    </h3>

    <br /><br />
		
		<div className="row row-cols-1 row-cols-md-3">
    <div className="col mb-4">
      <div className="card">
        <a className="card-block stretched-link text-decoration-none" href = "https://github.com/lucasace">
          <img src="https://avatars1.githubusercontent.com/u/54945757?s=460&u=a72541735ef995752d89c2d3df8ba1f745b4017d&v=4"
            className="card-img-top"
            alt="..."/> 
            <div className="card-body"> 
              <h5 className="card-title">Royston E Tauro</h5> 
              <p className="card-text"> 
                Passionate student pursuing his B.Tech in PES University, Intrested in AI , Platform Development.
              </p> 
            </div>
        </a>
      </div>
    </div>
    <div className="col mb-4">
      <div className="card">
        <a className="card-block stretched-link text-decoration-none" href = "https://github.com/Raghav-81">
          <img src="https://avatars0.githubusercontent.com/u/71586087?s=460&u=f4a3000ba500517d0eb0527692585c1aa9e4d07b&v=4"
             className="card-img-top"
             alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Raghav V Pandit</h5>
            <p className="card-text">
              Physics is the science of matter and its motion—the science that deals with concepts such as force, energy, mass, and charge. As an experimental science, its goal is to understand the natural world.
            </p>
          </div>
        </a>  
      </div>
    </div>
    <div className="col mb-4">
      <div className="card">
        <a className="card-block stretched-link text-decoration-none" href = "https://github.com/RISHAB-182001">
          <img src="https://avatars1.githubusercontent.com/u/57083330?s=460&v=4"
             className="card-img-top"
             alt="..."/>
        <div className="card-body">
          <h5 className="card-title">Rishab Kashyap</h5>
          <p className="card-text">
            Mathematics, the science of structure, order, and relation that has evolved from elemental practices of counting, measuring, and describing the shapes of objects.
          </p>
        </div>
      </a>
      </div>
    </div>
    
  </div>

  <br /><br />

</div>
		)
}


export function Contact(){
  const [name, setName] = useState();
  const [email, setemail] = useState();
  const [phone, setPhone] = useState();
  const [complain, setComplain] = useState();
	const [Message, setMessage] = useState()
  const submit = async (e) => {
    e.preventDefault();

    try {
      const newcomplain = { name, email, phone, complain };
      await axios.post("http://localhost:5000/api/users/contact", newcomplain);
      setMessage("Thank you for the enquiry/complain! We shall get back to you shortly");
    } catch (err) {
      console.log(err);
      err.response.data.msg && setMessage(err.response.data.msg);
    }
  };
  return(
		<div className = "contact">
	<div className="contact3 py-5">
  <div className="row no-gutters">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="card-shadow">
            <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/2.jpg" className="img-fluid" />>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="contact-box ml-3">
            <h1 className="font-weight-light mt-2" style={{ color: "white"}}>Quick Contact</h1>
            {Message && (
        <ErrorNotice message={Message} clearError={() => setMessage(undefined)} />
    )}
            <form className="mt-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group mt-2">
                    <input className="form-control" type="text" placeholder="name" 
                          onChange = {(e) => setName(e.target.value)}/>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mt-2">
                    <input className="form-control" type="email" placeholder="email address" 
                            onChange = {(e) => setemail(e.target.value)}/>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mt-2">
                    <input className="form-control" type="text" placeholder="phone" 
                            onChange = {(e) => setPhone(e.target.value)}/>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mt-2">
                    <textarea className="form-control" rows="3" placeholder="message" 
                              onChange = {(e) => setComplain(e.target.value)}></textarea>
                  </div>
                </div>
                <div className="col-lg-12">
                  <Button variant = "primary" onClick = {submit}><span> SUBMIT</span></Button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card mt-4 border-0 mb-4">
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="card-body d-flex align-items-center c-detail pl-0">
                  <div className="mr-3 align-self-center">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon1.png" />
                  </div>
                  <div className="">
                    <h6 className="font-weight-medium">Address</h6>
                    <p className="">601 Sherwood Ave.
                      <br /> San Bernandino</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="card-body d-flex align-items-center c-detail">
                  <div className="mr-3 align-self-center">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon2.png" />
                  </div>
                  <div className="">
                    <h6 className="font-weight-medium">Phone</h6>
                    <p className="">251 546 9442
                      <br /> 630 446 8851</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="card-body d-flex align-items-center c-detail">
                  <div className="mr-3 align-self-center">
                    <img src="https://www.wrappixel.com/demos/ui-kit/wrapkit/assets/images/contact/icon3.png" />
                  </div>
                  <div className="">
                    <h6 className="font-weight-medium">Email</h6>
                    <p className="">
                      info@wrappixel.com
                      <br /> 123@wrappixel.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  </div>
)}