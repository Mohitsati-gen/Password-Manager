
import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main'
import Footer from './components/Footer'

function App () {

  return (
    <>
        <Navbar/>
         <div className="w-screen  bg-gradient-to-r   from-orange-500 via-amber-100 to-green-500 animate-gradient-x ">
          <Main/>
        </div>




        <Footer/>
    </>
  )
}

export default App

// bg-gradient-to-r  from-green-100 to-green-100 animate-pulse