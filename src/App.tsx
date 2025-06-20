import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import SignUpForm from './Components/Sign-Up'
import LoginForm from './Components/Login'
import NotFound from './Components/404'
import Dashboard from './Components/Dashboard'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUpForm/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
