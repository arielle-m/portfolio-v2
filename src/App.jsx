// import { useState } from 'react'
import './App.css'
import "./index.css"

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import { HashLink } from 'react-router-hash-link'
// import { Link } from 'react-router-dom'
// import { NavLink } from 'react-router-dom'
// import { GlobalProvider } from "../context/GlobalContext"
import PageHome from "./pages/PageHome"
// import SectionLanding from "./pages/SectionLanding"
// import SectionProjects from "./pages/SectionProjects"
// import SectionAbout from "./pages/SectionAbout"
// import SectionContact from "./pages/SectionContact";
import PageProject from "./pages/PageProject"

import Header from "./components/Header"
import Footer from "./components/Footer"



function App() {

  const restBase = 'https://ariellemarin.com/wp-json/wp/v2/'

  // const featuredImage = ( featuredImageObject ) => {
  //   let imgWidth = featuredImageObject.media_details.sizes.full.width;
  //   let imgHeight = featuredImageObject.media_details.sizes.full.height;
  //   let imgURL = featuredImageObject.source_url;
  //   let img = `<img src="${imgURL}" 
  //       width="${imgWidth}"
  //       height="${imgHeight}"
  //       alt="${featuredImageObject.alt_text}"
  //       srcset="${imgURL} ${imgWidth}w,
  //       ${featuredImageObject.media_details.sizes.large ? featuredImageObject.media_details.sizes.large.source_url + ' 1024w,' : ''}
  //       ${featuredImageObject.media_details.sizes.medium_large ? featuredImageObject.media_details.sizes.medium_large.source_url + ' 768w,' : ''}
  //       ${featuredImageObject.media_details.sizes.medium ? featuredImageObject.media_details.sizes.medium.source_url + ' 300w' : ''}"
  //       sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">`;
  //   return {__html: img}
  // }

  return (
    <>
      {/* <Router> */}
        {/* <Header /> */}
          <main>
            {/* <Route path='/' element={<PageHome restBase />} /> */}
            {/* <Route path='/' element={<PageProject restBase />} /> */}
            <h1>Arielle Marin</h1>
            <p className="card">
            test text
            </p>
          </main>
        {/* <Footer /> */}
      {/* </Router> */}

      {/* {restData.map(post => 
        <article key={post.id} id={`post-${post.id}`}>
          {post.featured_media !== 0 && post._embedded &&
            <figure className="featured-image" dangerouslySetInnerHTML={featuredImage(post._embedded['wp:featuredmedia'][0])}></figure>
          }

        </article>
      )} */}
    </>
  )
}

export default App
