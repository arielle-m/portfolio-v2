import { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'

// export default function PageHome( {restBase, featuredImage, fieldImage} ) {
const PageHome = ( {restBase, featuredImage, fieldImage} ) => {
    const restPath = restBase + 'pages/2?_embed&acf_format=standard'
    const restPathProjects = restBase + 'posts?_embed'
    const restPathSkillDevelopment = restBase + 'skill?_embed&orderby=title&order=asc&per_page=50&skill-category=23'
    const restPathSkillDesign = restBase + 'skill?_embed&orderby=title&order=asc&per_page=50&skill-category=22'
    const [restData, setData] = useState([])
    const [restDataProjects, setDataProjects] = useState([])
    const [restDataSkillDevelopment, setDataSkillDevelopment] = useState([])
    const [restDataSkillDesign, setDataSkillDesign] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            const response_projects = await fetch(restPathProjects)
            const response_skill_development = await fetch(restPathSkillDevelopment)
            const response_skill_design = await fetch(restPathSkillDesign)
            if ( response.ok && response_projects.ok && response_skill_development.ok && response_skill_design.ok ) {
                const data = await response.json()
                const dataProjects = await response_projects.json()
                const dataSkillDevelopment = await response_skill_development.json()
                const dataSkillDesign = await response_skill_design.json()
                setData(data)
                setDataProjects(dataProjects)
                setDataSkillDevelopment(dataSkillDevelopment)
                setDataSkillDesign(dataSkillDesign)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath, restPathProjects, restPathSkillDevelopment, restPathSkillDesign])
    
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
                    {restDataProjects.map( project => 
                        <article key={project.id} id={`post-${project.id}`}>
                            <Link to={`/project/${project.slug}`}>
                                {project.featured_media !== 0 && project._embedded &&
                                    <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(project._embedded['wp:featuredmedia'][0])}></figure>
                                }
                                <h3>{project.title.rendered}</h3>
                            </Link>
                        </article>
                    )}
                    {/* {restData.acf.featured_projects.map ( project =>
                        <article key={project.id} id={`post-${project.id}`}>
                            <Link to={`/project/${project.post_name}`}>
                                <h3>{project.post_title}</h3>
                                {project.}

                                { restData._embedded &&
                                    <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(restData._embedded['wp:featuredmedia'][0])}></figure>
                                }
                            </Link>
                        </article>
                    )} */}
                    {/* { restData._embedded && restData._embedded['acf:post'].map ( project =>
                        <article key={project.id} id={`post-${project.id}`}>
                            <Link to={`/project/${project.slug}`}>
                                <h3>{project.title.rendered}</h3>
                                {project.featured_media !== 0 &&
                                    <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(project._embedded['wp:featuredmedia'][0])}></figure>
                                }
                            </Link>
                        </article>
                    )} */}
                </section>
                <section id="about">
                    <h2>{restData.acf.about_header}</h2>
                        {restData.acf.about_image &&
                        <figure className="about-image" dangerouslySetInnerHTML={fieldImage(restData.acf.about_image)} loading="lazy"></figure>
                        }
                        <p>{restData.acf.about_paragraph}</p>
                        <p dangerouslySetInnerHTML={{__html: restData.acf.about_hobbies}}></p>
                    <h3>{restData.acf.skills_header}</h3>
                        <h4>{restDataSkillDevelopment[0]._embedded['wp:term'][0][0].name}</h4>
                        <ul>
                        {restDataSkillDevelopment.map (skilldevelopment =>
                            <li key={skilldevelopment.id} id={`post-${skilldevelopment.id}`}>{skilldevelopment.title.rendered}</li>
                        )}
                        </ul>
                        <h4>{restDataSkillDesign[0]._embedded['wp:term'][0][0].name}</h4>
                        <ul>
                        {restDataSkillDesign.map (skilldesign =>
                            <li key={skilldesign.id} id={`post-${skilldesign.id}`}>{skilldesign.title.rendered}</li>
                        )}
                        </ul>
                </section>
                <section id="contact">
                    <h2>{restData.acf.contact_header}</h2>
                    <p>{restData.acf.contact_paragraph}</p>
                    <Link to={restData.acf.contact_button.url} target={restData.acf.contact_button.target}>{restData.acf.contact_button.title}</Link>
                </section>
            </article>
        : 
            <Loading /> 
        }

      </>
    );
  }
  
export default PageHome