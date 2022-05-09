import {useEffect, useState} from "react";
import axios from "axios";
import Search from "../components/Search";
import MyList from "../components/MyList";
import '../scss/Home.scss'
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home() {
    const [query, setQuery] = useState("");
    const [data, setData] = useState(null);
    const [list, setList] = useState([])

    useEffect(()=>{
        findAll();
    },[]);

    const onKeyPress=(e)=>{
        if(e.key==='Enter') {
            click()
        }
    }

    return (
        <>
      <body>
          <Header />
          <info>
              <search>
                  <input placeholder='search' onKeyPress={onKeyPress} onChange={change}/>
                  <button onClick={click}>검색</button>
                  <div className="result">
                      {data === null ? <h2>검색해주세요</h2> :
                          <>
                              <Search {...data}/>
                              <button onClick={save}>저장</button>
                          </>
                          }
                  </div>
              </search>
              <repository>
                  <div>
                      <h3>My List ({list.length})</h3>
                  </div>
                  <div>
                      {list.map(a=>{
                          return <div className="element" key={a.index}>
                              <MyList {...a}/>
                              <button onClick={(e)=>{remove(a.index, e)}}>삭제</button>
                          </div>
                      })}
                  </div>
              </repository>
          </info>
      </body>
            <Footer />
        </>
    );

    function change(e) {
        if(e.key === 'Enter') console.log("Enter");
        setQuery(e.target.value);
    }

    function click() {
        console.log(query);
        search(query);
    }

    function search(query) {
        axios.get("/api/restaurant/search",
            {params: {query: query}}
        )
            .then(res=>{
                console.log(res.data);
                setData(data=>res.data);
            })
            .catch(error=>console.log(error));
    }

    function save() {
        axios.post("/api/restaurant", data)
            .then(res=>{
                console.log(res);
                findAll();
                setData(null);
            })
            .catch(e=>console.log(e));
    }

    function remove(index) {
        axios.delete(`/api/restaurant/${index}`)
            .then(res=> {
                console.log(res);
                findAll();
            })
            .catch(err=>console.log(err))
    }

    function findAll() {
        axios.get("/api/restaurant/all")
            .then(res=>{
                console.log(res);
                setList(all=>{return res.data});
                console.log("all", list);
            })
            .catch(error=>console.log(error));
    }
}

export default Home;