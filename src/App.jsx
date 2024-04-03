import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { HashLink } from 'react-router-hash-link'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import Header from "./components/Header"
import Footer from "./components/Footer"
import PageHome from "./pages/PageHome"
import PageProject from "./pages/PageProject"


function App() {

  const restBase = 'https://ariellemarin.com/portfolio/wp-json/wp/v2/'

  const featuredImage = ( featuredImageObject ) => {
    let imgWidth = featuredImageObject.media_details.sizes.full.width;
    let imgHeight = featuredImageObject.media_details.sizes.full.height;
    let imgURL = featuredImageObject.source_url;
    let img = `<img src="${imgURL}" 
        width="${imgWidth}"
        height="${imgHeight}"
        alt="${featuredImageObject.alt_text}"
        srcset="${imgURL} ${imgWidth}w,
        ${featuredImageObject.media_details.sizes.large ? featuredImageObject.media_details.sizes.large.source_url + ' 1024w,' : ''}
        ${featuredImageObject.media_details.sizes.medium_large ? featuredImageObject.media_details.sizes.medium_large.source_url + ' 768w,' : ''}
        ${featuredImageObject.media_details.sizes.medium ? featuredImageObject.media_details.sizes.medium.source_url + ' 300w' : ''}"
        sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">`;
    return {__html: img}
  }

  const fieldImage = ( fieldImageObject ) => {
    let imgWidth = fieldImageObject.width;
    let imgHeight = fieldImageObject.height;
    let imgURL = fieldImageObject.url;
    let img = `<img src="${imgURL}" 
        width="${imgWidth}"
        height="${imgHeight}"
        alt="${fieldImageObject.alt}"
        srcset="${imgURL} ${imgWidth}w,
        ${fieldImageObject.sizes?.large ? fieldImageObject.sizes.large + ' 1024w,' : ''}
        ${fieldImageObject.sizes?.medium_large ? fieldImageObject.sizes.medium_large + ' 768w,' : ''}
        ${fieldImageObject.sizes?.medium ? fieldImageObject.sizes.medium + ' 300w' : ''}"
        sizes="(max-width: ${imgWidth}) 100vw, ${imgWidth}px">`;
    return {__html: img}
  }

  return (
    <>
      <Router>
        <Header />
          <main id="main">
            <Routes>
              <Route path="/" element={<PageHome restBase={restBase} fieldImage={fieldImage}/>} />
              <Route path="/project/:slug" element={<PageProject restBase={restBase} featuredImage={featuredImage} fieldImage={fieldImage} />} />
            </Routes>
          </main>
        <Footer />
      </Router>
    </>
  )
}

export default App
