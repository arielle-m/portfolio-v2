import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { Helmet } from 'react-helmet-async'
import { NavHashLink } from 'react-router-hash-link'

export default function PageProject( {restBase, featuredImage, fieldImage} ) {
  const { slug } = useParams()
  const restPath = restBase + `project?_embed&acf_format=standard&slug=${slug}`
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
        <article id={`post-${restData.id}`} className="z-0">
          <Helmet>{restData.yoast_head}</Helmet>
          {/* <nav className="site-navigation project-navigation bg-orange-700 fixed bottom-0 left-0 w-full h-16 text-center flex justify-center items-center lg:top-2/4 lg:flex-col lg:w-min lg:bg-transparent">
            <ul id="header-menu" className="z-30 w-full lg:text-left">
              {restData.acf.project_section.map( section => 
                <li className="inline-block w-3/12 lg:w-min">
                  <NavHashLink to={`/project/${restData.slug}/#${section.section_id}`} smooth end className="no-underline uppercase font-bold tracking-widest text-right text-orange-100 text-2xl hover:text-orange-300 lg:text-orange-600"><span>&mdash;</span><span className="">{section.section_label}</span></NavHashLink>
                  </li>
              )}
            </ul>
          </nav> */}
          <header className="mb-8 max-w-(--breakpoint-xl) mx-auto">
            {restData.featured_media !== 0 && restData._embedded &&
              // <figure className="featured-image project rounded-2xl overflow-hidden mx-auto my-0 max-h-screen" dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}></figure>
              <figure className="featured-image project rounded-b-3xl overflow-hidden mx-auto my-0 max-h-screen" dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}></figure>
            }
            <h1 className="skew uppercase font-semibold tracking-wide sm:tracking-wider text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-8 mt-8 px-8">{restData.title.rendered}</h1>
            <div className="md:flex md:justify-center md:gap-8 px-8">
              {/* <table className="border-collapse flex md:min-w-96 align-middle">
                <thead className="flex flex-col text-right text-wrap">
                  <tr className="inline-flex flex-col pr-2 py-1 h-min">
                    <th>Initiative</th>
                    <th>Role</th>
                    <th>Tools</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="inline-flex flex-col text-left pl-2 py-1">
                    <td>{restData.acf.project_info.role}</td>
                    <td>
                      <ul>
                        {restData._embedded['wp:term'][1].map (skill =>
                            <li key={skill.id} id={`post-${skill.id}`} className="text-orange-100 bg-orange-900 rounded-full inline-block px-4 py-1 my-1 mx-1">{skill.name}</li>
                        )}
                        </ul>
                      </td>
                  </tr>
                </tbody>
              </table> */}
              <table className="border-collapse md:min-w-96 align-middle">
                <tbody>
                  {/* <tr className="">
                    <th className="uppercase text-right text-wrap pr-2 py-2">Initiative</th>
                  </tr> */}
                  <tr className="">
                    <th className="uppercase text-right text-wrap pr-2 py-2 align-top">Role</th>
                    <td className="text-left pl-2 py-2 capitalize">{restData.acf.project_info.role}</td>
                  </tr>
                  <tr className="">
                    <th className="uppercase text-right text-wrap pr-2 py-2 align-top">Tools</th>
                    <td className="py-2">
                      <ul>
                        {restData._embedded['wp:term'][1].map (skill =>
                            <li key={skill.id} id={`post-${skill.id}`} className="text-orange-100 bg-orange-900 rounded-full inline-block px-4 py-1 my-1 mx-1">{skill.name}</li>
                        )}
                        </ul>
                      </td>
                  </tr>
                </tbody>
              </table>
              <div className="md:w-11/12">
                <p>{restData.acf.project_description}</p>
                <div className="flex flex-col sm:flex-row text-center gap-4">
                  <Link to={restData.acf.project_link_main.url} target={restData.acf.project_link_main.target} className="project-link no-underline block px-8 py-2  w-full sm:w-max bg-orange-300 rounded-full">{restData.acf.project_link_main.title}</Link>
                  {restData.acf.project_links !== false && restData.acf.project_links.map( (link, index) =>
                    <Link to={link.project_link.url} target={link.project_link.target} key={index} className="project-link no-underline block px-8 py-2 w-full sm:w-max outline outline-4 outline-orange-300 rounded-full">{link.project_link.title}</Link>
                  )}
                </div>
              </div>
            </div>
          </header>
          <section className="flex flex-col gap-4">
            {restData.acf.project_section.map( section =>
              <section key={section.section_id} id={section.section_id} className="mx-auto">
                {section.project_section_content.map( content =>
                  {switch (content.acf_fc_layout) {
                    case 'heading_2_layout':
                      return <h2 className="project-content gaegu text-3xl lg:text-4xl leading-7 lg:leading-8 lowercase tracking-tight max-w-md mt-3 mb-4">{content.heading_2}</h2>
                    case 'heading_3_layout':
                      return <h3 className="project-content gaegu text-3xl lg:text-4xl leading-7 lg:leading-8 lowercase tracking-tight max-w-md mt-3 mb-4">{content.heading_3}</h3>
                    case 'paragraph_layout':
                      return <div className="mt-2 max-w-md" dangerouslySetInnerHTML={{__html: content.paragraph}}></div>;
                    case 'bullet_point_layout':
                      return ;
                    case 'persona_quote_layout':
                      return ;
                    case 'blockquote_small_layout':
                      return ;
                    case 'blockquote_big_layout':
                      return ;
                    case 'image_layout':
                      return ;
                    case 'image_full_width_layout':
                      return ;
                    case 'video_layout':
                      return ;
                    case 'persona_card_layout':
                      return ;
                    case 'before_after_layout':
                      return ;
                    case 'two_column_layout':
                      return ;
                    default:
                      return <p>Not a valid flexible content layout.</p>
                  }}
                )}
              </section>
            )}
            {/* {restData.acf.project_details !== false && restData.acf.project_details.map( (dropdown, index) =>
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
            )} */}
          </section>
        </article>
      : 
        <Loading /> 
      }
    </>
  )
}
