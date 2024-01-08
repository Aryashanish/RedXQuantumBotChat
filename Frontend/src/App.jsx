import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { UserProvider } from './Context/UserContext'

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Outlet />
        <Footer />
      </UserProvider>
    </>
  )
}

export default App
