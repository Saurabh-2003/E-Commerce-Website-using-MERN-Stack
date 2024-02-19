import {CheckCircle} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Success = () => {
  const navigate = useNavigate()
  return (
    <main className='flex items-center justify-center gap-10 flex-col h-[100svh] bg-gradient-to-tr from-blue-100 to-white'>
        <CheckCircle className='size-40 text-violet-500' />
        <h1 className='text-3xl text-violet-500'> Payment Successful</h1>
        <button 
        onClick={() => navigate('/products')}
        className='bg-violet-500 text-lg px-20 py-4 text-slate-300 hover:text-white hover:bg-violet-700'>Browse More Products</button>
    </main>
  )
}

export default Success