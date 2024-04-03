import { useState, useEffect } from 'react'
import Loading from '../components/Loading'

// export default function PageHome( {restBase, fieldImage} ) {
const PageHome = ( {restBase, fieldImage} ) => {
    const restPath = restBase + 'pages/2'
    const restPathSkillCategory = restBase + 'skill-category?orderby=name&order=desc'
    const restPathSkill = restBase + 'skill?orderby=title&order=asc'
    const [restData, setData] = useState([])
    const [restDataSkillCategory, setDataSkillCategory] = useState([])
    const [restDataSkill, setDataSkill] = useState([])
    const [isLoaded, setLoadStatus] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(restPath)
            const response_skill_category = await fetch(restPathSkillCategory)
            const response_skill = await fetch(restPathSkill)
            if ( response.ok && response_skill.ok ) {
                const data = await response.json()
                const dataSkillCategory = await response_skill_category.json()
                const dataSkill = await response_skill.json()
                setData(data)
                setDataSkillCategory(dataSkillCategory)
                setDataSkill(dataSkill)
                setLoadStatus(true)
            } else {
                setLoadStatus(false)
            }
        }
        fetchData()
    }, [restPath, restPathSkill])
    
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
                        {restData.acf.about_image &&
                        <figure className="about-image" dangerouslySetInnerHTML={fieldImage(restData.acf.about_image)} loading="lazy"></figure>
                        }
                        <p>{restData.acf.about_paragraph}</p>
                        <p dangerouslySetInnerHTML={{__html: restData.acf.about_hobbies}}></p>
                    <h3>{restData.acf.skills_header}</h3>
                        {restDataSkillCategory.map (skillcategory =>
                            <article key={skillcategory.id} id={`tax-${skillcategory.id}`}>
                                <h4>{skillcategory.name}</h4>
                                <ul>
                                {restDataSkill.map ( skill =>
                                    {skillcategory.id === skill.skill-category[0] && 
                                        <li key={skill.id} id={`post-${skill.id}`}>{skill.title.rendered}</li>
                                    }
                                )}
                                </ul>
                            </article>
                        )}
                </section>
                <section id="contact">
                    <h2>{restData.acf.contact_header}</h2>
                    <p>{restData.acf.contact_paragraph}</p>
                    <Link to={restData.acf.contact_button.url} target={link.project_link.target}>{restData.acf.contact_button.title}</Link>
                </section>
            </article>
        : 
            <Loading /> 
        }

      </>
    );
  }
  
export default PageHome