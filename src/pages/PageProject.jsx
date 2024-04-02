import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'

export default function PageProject( {restBase, featuredImage, dropdownImage} ) {
  const { slug } = useParams()
  const restPath = restBase + `posts?_embed&acf_format=standard&slug=${slug}`
  const [restData, setData] = useState([])
  const [isLoaded, setLoadStatus] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(restPath)
      if ( response.ok ) {
        const data = await response.json()
        setData(data[0])
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
        <article id={`post-${restData.id}`}>
          <header>
            {restData.featured_media !== 0 && restData._embedded &&
              <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}></figure>
            }
            <h1>{restData.title.rendered}</h1>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Tools</th>
                    <th>Team Size</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{restData.acf.project_info.role}</td>
                    <td>{restData.acf.project_info.skills}</td>
                    <td>{restData.acf.project_info.team_size}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <p>{restData.acf.project_overview}</p>
                {restData.acf.project_links.map( link =>
                  <Link to={{ pathname:  `${link.project_link.url}` }} target={link.project_link.target}>{link.project_link.title}</Link>
                )}
              </div>
            </div>
          </header>
          <section>
            {restData.acf.project_details.map( dropdown =>
              <details>
                <summary>{dropdown.dropdown_header}</summary>
                {dropdown.dropdown_content.map( content =>
                  <div>
                    {content.content_image &&
                      <figure className="dropdown-image" dangerouslySetInnerHTML={dropdownImage(content.content_image)} loading="lazy"></figure>
                    }
                    <div dangerouslySetInnerHTML={{__html:content.content_paragraph}}></div>
                  </div>
                )}
              </details>
            )}
          </section>
        </article>
      : 
        <Loading /> 
      }
    </>
  )
}
