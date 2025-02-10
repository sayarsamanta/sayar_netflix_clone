import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./redux/store/store";

import Body from "./components/Body";
function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <div className="h-screen w-screen">
          <Body />
        </div>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
