import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from "react-loading";
import './App.css';

const App: FC = () => {
  type hogeType = {
    id: Number,
    test: String
  }
  const [hoge, setHoge] = useState<hogeType|null>(null);
  const fetchRandomItem = () => {
    axios.defaults.baseURL = 'http://localhost:4500'
    const url: string = "/tests/fetch";
    axios.get(url).then(response => {
      setHoge(response.data);
    });
  }
  useEffect(() => {
    fetchRandomItem();
  }, []);

  return(
    <div>
      {
        hoge ?
          <div>
            <h1>
              {hoge?.id.toString()}
            </h1>
            <p>{hoge?.test}</p>
          </div>
             :
          <ReactLoading
            type="spin"
            color="#ebc634"
            height="100px"
            width="100px"
          />
      }
      <button onClick={fetchRandomItem}>取得</button>
    </div>
  )
}

export default App;
