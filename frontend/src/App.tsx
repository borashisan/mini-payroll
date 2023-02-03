import { FC, useEffect, useState } from 'react';
import axios from 'axios';
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
    <>
      <h1>{hoge?.id.toString()}</h1>
      <p>{hoge?.test}</p>
      <button onClick={fetchRandomItem}>取得</button>
    </>
  )
}

export default App;
