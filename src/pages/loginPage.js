import { client } from "../request";

function Login(params) {
  const client_id = client.REACT_APP_CLIENT_ID;

  return (
    <div className="background_container">
      {
        (window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}&login`)
      }
    </div>
  );
}
export default Login;
