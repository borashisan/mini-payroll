import { type FC } from 'react'
import { Link } from 'react-router-dom'
import '../../index.css'

const SideMenu: FC = () => {
  return (
    <div>
      <p>
        <Link className="sideMenuBtn" to={'/'}>
          ホーム
        </Link>
      </p>
      <p>
        <Link className="sideMenuBtn" to={'/practice1'}>
          演習1
        </Link>
      </p>
      <p>
        <Link className="sideMenuBtn" to={'/practice2'}>
          演習2
        </Link>
      </p>
      <p>
        <Link className="sideMenuBtn" to={'/practice3'}>
          演習3
        </Link>
      </p>
      <p>
        <Link className="sideMenuBtn" to={'/test'}>
          APITest
        </Link>
      </p>
    </div>
  )
}

export default SideMenu
