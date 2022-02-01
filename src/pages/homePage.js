import { Link } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import UserTokenContext from "../store/userTokenContext";

function HomePage() {
  const { token, setToken } = useContext(UserTokenContext);
  const [user, setUser] = useState({});
  const [repourl, setRepo_url] = useState();
  const [repo, setRepo] = useState([]);
  const [counter,setCounter]=useState(0);

  const redirect = useNavigate();

  
  

  useEffect(() => {
    if(token==null){
      redirect("/login")
    }
    
    
    const href = window.location.href;
    if(href.includes("error")==true){
      redirect('/login')
    }
    const code = href.split("=")[1];
    const proxy = `https://gitui.herokuapp.com/token/${code}`;
    async function fetchtoken() {
      try {
        const response = await axios.get(proxy);
        if (response.data.id) {
          setToken(response.data);
          
        } else {
          
        }
      } catch (error) {
        console.log(error);
      }
    }
   
    
      

    fetchtoken();
    
    
    
    
  }, [setToken,redirect]);

  
  
  
  
  
  function RepoList(params) {
    if(repo!=null){
      return(
        repo.map((item) => {
          return(
            <div className="repositories_list">
            <div className="repository_name">
              {item.name}
            </div>
            <div className="created_date">
              created date :{item.created_at}
            </div>

          </div>
          )
        })
      )
    }
    else{
      return(
        <div></div>
      )
    }
    
  }
  
  
  return (
    <>
     
      <div className="HomePage_background_container">
        <div className="title_repositories">
          {token ? "Your Profile" : " Loading .... please wait // or go back to login page"}
        </div>
        <div className="repositories_list_background">
        <div className="repositories_list">
            <div className="repository_name">
               {token ? `Profile Name : ${token.login}`:""}
            </div>
            <div className="created_date">
              {token ? `created date : ${token.created_at}`:""}
            </div>
            

          </div>
        
        </div>
        {token ?<div className="repoLink repo_btn">
              <Link to={`/repolist/`} className="repository_btn">Repositories</Link>
        </div>:""}
        
      </div>
    </>
  );
}
export default HomePage;
