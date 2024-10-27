import { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function PageHome( {restBase, featuredImage, fieldImage} ) {
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
                <Helmet>{restData.yoast_head}</Helmet>
                <section id="hero" className="relative max-h-full">
                    <div className=" flex flex-col justify-start mb-12 lg:flex-row lg:items-end lg:justify-between">
                        <div className="z-10">
                            <h1 className="uppercase font-semibold text-3xl tracking-widest mb-2 mt-6 ">{restData.acf.greeting} <br /><strong className="wide block w-min text-9xl tracking-wide">{restData.acf.name}</strong></h1>
                            {/* <h2 className="font-black text-3xl uppercase leading-8 tracking-widest my-2 max-w-md mt-3">{restData.acf.occupation}</h2> */}
                            {/* <h2 className="nanum skew text-5xl lowercase leading-9 tracking-normal my-2 max-w-md mt-3">{restData.acf.occupation}</h2> */}
                            <Link to={restData.acf.contact_button.url} target={restData.acf.contact_button.target} className="contact-button hidden lg:block no-underline mt-14 px-8 py-2 w-max bg-orange-300 rounded-full">{restData.acf.contact_button.title}</Link>
                        </div>
                        <div className="z-10">
                            <h2 className="gaegu text-4xl lowercase leading-8 tracking-tight max-w-md mt-3 mb-4">{restData.acf.occupation}</h2>
                            {/* <h2 className="caveat font-bold text-5xl lowercase leading-10 tracking-wider my-2 max-w-md mt-3">{restData.acf.occupation}</h2> */}
                            <div className="mt-2 max-w-md" dangerouslySetInnerHTML={{__html: restData.acf.landing_paragraph}}></div>
                        </div>
                        <Link to={restData.acf.contact_button.url} target={restData.acf.contact_button.target} className="contact-button block lg:hidden no-underline mt-3 px-8 py-2 w-max bg-orange-300 rounded-full z-10">{restData.acf.contact_button.title}</Link>
                    </div>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute z-0 h-full bottom-24 -right-36 scale-y-110 scale-x-150 lg:bottom-24 lg:right-60 lg:scale-y-110 lg:scale-x-150">
                        <path fill="#FB923C" 
                        // d="M36.1,-37.6C48.6,-32.6,61.8,-22.9,66.1,-9.9C70.5,3,66,19.3,57.9,33.4C49.7,47.5,37.9,59.5,24.4,62.5C10.9,65.5,-4.3,59.5,-22,55.3C-39.8,51.2,-60,48.8,-69.7,37.6C-79.4,26.4,-78.4,6.4,-69.2,-6.4C-60,-19.1,-42.6,-24.5,-29.6,-29.4C-16.7,-34.4,-8.4,-38.9,1.7,-41C11.8,-43.1,23.7,-42.7,36.1,-37.6Z" 
                        // d="M52.2,-11.2C60.8,9.4,56,40,39.4,51.4C22.8,62.8,-5.8,55,-27.9,38.8C-50.1,22.6,-65.9,-2,-60.1,-18.6C-54.4,-35.2,-27.2,-44,-2.7,-43.1C21.8,-42.2,43.6,-31.7,52.2,-11.2Z"
                        // d="M60,-56.4C75.6,-44.3,84.6,-22.2,85.1,0.5C85.5,23.1,77.4,46.2,61.8,56.2C46.2,66.2,23.1,63.1,2.3,60.7C-18.4,58.4,-36.9,56.9,-52.8,46.9C-68.8,36.9,-82.2,18.4,-78.3,3.9C-74.5,-10.7,-53.3,-21.4,-37.3,-33.5C-21.4,-45.5,-10.7,-59,5.7,-64.7C22.2,-70.5,44.3,-68.5,60,-56.4Z"
                        d="M46.2,-43.8C61.7,-30.8,77.3,-15.4,79.7,2.4C82.1,20.2,71.4,40.5,55.9,51.5C40.5,62.6,20.2,64.5,4.8,59.7C-10.6,54.9,-21.2,43.3,-34.8,32.3C-48.5,21.2,-65.2,10.6,-70.8,-5.6C-76.3,-21.8,-70.8,-43.6,-57.2,-56.6C-43.6,-69.7,-21.8,-74.1,-3.2,-70.9C15.4,-67.7,30.8,-56.9,46.2,-43.8Z"
                        transform="translate(100 100)" />
                    </svg>
                </section>
                <section id="projects">
                    <h2 className="uppercase font-semibold tracking-wider md:text-3xl mb-4">{restData.acf.projects_header}</h2>
                    <div className="projects md:flex md:flex-wrap md:gap-x-4">
                    {restDataProjects.map( project => 
                        <article key={project.id} id={`post-${project.id}`} className="project-card h-36 max-w-lg md:max-w-md lg:max-w-xs mb-4 mt-0 mx-auto">
                            <Link to={`/project/${project.slug}`} className="relative inline-block
                            bg-orange-200 rounded-2xl p-4 overflow-hidden h-full w-full">
                                {project.featured_media !== 0 && project._embedded &&
                                    <figure 
                                    className="featured-image relative -right-5 -bottom-11 max-h-32 overflow-hidden rounded-2xl" dangerouslySetInnerHTML={featuredImage(project._embedded['wp:featuredmedia'][0])}></figure>
                                }
                                <h3 className="absolute z-30 top-4">{project.title.rendered}</h3>
                            </Link>
                        </article>
                    )}
                    </div>
                </section>
                <section id="about" className="py-8">
                    <h2 className="uppercase font-semibold tracking-wider md:text-3xl mb-4">{restData.acf.about_header}</h2>
                        <div className="md:flex md:gap-4">
                            {restData.acf.about_image &&
                                <figure className="about-image rounded-2xl max-h-80 w-9/12 overflow-hidden mb-4 mt-0 mx-auto md:w-full md:max-h-none md:h-full" dangerouslySetInnerHTML={fieldImage(restData.acf.about_image)} loading="lazy"></figure>
                            }
                            <div className="md:w-full">
                                <div dangerouslySetInnerHTML={{__html: restData.acf.about_paragraph}}></div>
                                <div dangerouslySetInnerHTML={{__html: restData.acf.about_hobbies}}></div>
                            </div>
                        </div>
                    <article className="skills">
                        <h3 className="uppercase tracking-widest md:text-2xl">{restData.acf.skills_header}</h3>
                            <h4 className="lowercase font-bold tracking-tight mt-2">{restDataSkillDevelopment[0]._embedded['wp:term'][0][0].name}</h4>
                            <ul>
                            {restDataSkillDevelopment.map (skilldevelopment =>
                                <li key={skilldevelopment.id} id={`post-${skilldevelopment.id}`} className="text-orange-100 bg-orange-900 rounded-full inline-block px-4 py-1 my-1 mx-1">{skilldevelopment.title.rendered}</li>
                            )}
                            </ul>
                            <h4 className="lowercase font-bold tracking-tight mt-2">{restDataSkillDesign[0]._embedded['wp:term'][0][0].name}</h4>
                            <ul>
                            {restDataSkillDesign.map (skilldesign =>
                                <li key={skilldesign.id} id={`post-${skilldesign.id}`} className="text-orange-100 bg-orange-900 rounded-full inline-block px-4 py-1 my-1 mx-1">{skilldesign.title.rendered}</li>
                            )}
                            </ul>
                    </article>
                </section>
                <section id="contact" className="py-8">
                    <h2 className="uppercase font-semibold tracking-wider md:text-3xl mb-4">{restData.acf.contact_header}</h2>
                    <div dangerouslySetInnerHTML={{__html: restData.acf.contact_paragraph}}></div>
                    <Link to={restData.acf.contact_button.url} target={restData.acf.contact_button.target} className="contact-button no-underline my-0 mx-auto block px-8 py-2 w-max bg-orange-300 rounded-full">{restData.acf.contact_button.title}</Link>
                </section>
            </article>
        : 
            <Loading /> 
        }

      </>
    );
  }