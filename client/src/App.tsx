import './App.css'
import { About } from './components/About/About'
import { Carousel } from './components/Carousel/Carousel'
import { Header } from './components/Header/Header'
import { PromoBar } from './components/PromoBar/PromoBar'

function App() {

  return (
    <>
      <PromoBar />
      <Header />
      <Carousel />
      <About />
    </>
  )
}

export default App
