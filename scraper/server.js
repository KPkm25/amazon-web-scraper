const express=require('express');
const cors=require('cors');


const app=express();
app.use(cors());
dotenv.config();


const username = 'Your username';
const password = 'Your password';
const PORT=8000;

app.get('/deals',async(req,res)=>{
  try{
    const body = {
        'source': 'amazon_search',
        'domain': 'in',
        'query': 'deals of the day ',
        'pages': 2,
        'parse': true,

      };
      const response = await fetch('https://realtime.oxylabs.io/v1/queries', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
        }
      });
      
      const data=await response.json();
      const results=data.results[0].content.results.organic
      const filteredDeals=results.filter(deal=>deal.price_strikethrough)
      const sortedByBestDeals=filteredDeals.sort((b,a)=>
      ((a.price_strikethrough-a.price)/a.price_strikethrough*100)-
      ((b.price_strikethrough-b.price)/b.price_strikethrough*100)
      )


      res.send(sortedByBestDeals);
      // console.log(sortedByBestDeals);

    }catch(e){
      console.error(e);
    }

})

app.listen(PORT,()=>console.log(`Listening on port ${PORT}`));