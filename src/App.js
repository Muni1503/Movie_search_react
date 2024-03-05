import React, { useEffect,useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [filtered,setFiltered]=useState('')

  const [container,setContainer]=useState([])
  useEffect(() => {
    const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2db78b1d95msh18d72bfcc58d5b2p141de9jsn7ec6770439fe',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	}
};

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (!result) {
          throw new Error('Response data format is invalid');
        }
        setContainer(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, '');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    const filter=container.filter(movie=>movie.title.toLowerCase().includes(inputValue.toLowerCase()))
    setFiltered(filter)
  };

  return (
    <div className="App">
      <h1>Welcome to Movie search</h1>
      <h3>search for your favourite Movie</h3>
      <form >
          <input type="text" value={inputValue} onChange={handleInputChange} />
          <button type="submit">submit</button>
      </form>
      <div className='element'>
        <div className='each'>



          {filtered.length === 0 && inputValue && (
            <p style={{ color: 'red', fontStyle: 'italic' }}>Sorry, there is no movie in the name "{inputValue}"</p>
          )}
          {!(filtered.length===0)&& (<p className='display'>{filtered.length} Movies Matching your search</p>)}
          {
          inputValue
            ? 
            filtered.map((movie) => (
               <img key={movie.id} src={movie.image} alt=""/>
             ))
            :container.map((movie)=>(
              <img key={movie.id} src={movie.image} alt="" />
             ))
            }
          </div>
      </div>    




</div>
  );
}

export default App;
