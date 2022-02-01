import InfoIcon from "@mui/icons-material/Info";
import GroupsIcon from "@mui/icons-material/Groups";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import SettingsIcon from "@mui/icons-material/Settings";
import Navbar from "../components/navbar/navbar";
import { useParams,useNavigate  } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserTokenContext from "../store/userTokenContext";
import axios from "axios"

function Details() {
  const navigate=useNavigate()
  const params=useParams();
  const id =params.id
  const{token,setIssues}=useContext(UserTokenContext);
  const [repo,setRepo]=useState([])
 
  
  



    // ================toggeling of settings tab=================
    function toggleSetting(event) {
        const settings=document.querySelector(".updation_form");
        
        settings.classList.toggle("show_updation_form");

        
    }
    // ===========================================================
    // ==================use effect to fetch repo array ==============
    useEffect(() => {
      if (token==null){
        navigate("/login")
      }
      if (token) {
        async function fetchRepo() {
          try {
            const response = await axios.get(token.repos_url);
            setRepo(response.data);
          } catch (error) {
            console.log(error);
          }
        }
        fetchRepo();
      } else {
        console.log("token object absent");
      }
    }, [setRepo,navigate]);

  // ==============Find the single repo from array of repo matching to that id===============
  const filterObject = repo.filter((item) => {
    return item.id == id;
    
  });
  const [first, rest] = filterObject;
  
 
   
 

  return (
    <>
     
      <div className="Details_page_background_container">
        {token ? <div className="detail_page_container">
          <div className="name_container">
            <div className="name">
              <FolderSharedIcon />
              {first ? first.name : ""}
            </div>
            <div className="date_detail_page">create date :{first ? first.created_at : "" }</div>
          </div>
          <div className="description_conatiner">
            <div className="description_title">
              <InfoIcon />
              About
            </div>
            <div className="description">
              {first ? first.description : ""}
            </div>
            <div className="collaborators">
              <div className="collaborator_title">
                <GroupsIcon />
                Collaborators
              </div>
              <div className="individuals">
                <div className="collaborator">Abhishek</div>
                <div className="collaborator">Piyush</div>
                <div className="collaborator">Kishor</div>
                <div className="collaborator">Akhilesh</div>
              </div>
            </div>
            <div className="link_container">
              <div className="issues link_btn"> <a className="link_btn"href={first ? first.issues_url.split('{/')[0]:"#"} target="_blank">Issues</a> </div>
              <div className="github_link link_btn"><a className="link_btn" href={first ? first.html_url:"#"} target="_blank">Link github repo link</a> </div>
            </div>
            <div className="settings">
              <div className="settings_title" onClick={toggleSetting}>
                <SettingsIcon /> update name/description.
              </div>

              <div className="updation_form">
                <div className="chage_repo_name">
                  <label htmlFor="repo_name">Change your repo name</label>
                  <input type="text" name="repo_name" className="repo_name" />
                </div>
                <div className="change_repo_description">
                  <label htmlFor="repo_name">Change the description</label>
                  <textarea className="text_area" />
                </div>
                <div className="update_container">
                  <input type="submit" className="update_btn" value="update" />
                </div>
              </div>
            </div>
          </div>
        </div>:"looks like some error occurs fetching data, kindly login again"}
      </div>
    </>
  );
}
export default Details;
