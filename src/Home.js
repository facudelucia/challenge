import React,{useState, useEffect} from 'react'
import "./Home.css"
import Card from './Card'
import { useStateValue } from './StateProvider'
import axios from "axios"
import Spinner from "./Spinner"
import { v4 as uuidv4 } from 'uuid';
function Home() {
    const[{token}, dispatch]= useStateValue()

    const[places, setPlaces] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const getPlaces = async() => {
            setLoading(true)
            await axios.get("http://churrasco.uk.to:3005/api/sites",{headers})
                .then(datos=>{
                    setPlaces(datos.data.sites)     
                })
            setLoading(false)
        }
        getPlaces()
        
    }, [])

    const logout = () => {
        dispatch({
            type:"LOGOUT"
        })
    }
    
    return (
        <>
       { loading 
       ? <Spinner />
       :<div className="home">
            <div className="home__header">
                <div onClick={()=>logout()} className="home__headerLogout">
                    Logout
                </div>
            </div>
            <div className="home__description">
                <h2>Hey! Welcome to Churrasco Travel! <i className="fas fa-plane-departure"></i></h2>
                <h5>These are some of the destinations we can offer FOR FREE!</h5>
                <p>DISCLAIMER: We only offer Google Maps based travels</p>
                <p>If you have any issues while traveling.. it's Google's fault</p>
            </div>
            
            {places.map(place=>(
                <Card
                    key={uuidv4()}
                    img={place.url_imagen}
                    title={place.nombre}
                    description={place.descripcion}
                />
            ))}
            
            </div>}
        </>
    )
}

export default Home
