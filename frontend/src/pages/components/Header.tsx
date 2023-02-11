import { type FC } from 'react'
import { Link } from 'react-router-dom'
import '../../index.css'

const Header: FC = () => {
  return (
    <div>
      <p>
        <Link to={'/'}>ホーム</Link>
      </p>
      <p>
        <Link to={'/practice1'}>演習1</Link>
      </p>
      <p>
        <Link to={'/practice2'}>演習2</Link>
      </p>
      <p>
        <Link to={'/practice3'}>演習3</Link>
      </p>
      <p>
        <Link to={'/test'}>APITest</Link>
      </p>
    </div>
  )
}

export default Header
