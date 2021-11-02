import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [cate, setCate] = useState("");
  const [cateList, setCateList] = useState([]);
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("")

  useEffect(() => {
    axios.get("https://stream-menu-svc-v3.herokuapp.com/category")
      .then(res => setCateList(res.data))
      .catch(err => {
        console.log(err)
        setErr(err)
      })
  },[])

  useEffect(() => {
    if(cate !== ""){
      axios.get(`https://stream-menu-svc-v3.herokuapp.com/item?category=${cate}`)
      .then(res => setItems(res.data))
      .catch(err => {
        console.log(err)
        setErr(err)})
    } 
  },[cate])

  console.log(cateList)
  return (
    <div className="App">
        <h3>Menu Categories</h3>
          {err !== "" && <div>{err}</div>}
        <div className="cate-div">
            <ul className="cate-list">
              {cateList.map((el, index) => {
                return <li key={index} onClick={() => setCate(el.short_name)}>{el.name + " - (" + el.short_name + ")"}</li>
              })}
            </ul>
        </div>

        <div className="item-div">
            {cate !== "" && <h4>Item in Category: ({cate})</h4>}
            {items.length > 0 ? 
              <table className="item-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((el, index) => {
                    return <tr key={index}>
                      <td>{el.name}</td>
                      <td>{el.description}</td>
                    </tr>
                  })}
                </tbody>
              </table>:undefined}
        </div>
    </div>
  )
}

export default App;
