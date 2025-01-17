import { useState, useEffect } from 'react'
import Loading from '../components/Loading'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import { Helmet } from 'react-helmet-async'

export default function PageHome( {restBase, featuredImage, fieldImage} ) {
    const restPath = restBase + 'pages/2?_embed&acf_format=standard'
    const restPathProjects = restBase + 'project?_embed'
    const restPathSkillDevelopment = restBase + 'skill-category?_embed&per_page=50&parent=3'
    const restPathSkillDesign = restBase + 'skill-category?_embed&per_page=50&parent=4'
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
    }, [restPath, restPathProjects, restPathSkillDevelopment, restPathSkillDesign ])
    
    return (
      <>
        { isLoaded ?
            <article id={`page-${restData.id}`} className="z-0">
                <Helmet>{restData.yoast_head}</Helmet>
                <section id="hero" className="max-w-screen-xl mx-auto relative h-full my-4 md:my-10 lg:my-18 overflow-x-clip lg:overflow-visible">
                    <div className=" flex flex-col justify-start mb-12 md:flex-row md:items-end md:justify-evenly">
                        <div className="z-10">
                            <h1 className="uppercase font-semibold text-3xl tracking-widest mb-2 mt-6 ">{restData.acf.greeting} <strong className="wide block w-min text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide">{restData.acf.name}</strong></h1>
                            <Link to={restData.acf.landing_button.url} target={restData.acf.landing_button.target} className="contact-button hidden md:block no-underline mx-auto mt-24 px-14 py-2 w-max bg-orange-300 rounded-full text-xl">{restData.acf.landing_button.title}</Link>
                        </div>
                        <div className="z-10">
                            <h2 className="gaegu text-3xl lg:text-4xl leading-7 lg:leading-8 lowercase tracking-tight max-w-md mt-3 mb-4">{restData.acf.occupation}</h2>
                            {/* <h2 className="font-black text-3xl uppercase leading-8 tracking-widest my-2 max-w-md mt-3">{restData.acf.occupation}</h2> */}
                            {/* <h2 className="nanum skew text-5xl lowercase leading-9 tracking-normal my-2 max-w-md mt-3">{restData.acf.occupation}</h2> */}
                            {/* <h2 className="caveat font-bold text-5xl lowercase leading-10 tracking-wider my-2 max-w-md mt-3">{restData.acf.occupation}</h2> */}
                            <div className="mt-2 max-w-md" dangerouslySetInnerHTML={{__html: restData.acf.pitch}}></div>
                        </div>
                        <HashLink to={restData.acf.landing_button.url}  smooth className="contact-button block md:hidden no-underline mt-3 px-8 py-2 w-max bg-orange-300 rounded-full z-10">{restData.acf.landing_button.title}</HashLink>
                    </div>
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute z-0 max-w-full h-full bottom-24 -right-36 scale-y-110 scale-x-150  md:bottom-20 md:right-24 lg:bottom-24 lg:right-60 md:scale-y-110 md:scale-x-150">
                        <path fill="#FB923C" d="M46.2,-43.8C61.7,-30.8,77.3,-15.4,79.7,2.4C82.1,20.2,71.4,40.5,55.9,51.5C40.5,62.6,20.2,64.5,4.8,59.7C-10.6,54.9,-21.2,43.3,-34.8,32.3C-48.5,21.2,-65.2,10.6,-70.8,-5.6C-76.3,-21.8,-70.8,-43.6,-57.2,-56.6C-43.6,-69.7,-21.8,-74.1,-3.2,-70.9C15.4,-67.7,30.8,-56.9,46.2,-43.8Z" transform="translate(100 100)" />
                    </svg>
                </section>
                <section id="projects" className="max-w-screen-xl mx-auto">
                    <h2 className="skew uppercase font-semibold tracking-wider text-5xl lg:text-7xl mb-4">{restData.acf.projects_heading_pre}<strong>{restData.acf.projects_heading}</strong>{restData.acf.projects_heading_post}</h2>
                    <div className="projects md:flex md:flex-wrap md:flex-col md:gap-x-4">
                    {restDataProjects.filter( project => project.featured[0] == 21 ).map( project =>
                        <article key={project.id} id={`post-${project.id}`} className="project-card sm:h-80 lg:h-96 w-full mb-8 mt-0 mx-auto">
                            <Link to={`/project/${project.slug}`} className="no-underline relative inline-block
                            bg-orange-200 rounded-2xl p-8 overflow-hidden h-full w-full flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 gap-x-4">
                                <div className="sm:w-5/12 flex flex-col justify-between">
                                    <h3 className="text-3xl lg:text-4xl z-30">{project.title.rendered}</h3>
                                    <div className="mt-2 max-w-md font-normal" dangerouslySetInnerHTML={{__html: project.excerpt.rendered}}></div>
                                    <ul className="">
                                        {project._embedded?.['wp:term'][1].map( skill =>
                                            <li key={skill.id} className="font-normal text-orange-100 bg-orange-900 rounded-full inline-block px-4 py-1 my-1 mx-1">{skill.name}</li>
                                        )}
                                    </ul>
                                </div>
                                <div className="flex flex-col sm:w-7/12 justify-center space-between">
                                {project.featured_media !== 0 && project._embedded &&
                                    <figure 
                                    className="featured-image relative sm:-right-12 max-h-60 sm:max-h-max overflow-hidden rounded-2xl mb-2 sm:mb-10" dangerouslySetInnerHTML={featuredImage(project._embedded['wp:featuredmedia'][0])}></figure>
                                }
                                <p className="sm:absolute sm:bottom-8 sm:right-8 inline-block m-0 mt-4 text-right">Read more <span className="screen-reader-text">about {project.title.rendered} </span>&rarr;</p>
                                </div>
                            </Link>
                        </article>
                    )}
                    </div>
                </section>
                <section id="about" className="max-w-screen-xl mx-auto py-8">
                    <h2 className="skew uppercase font-semibold tracking-wider text-5xl lg:text-7xl mb-4">{restData.acf.about_heading_pre}<strong>{restData.acf.about_heading}</strong>{restData.acf.about_heading_post}</h2>
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
                        <h3 className="uppercase tracking-widest md:text-2xl">{restData.acf.skills_heading}</h3>
                            <h4 className="lowercase font-bold tracking-tight mt-2">{restDataSkillDevelopment[0]._embedded.up[0].name}</h4>
                            <ul>
                            {restDataSkillDevelopment.map (skilldevelopment =>
                                <li key={skilldevelopment.id} id={`post-${skilldevelopment.id}`} className="text-orange-100 bg-orange-900 rounded-full inline-block px-4 py-1 my-1 mx-1">{skilldevelopment.name}</li>
                            )}
                            </ul>
                            <h4 className="lowercase font-bold tracking-tight mt-2">{restDataSkillDesign[0]._embedded.up[0].name}</h4>
                            <ul>
                            {restDataSkillDesign.map (skilldesign =>
                                <li key={skilldesign.id} id={`post-${skilldesign.id}`} className="text-orange-100 bg-orange-900 rounded-full inline-block px-4 py-1 my-1 mx-1">{skilldesign.name}</li>
                            )}
                            </ul>
                    </article>
                </section>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="-mb-1">
                    {/* <path fill="#FB923C" d="M0,224L48,240C96,256,192,288,288,288C384,288,480,256,576,250.7C672,245,768,267,864,266.7C960,267,1056,245,1152,245.3C1248,245,1344,267,1392,277.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path> */}
                    <path fill="#FB923C" d="M0,96L48,90.7C96,85,192,75,288,85.3C384,96,480,128,576,160C672,192,768,224,864,224C960,224,1056,192,1152,176C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 690" className="-mb-1 max-h-64 w-full">
                    <defs>
                        <pattern id="divider" patternUnits="userSpaceOnUse">
                            <path className="svg-divider" fill="#FB923C" d="M 0,700 C 0,700 0,350 0,350 C 145.60714285714283,318.8571428571429 291.21428571428567,287.7142857142857 408,273 C 524.7857142857143,258.2857142857143 612.75,260.00000000000006 706,290 C 799.25,319.99999999999994 897.7857142857142,378.2857142857143 1021,393 C 1144.2142857142858,407.7142857142857 1292.107142857143,378.8571428571429 1440,350 C 1440,350 1440,700 1440,700 Z"></path>
                        </pattern>
                    </defs>
                    <rect className="w-full h-full" fill="url(#divider)"></rect>
                </svg> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 690" className="-mb-1 max-h-96 w-full">
                    <path className="svg-divider" fill="#FB923C" d="M 0,700 C 0,700 0,350 0,350 C 145.60714285714283,318.8571428571429 291.21428571428567,287.7142857142857 408,273 C 524.7857142857143,258.2857142857143 612.75,260.00000000000006 706,290 C 799.25,319.99999999999994 897.7857142857142,378.2857142857143 1021,393 C 1144.2142857142858,407.7142857142857 1292.107142857143,378.8571428571429 1440,350 C 1440,350 1440,700 1440,700 Z"></path>
                </svg> */}
                {/* <div className="flex overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1438 689" className="-mb-1 max-h-96 w-full">
                        <path className="svg-divider" fill="#FB923C" d="M 0,700 C 0,700 0,350 0,350 C 145.60714285714283,318.8571428571429 291.21428571428567,287.7142857142857 408,273 C 524.7857142857143,258.2857142857143 612.75,260.00000000000006 706,290 C 799.25,319.99999999999994 897.7857142857142,378.2857142857143 1021,393 C 1144.2142857142858,407.7142857142857 1292.107142857143,378.8571428571429 1440,350 C 1440,350 1440,700 1440,700 Z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1438 689" className="-mb-1 max-h-96 w-full">
                        <path className="svg-divider" fill="#FB923C" d="M 0,700 C 0,700 0,350 0,350 C 145.60714285714283,318.8571428571429 291.21428571428567,287.7142857142857 408,273 C 524.7857142857143,258.2857142857143 612.75,260.00000000000006 706,290 C 799.25,319.99999999999994 897.7857142857142,378.2857142857143 1021,393 C 1144.2142857142858,407.7142857142857 1292.107142857143,378.8571428571429 1440,350 C 1440,350 1440,700 1440,700 Z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1438 689" className="-mb-1 max-h-96 w-full">
                        <path className="svg-divider" fill="#FB923C" d="M 0,700 C 0,700 0,350 0,350 C 145.60714285714283,318.8571428571429 291.21428571428567,287.7142857142857 408,273 C 524.7857142857143,258.2857142857143 612.75,260.00000000000006 706,290 C 799.25,319.99999999999994 897.7857142857142,378.2857142857143 1021,393 C 1144.2142857142858,407.7142857142857 1292.107142857143,378.8571428571429 1440,350 C 1440,350 1440,700 1440,700 Z"></path>
                    </svg>
                </div> */}
                <section id="contact" className="bg-orange-400">
                    <div className="py-8 text-center mx-auto lg:w-6/12">
                        <h2 className="skew uppercase font-semibold tracking-wider text-5xl lg:text-7xl mb-4">{restData.acf.contact_heading_pre}<strong>{restData.acf.contact_heading}</strong>{restData.acf.contact_heading_post}</h2>
                        <div className="text-lg" dangerouslySetInnerHTML={{__html: restData.acf.contact_paragraph}}></div>
                        <Link to={restData.acf.contact_button.url} target={restData.acf.contact_button.target} className="contact-button no-underline my-0 mx-auto block px-8 py-2 w-max bg-orange-300 rounded-full">{restData.acf.contact_button.title}</Link>
                    </div>
                </section>
            </article>
        : 
            <Loading /> 
        }

      </>
    );
  }