import './App.css'
import { About } from './components/About/About'
import { Carousel } from './components/Carousel/Carousel'
import { Header } from './components/Header/Header'
import { PromoBar } from './components/PromoBar/PromoBar'
import { Shop } from './components/Shop/Shop'

function App() {

  return (
    <>
      <PromoBar />
      <Header />
      <Carousel />
      <About />
      <Shop />
    </>
  )
}

export default App
