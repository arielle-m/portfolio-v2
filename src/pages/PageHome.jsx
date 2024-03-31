import { useState, useEffect } from 'react'
// import Loading from '../components/Loading'

// export default function PageHome( {restBase} ) {
const PageHome = ( {restBase} ) => {
// export default function PageHome() {

    const restPath = restBase + 'pages/2'
    const [restData, setData] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            if ( response.ok ) {
                const data = await response.json()
                setData(data)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath])
    

    return (
      <div>
        <h1>PageHome</h1>
      </div>
    );
  }
  
export default PageHome