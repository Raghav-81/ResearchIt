import React , {useState,useEffect} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import  {Button} from "react-bootstrap";
import ErrorNotice from "./ErrorNotice"
import qs from "qs";

export default function Post(){
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
	const [Message, setMessage] = useState();
  const [file, setFile] = useState();
  const history = useHistory();
  const query = qs.parse(window.location.search , { ignoreQueryPrefix: true }).fileuploaded
  let token = localStorage.getItem("auth-token");
  const submit = async (e) => {
    e.preventDefault();

    try {
      let token = localStorage.getItem("auth-token");
      const newpost = { title, body , query};
      await axios.post("http://localhost:5000/api/posts/newpost", newpost,
        {
          headers: { "x-auth-token": token },
        }
      );
      history.push("/?filename="+query);
    } catch (err) {
      console.log(err);
      err.response.data.msg && setMessage(err.response.data.msg);
    }
  };

  useEffect(() => {
    function uploadsubmit(){
    if(query ==0){
      setMessage("No file uploaded");
    }
    }
  uploadsubmit();
  }, []);
  return(
		<div className = "contact">
	<div className="contact3 py-5">
  <div className="row no-gutters">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="card-shadow">
            <img style = {{ width: "100%" , height: "50%"}} src="data:image/png;base64,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" className="img-fluid" />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="contact-box ml-3">
            <h1 className="font-weight-light mt-2" style={{ color: "white"}}>New Post</h1>
            {Message && (
        <ErrorNotice message={Message} clearError={() => setMessage(undefined)} />
    )}
            <form className="mt-4">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group mt-2">
                    <input className="form-control" type="text" placeholder="Title" 
                          onChange = {(e) => setTitle(e.target.value)}/>
                  </div>
                </div>
                
                <div className="col-lg-12">
                  <div className="form-group mt-2">
                    <textarea className="form-control" rows="7" placeholder="Content" 
                              onChange = {(e) => setBody(e.target.value)}></textarea>
                  </div>
                </div>
                <div style = {{ color:  "white" }}> 
                <form 
                  id='uploadForm'
                  action={'http://localhost:5000/upload?token=' + token} 
                  method='post' 
                  encType="multipart/form-data">
                  <input type="file" name="sampleFile" accept = "application/pdf"/>
                  <button type="submit'"value="Upload!">
                    Upload
                  </button>
                 </form>   
                <br/><br/>
                </div>
                <div className="col-lg-12">
                  <Button variant = "primary" onClick = {submit}><span> SUBMIT</span></Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  </div>
)}