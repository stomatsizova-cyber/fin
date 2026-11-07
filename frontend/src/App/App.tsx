import './style/reset.scss'
import './style/Index.scss'
// import Header from '../Foundation/Header/Header'
import Main from '../Foundation/Main/Main'
// import Footer from '../Foundation/Footer/Footer'
import Sidebar from '../Foundation/Sidebar/Sidebar'

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="body">
        {/* <Header /> */}
        <Main />
        {/* <Footer /> */}
      </div>
    </div>
  )
}

export default App
