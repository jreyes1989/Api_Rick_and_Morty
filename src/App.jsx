import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import ErrorFetch from './components/ErrorFetch'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'

function App() {
  
  const [location, setlocation] = useState()
  const [locationInput, setLocationInput] = useState()
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    // las ubicaciones van de la 1 a la 126
    let  URL
    if(locationInput) {
      URL = `https://rickandmortyapi.com/api/location/${locationInput}`
    }
    else { 
    const randomIdLocation = Math.floor(Math.random() * 126) + 1
      URL = `https://rickandmortyapi.com/api/location/${randomIdLocation}`
    }
    axios.get(URL)
    
    .then(res => {setlocation(res.data)
      setHasError(false)
    })
    
    .catch (err =>  {
      setHasError(true)
      console.log(err)
    })
  }, [locationInput])
  
  const handleSubmit = e =>{
    e.preventDefault()
    setLocationInput(e.target.inputSearch.value);
  }

  return (
    <div className="App">

        <div className='cover__Image'> 

        
        
        </div>

        <div className='container__Firt'>
        <h1 >Rick and Morty</h1>
          
          <form  onSubmit={handleSubmit} className="btn__center" >
          <input  id='inputSearch' type="text"  className='imput__Countryside'/>
          <button className='btn'>Search</button>
          </form>
        </div>
      

      {

        hasError ?
          <ErrorFetch />

          :
            <>
              <LocationInfo  location ={location} />
        <div className='residents-container'>
          {
            location?.residents.map(url => ( 
              <ResidentCard key={url} url={url} />
            ))
          }
        </div>
            </>
      }

      
    </div>
  )
}

export default App
