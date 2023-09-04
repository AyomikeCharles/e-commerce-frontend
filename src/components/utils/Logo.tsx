
import { BsBag, BsBagDash } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div className='my-4'>
        <Link to='/' className='font-bold flex'>
        <BsBagDash size={40}/>
        <span className="py-2">bestSeller</span>
        </Link>
    </div>
  )
}

export default Logo