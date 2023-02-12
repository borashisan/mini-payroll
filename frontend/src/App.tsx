import { type FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './pages/components/Header'
import SideMenu from './pages/components/SideMenu'
import Home from './pages/Home'
import Practice1 from './pages/practice1/Practice1'
import Practice2 from './pages/practice2/Practice2'
import Practice3 from './pages/practice3/Practice3'
import Test from './pages/Test'

const App: FC = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-8">
        <div className="col-span-1">
          <SideMenu />
        </div>
        <div className="col-span-7">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/practice1" element={<Practice1 />}></Route>
            <Route path="/practice2" element={<Practice2 />}></Route>
            <Route path="/practice3" element={<Practice3 />}></Route>
            <Route path="/test" element={<Test />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
