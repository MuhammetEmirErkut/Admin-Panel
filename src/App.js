import './App.css';
import { UserProvider } from './context';
import Login from './pages/Login';
import Main from './pages/Main';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from './pages/Dashboard';

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
                {/* <Route path='/main/*' element={<Main />}></Route> */}
                <Route path='/main/*' element={<Dashboard />}></Route>
                <Route path='/settings/*' element={<Settings />}></Route>
                <Route path='/profile/*' element={<Profile />}></Route>
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
