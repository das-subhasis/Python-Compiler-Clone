import { useEffect, useState } from 'react'
import './App.css'
import LoadingScreen from './pages/LoadingScreen'

function App() {
  const [isLoading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    const Timer = setTimeout( () => {
      setLoading(false)
    }, 2000)
  })
  
  return (
    <>
    <div className='bg-[#151515] min-h-screen'>
      {
        isLoading ? <LoadingScreen /> : ''
      }
    </div>
    </>
  )
}

export default App
