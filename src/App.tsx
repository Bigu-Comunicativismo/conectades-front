import { Main } from './components/Main';
import { Header } from '@/components/Header';
import './App.css';
import '@/styles/global.css';
import { Footer } from './components/Footer';


function App() {

  return (
    <>
      <Header />
      <Main>
        Conteúdo do main.
      </Main>
      <Footer />
    </>
  )
}

export default App
