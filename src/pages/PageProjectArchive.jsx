import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { Helmet } from 'react-helmet-async'

export default function PageProjectArchive( {restBase, featuredImage, fieldImage} ) {
  const restPath = restBase + `project?_embed&acf_format=standard`
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
        <article id={`post-${restData.id}`} className="z-0">
          {/* <Helmet>{restData.yoast_head}</Helmet> */}
          <table>
            <tr>
              <th>Year</th>
              <th>Title</th>
              <th>Made at</th>
              <th>Built with</th>
              <th>Link</th>
            </tr>
            {restData.map( project => 
              <tr key={project.id} id={`post-${project.id}`}>
                <td>{project.date.slice(0,4)}</td>
                <td>{project.title.rendered}</td>
                <td>BCIT</td>
                <td>
                  <ul>
                    {project._embedded['wp:term'][1].map( skill =>
                        <li key={skill.id} className="font-normal inline-block py-1 my-1 mx-1">{skill.name}</li>
                    )}
                  </ul>
                </td>
                <td>
                  <Link to={project.acf.project_link_main.url} target={project.acf.project_link_main.target}>{project.acf.project_link_main.title}
                  </Link>
                </td>
              </tr>
            )}
          </table>
        </article>
      : 
        <Loading /> 
      }
    </>
  )
}
