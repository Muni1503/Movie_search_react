import React, { useEffect,useState } from 'react';
import './App.css';

function App() {
  const[endPoint,setEndPoints]=useState('')

  const[container,setContainer]=useState([])

  const[finalPoint,setFinalPoint]=useState('');
  useEffect(() => {
    const url = `https://online-movie-database.p.rapidapi.com/auto-complete?q=+${endPoint}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8b1ce93f3dmshc0e71ad3a1aec8ep102da2jsna0fb89f698d2',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (!result.d) {
          throw new Error('Response data format is invalid');
        }
        setContainer(result.d);
        return result;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [finalPoint]);

  const onChangeHandler=(e)=>{
    setEndPoints(e.target.value)
  }

  const submitHandler=(e)=>{
    e.preventDefault()
    setFinalPoint(endPoint)
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>

          <input type="text" value={endPoint} onChange={onChangeHandler}/>
          <button type="submit">submit</button>
      </form>

      <div className='element'>
        {container.map((item)=>{
          return(
            <div className="each-div">
              <img src={item.i.imageUrl} alt="img"></img>
              <p>{item.l}</p>
            </div>
          )
        })}
      </div>  
    </div>
  );
}

export default App;
