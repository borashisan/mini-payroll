import { type FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './pages/components/Header'
import Home from './pages/Home'
import Practice1 from './pages/Practice1'
import Practice2 from './pages/Practice2'
import Practice3 from './pages/Practice3'
import Test from './pages/Test'

const App: FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/practice1" element={<Practice1 />}></Route>
        <Route path="/practice2" element={<Practice2 />}></Route>
        <Route path="/practice3" element={<Practice3 />}></Route>
        <Route path="/test" element={<Test />}></Route>
      </Routes>
    </>
  )
}

export default App
