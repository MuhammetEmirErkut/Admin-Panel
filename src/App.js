import './App.css';
import { UserProvider } from './context';
import Login from './pages/Login';
import SignIn from './pages/SignIn';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <div>
            <UserProvider>
              <Routes>
                <Route path='/' element={<Register />}></Route>
                <Route path='/login/*' element={<Login />}></Route>
                <Route path='/signin/*' element={<SignIn />}></Route>
              </Routes>
            </UserProvider>

          </div>
        </header>
      </div>
    </BrowserRouter>

  );
}
function Register(){
  return(
    <>
      <Login/>
    </>
  )
}
export default App;
