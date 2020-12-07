import React , {useContext,useState,useEffect} from 'react'
import UserContext from "../context/UserContext"
import axios from "axios"
import { Document, Page,pdfjs } from 'react-pdf'; 

const Profile = ()=>{
    const { userData, setUserData } = useContext(UserContext);
    const [posts, setPosts] = useState(
        [
            {
                likes: undefined,
                comments: undefined,
                id: undefined,
                userId: undefined,
                body: undefined
            }
        ]
    );
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 
  const [numPages, setNumPages] = useState(null); 
  const [pageNumber, setPageNumber] = useState(1);   
  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) { 
    setNumPages(numPages); 
    setPageNumber(1); 
  } 

  function changePage(offset) { 
    setPageNumber(prevPageNumber => prevPageNumber + offset); 
  } 

  function previousPage() { 
    changePage(-1); 
  } 

  function nextPage() { 
    changePage(1); 
  }
  const likes = async(id) =>{
    try {
            console.log(id)
            console.log(userData.user)
            let like = axios.post(
                "http://localhost:5000/api/posts/likes",
                {userid: userData.user ,postid :id},
            );
            window.location.reload()
        } catch(err){
          console.log(err);
        }
  }
    useEffect(() => {
        const getposts = async() =>{
        try {
            let token = localStorage.getItem("auth-token");

            let postRes = await axios.get(
                "http://localhost:5000/api/users/profile",
                {
                    headers: { "x-auth-token": token },
                }
            );
            setPosts(postRes.data)
            //console.log(postRes.data)
        } catch (err) {
            console.log(err)
        }
    };
    getposts()
    }, []);
    console.log(posts.length)
    return(
        <div style = {{maxWidth:"800px", margin:"0px auto"}}>
            <div style = {{
                display: 'flex',
                justifyContent: 'space-around',
                margin:"18px 0px",
                borderBottom:"1px solid grey",
            }}>
                <div>
                    <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                    src = "https://images.indianexpress.com/2020/06/messi-ronaldo-fb.jpg"
                    />
                </div>
                <div>
                    <h4 style = {{color: "white" }}>Cristiano Ronaldo</h4>
                    <div style={{display:"flex", justifyContent:"space-between",width:"108%"}}>
                        <h6 style = {{color: "white"}}>{posts.length} Posts</h6>
                    </div>
                </div>
            </div>
            <br /><br /><br />
            <div className="gallery">
                
            {posts.map((post, index) => (
               <>
                <div class="card" style = {{ "background-color": "grey" , 
                                                      margin: "auto", width: "50%" ,padding: "10px"}}>
                 <div className="pdfpost">
              <Document 
              file={post.filename}
              onLoadSuccess={onDocumentLoadSuccess} 
              > 
              <Page pageNumber={pageNumber} />
              </Document>
            </div>
            <div> 
          <div className="pagec"> 
              Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'} 
          </div> 
          <div className="buttonc"> 
          <button 
          type="button"
          disabled={pageNumber <= 1} 
          onClick={previousPage} 
          className="Pre"> 
            Previous 
          </button> 
        <button 
        className="Nxt"
        type="button"
        disabled={pageNumber >= numPages} 
        onClick={nextPage} > 
          Next 
        </button> 
    </div> 
  </div>       
                    <div class="card-body">
                        <p class = "card-text"> {post.title}</p>
                        <p class="card-text">{post.body}</p>
                    </div>
                    <p>
                        <button style = {{ "background-color": "blue"}} onClick={() => {likes(post._id);}}>Like </button> : {post.likes}
                    </p>
                </div>
                <br /><br /><br />
                </>
            ))} 
            </div> 
        </div>
    )
}

export default Profile