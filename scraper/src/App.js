import { useState,useEffect } from "react";
import Card from "./components/Card";
import Header from "./components/Header";

const App=()=> {

  const [deals,setDeals]=useState([null])

  const getDeals=async()=>{
    try{
      const response=await fetch("http://localhost:8000/deals",{method:"GET"})
      const data=await response.json();
      setDeals(data);
    }catch(e){
      console.error(e);
    }
  }

  useEffect(()=>{
    getDeals();
  },[])

console.log(deals)

  return (
    <div className="app">
      <Header/>
      <div className="container">
        <h2>Amazon Best Deals!</h2>
        <div className="feed">
        {deals[0] === null ? (
          <p>Loading...</p> // or any loading indicator
        ) : deals.length > 0 ? (
          deals.map((deal) => <Card key={deal.pos} item={deal} />)
        ) : (
          <p>No deals available</p>
        )}
      </div>
      </div>

    </div>
  );
}

export default App;
