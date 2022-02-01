import{Link} from "react-router-dom";

import { useState, useEffect, useContext } from "react";
import UserTokenContext from "../../store/userTokenContext";
import { useParams,useNavigate  } from "react-router-dom";
function Navbar(params) {
    const { token, setToken } = useContext(UserTokenContext);
    const navigate=useNavigate();

    useEffect(() => {
        if(token==null){
            navigate('/login');
        }
    },[logout,navigate])

    function logout() {
        if (token != null) {
          setToken(null);
        }
      }
    
    
    
    
        
    return(

        <div className="navbar_container">
            {token ? <><div className="home_menu"><Link to="/home"> Home</Link></div>
                        <div className="logout_btn" onClick={logout}> Logout</div></>:<div className="home_menu"><Link to="/login"> Back to Login</Link></div>}
                
                

        </div>
    )
    
}
export default Navbar;