import { type FC, useEffect, useState } from 'react'
import axios from 'axios'
import ReactLoading from 'react-loading'

const App: FC = () => {
  interface hogeType {
    id: number
    test: string
  }
  const [hoge, setHoge] = useState<hogeType | null>(null)
  const fetchRandomItem = (): void => {
    axios.defaults.baseURL = 'http://localhost:4500'
    const url: string = '/tests/fetch'
    axios
      .get(url)
      .then((response) => {
        setHoge(response.data)
      })
      .catch(() => {
        console.log('error')
      })
  }
  useEffect(() => {
    fetchRandomItem()
  }, [])

  return (
    <div className="Test">
      {hoge != null ? (
        <div>
          <h1>{hoge?.id.toString()}</h1>
          <p>{hoge?.test}</p>
        </div>
      ) : (
        <ReactLoading
          type="spin"
          color="#ebc634"
          height="100px"
          width="100px"
        />
      )}
      <button onClick={fetchRandomItem}>取得</button>
    </div>
  )
}

export default App
