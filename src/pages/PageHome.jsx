import { useState, useEffect } from 'react'
import Loading from '../components/Loading'

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
      <>
        { isLoaded ?
            <article id={`page-${restData.id}`}>
                <section id="#">
                    <h1>{restData.acf.greeting} <strong>{restData.acf.name}</strong></h1>
                    <h2>{restData.acf.occupation}</h2>
                    <p>{restData.acf.landing_paragraph}</p>
                </section>
                <section id="projects">
                    <h2>{restData.acf.projects_header}</h2>
                </section>
                <section id="about">
                    <h2>{restData.acf.about_header}</h2>
                    <p>{restData.acf.about_paragraph}</p>
                    <p dangerouslySetInnerHTML={{__html: restData.acf.about_hobbies}}></p>
                </section>
                <section id="contact">
                    <h2>{restData.acf.contact_header}</h2>
                    <p>{restData.acf.contact_paragraph}</p>
                </section>
            </article>
        : 
            <Loading /> 
        }

      </>
    );
  }
  
export default PageHome