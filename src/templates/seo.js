import React from 'react';
import { Link, graphql, navigate } from 'gatsby';
import { window } from 'browser-monads';
import Layout from '../components/layout';
import Nav from '../components/nav';
import SEO from '../components/seo';
import '../components/home/home.css';
import './archive.css';

import headerImg from '../images/general-header-image.jpg';


const Seo = (props) => {

    const blogContent = props.data.allContentfulBlog
    const { currentPage, numPages } = props.pageContext
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/category/seo' : `/category/seo/${currentPage - 1}`
    const nextPage = `/category/seo/${currentPage + 1}`

    return (
        <Layout>
        <SEO title='Blog' keywords={['travel', 'travel blog', 'travel photography']} />
        <Nav />

        <header>
            <div className='archive__section'>
                <div className='archive__hero' style={{backgroundImage: `url(${headerImg})`}}></div>
                <div className='archive__nav'>
                    <Link to='/blog' className={window.location.href.indexOf('/blog') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Guide</Link>
                    <Link to='/category/seo' className={window.location.href.indexOf('category/seo') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>SEO</Link>
                    <Link to='/category/google-analytics' className={window.location.href.indexOf('category/google-analytics') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Google Analytics</Link>
                    <Link to='/category/podcast' className={window.location.href.indexOf('category/podcast') > 0 ? 'archive__nav--link selected' : 'archive__nav--link'}>Podcast</Link>
                </div>
            </div>
        </header>

        <div className='feed'>
            {blogContent.edges.map(edge => (
                <div key={edge.node.id} className='card'
                style={{
                    backgroundImage: `linear-gradient(
                    to bottom,
                    rgba(10,10,10,0) 0%,
                    rgba(10,10,10,0) 50%,
                    rgba(10,10,10,0.7) 100%),
                    url(${edge.node.featuredImage.fluid.src})`
                }}
            onClick={() => navigate(`/blog/${edge.node.slug}`)}
            >
            {edge.node.category.map(category => (
            <p className='card__category'>{category.category}</p>
            ))}
            <p className='card__title'>{edge.node.title}</p>
            </div>
            ))},
        </div>


        <div className='pagination'>
            <div className='pagination__items'>
                {!isFirst && (
                    <Link to={prevPage} rel='prev'>
                        <div className='arrow__back'></div>
                    </Link>
                )}
            </div>
            <div className='pagination__items'>
                {!isFirst && (
                    <Link to={nextPage} rel='next'>
                        <div className='arrow__next'></div>
                    </Link>
                )}
            </div>
        </div>        
        </Layout>
    )
}


export default Seo

// this is our graphql call

export const pageQuery = graphql `
    query SeoQuery ($skip: Int!, $limit: Int!) {
        allContentfulBlog(
            sort: { fields: [createdAt], order: DESC },
            filter: {
                node_locale: {eq: "en-US",},
                category: {elemMatch: {title: {eq: "SEO"}}}
            },
                skip: $skip,
                limit: $limit
            ) {
            edges {
                node {
                    id
                    slug
                    title
                    createdAt
                    category {
                        title
                        id
                    }
                    featuredImage {
                        fluid(maxWidth: 1200, quality: 85) {
                            src
                            ...GatsbyContentfulFluid
                        }
                    }
                }
            }
        }
        
    }`