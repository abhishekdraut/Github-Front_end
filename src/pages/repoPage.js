import { Link } from "react-router-dom";
import Navbar from "../components/navbar/navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import UserTokenContext from "../store/userTokenContext";
import { useParams } from "react-router-dom";


function RepoList() {
    const{token}=useContext(UserTokenContext);
    const [repo,setRepo]=useState([]);
    const navigate=useNavigate()
    
    useEffect(()=>{
        if(token==null){
            navigate("/login")
        }
        if(token){
            async function fetchRepo(){
                try {
                    const response=await axios.get(token.repos_url);
                    
                    
                    setRepo(response.data);

                } catch (error) {
                    console.log(error)
                }
            }
            fetchRepo();
            
        }
        else{
            console.log("token object absent")
        }    
    
    },[setRepo,navigate])
    function RepoList(params) {
        if(repo.length!=0){
            return(
                repo.map((item)=>{
                    return (
                      <div className="repositories_list" key={item.id}>
                        <div className="repository_name">
                           <Link to={`/details/${item.id}`} >{item.name}</Link>
                        </div>
                        <div className="created_date">
                          created date :{item.created_at}
                        </div>
                      </div>
                    );
                })
            )
        }
        else{
            return(
                <div></div>
            )
        }
        
    }


    
    return(
        <>
      
      <div className="HomePage_background_container">
        <div className="title_repositories">
         {token ? "Your Repositories": "looks like some error occurs fetching data, kindly login again"}
        </div>
        <div className="repositories_list_background">
            {token ? <RepoList/>: ""}

        
        </div>
      </div>
    </>
    )
}
export default RepoList