import "./App.css";
import Body from "./components/Body";
import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <Body />
    </GoogleOAuthProvider>
  );
}

export default App;
