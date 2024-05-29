import { useEffect, useState } from 'react'
import './App.css'
import LoadingScreen from './pages/LoadingScreen'
import Code from './components/Code'

function App() {
  const [isLoading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    const Timer = setTimeout( () => {
      setLoading(false)
    }, 2000)
  })
  
  return (
    <>
    <div className='bg-[#151515] min-h-screen px-20 '>
      {
        isLoading ? <LoadingScreen /> : ''
      }
      <div className='h-20 flex items-center w-full'>
        <h1 className='text-white text-3xl font-firacode'>
            Python Compiler
        </h1>
      </div>
      <div className='h-full w-full mt-5'>
        <Code />
      </div>
    </div>
    </>
  )
}

export default App
