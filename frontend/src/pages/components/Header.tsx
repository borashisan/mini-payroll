import { type FC } from 'react'
import { Link } from 'react-router-dom'

const Header: FC = () => {
  return (
    <div className="p-4 border border-gray-100">
      <h1 className="text-3xl font-semibold">
        <Link to={'/'}>ミニ給与</Link>
      </h1>
    </div>
  )
}

export default Header
