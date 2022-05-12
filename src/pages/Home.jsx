import {useEffect, useState} from "react";
import axios from "axios";
import Search from "../components/Search";
import MyList from "../components/MyList";
import '../scss/Home.scss'
import Header from "../components/Header";
import Footer from "../components/Footer";
import {Button} from "@mui/material";

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
      <content>
          <Header />
          <info>
              <search>
                  <input placeholder='search' onKeyPress={onKeyPress} onChange={change}/>
                  <Button className="button" variant="contained" onClick={click}>검색</Button>
                  <div className="result">
                      {data === null ? <h2>검색해주세요</h2> :
                          <>
                              <Search {...data}/>
                              <Button className="button" variant="contained" onClick={save}>저장</Button>
                          </>
                      }
                  </div>
              </search>
              <repository>
                  <div>
                      <div className="header">My WishList ({list.length})</div>
                  </div>
                  <div>
                      {list.map(a=>{
                          return <div className="element" key={a.index}>
                              <MyList {...a}/>
                              <div className="button-list">
                                  <Button variant="contained" onClick={(e)=>{addVisit(a.index, e)}}>방문추가</Button>
                                  <Button variant="contained" onClick={(e)=>{remove(a.index, e)}}>삭제</Button>
                              </div>
                          </div>
                      })}
                  </div>
              </repository>
          </info>
          <Footer />

      </content>

      </body>
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

    function addVisit(index) {
        axios.post(`/api/restaurant/${index}`)
            .then(res=> {
                console.log(res);
                findAll();
            })
            .catch(err=>console.log(err));
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