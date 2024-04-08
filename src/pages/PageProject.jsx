import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { Helmet } from 'react-helmet-async'

export default function PageProject( {restBase, featuredImage, fieldImage} ) {
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
          <Helmet>{restData.yoast_head}</Helmet>
          <header className="mb-8">
            {restData.featured_media !== 0 && restData._embedded &&
              <figure className="featured-image project rounded-2xl overflow-hidden mx-auto my-0" dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}></figure>
            }
            <h1 className="mb-4 mt-8">{restData.title.rendered}</h1>
            <div className="md:flex md:justify-center md:gap-4">
              <table className="border-collapse flex md:min-w-96 align-middle">
                <thead className="flex flex-col text-right text-wrap">
                  <tr className="inline-flex flex-col pr-2 py-1">
                    <th>Role</th>
                    <th>Tools</th>
                    <th>Team Size</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="inline-flex flex-col text-left pl-2 py-1">
                    <td>{restData.acf.project_info.role}</td>
                    <td>{restData.acf.project_info.skills}</td>
                    <td>{restData.acf.project_info.team_size}</td>
                  </tr>
                </tbody>
              </table>
              <div className="md:w-11/12">
                <p>{restData.acf.project_overview}</p>
                <div className="flex gap-4">
                  {restData.acf.project_links !== false && restData.acf.project_links.map( (link, index) =>
                    <Link to={link.project_link.url} target={link.project_link.target} key={index} className="project-link border-4 border-orange-300 no-underline my-0 inline-block px-7 py-2 w-max rounded-2xl text-center">{link.project_link.title}</Link>
                  )}
                </div>
              </div>
            </div>
          </header>
          <section className="flex flex-col gap-4">
            {restData.acf.project_details !== false && restData.acf.project_details.map( (dropdown, index) =>
              <details key={index} className="bg-orange-300 rounded-2xl py-4 px-6">
                <summary className=" uppercase tracking-wider font-bold list-outside pl-4 ml-4 cursor-pointer">{dropdown.dropdown_header}</summary>
                <div className="bg-orange-100 rounded-2xl py-4 px-6 mt-4 flex flex-col gap-6">
                {dropdown.dropdown_content.map( (content, index) =>
                  <div key={index} className="sm:flex sm:gap-4">
                    {content.content_image &&
                      <figure className="dropdown-image rounded-2xl overflow-hidden max-h-40 sm:w-48 sm:h-auto sm:max-h-none lg:w-72" dangerouslySetInnerHTML={fieldImage(content.content_image)} loading="lazy"></figure>
                    }
                    <div className="w-full" dangerouslySetInnerHTML={{__html:content.content_paragraph}}></div>
                  </div>
                )}
                </div>
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
