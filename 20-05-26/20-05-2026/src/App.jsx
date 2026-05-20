import { useState } from 'react'
import './App.css'
import Refris from './components/refrigerantes'

function App() {
  const [refris, setRefris] = useState([])

  const carregarRefris = async () => {
    try {
      const res = await fetch('http://localhost:3000/bebidas')

      const data = await res.json()
      console.log("refrigerantes", data)
      setRefris(data)
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div>
      <button class="bg-red-600 m-4 h-52 w-52 p-2 rounded-full text-white text-3xl" onClick={carregarRefris}>Carregar Refris</button>

      <Refris refris={refris}/>
    </div>

    
  )
}

export default App
