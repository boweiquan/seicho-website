// in order to create each blog page programmatically for the blog, we need to use the create page API in gatsby

const path = require(`path`);

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
    // query for nodes to use in creating pages
    resolve(
        graphql(request).then(result => {
            if (result.errors) {
                reject(result.errors)
            }
            return result;
        })
    )
});

// implement the gatsby API "createPages". this is called once the
// data layer is bootstraped to let plugins create pages from data.

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

//create pages for each blog.
    const getBlog = makeRequest(graphql, `
    {
        allContentfulBlog (
            sort: { fields: [createdAt], order: DESC }
            filter: {
                node_locale: {eq:"en-US"}},)
            {
                edges {
                    node {
                        id
                        slug
                    }
                }
            }
        }
    `).then(result => {
    result.data.allContentfulBlog.edges.forEach(({ node }) => {
        createPage({
            path: `blog/${node.slug}`,
            component: path.resolve(`src/templates/blog.js`),
            context: {
                id: node.id,
            },
        })
    })
});

// create archive page for all blogs, including pagination
const getArchive = makeRequest(graphql, `
{
    allContentfulBlog (
        sort: { fields: [createdAt], order: DESC }
        filter: {
            node_locale: {eq:"en-US"}},)
        {
            edges {
                node {
                    id
                    slug
                }
            }
        }
    }
`).then(result => {
    const blogs = result.data.allContentfulBlog.edges
    const blogsPerPage = 9
    const numPages = Math.ceil(blogs.length / blogsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/blog` : `/blog/${i + 1}`,
            component: path.resolve("./src/templates/archive.js"),
            context: {
                limit: blogsPerPage,
                skip: i * blogsPerPage,
                numPages,
                currentPage: i + 1
            },
        })
    })
});

// create SEO page for all blogs, including pagination
const getSEO = makeRequest(graphql, `
{
    allContentfulBlog(
        sort: {fields: [createdAt], order: DESC}, 
        filter: {
            node_locale: {eq: "en-US"}, 
            category: {elemMatch: {title: {eq: "SEO"}}}}
            ) {
      edges {
        node {
          id
          slug
        }
      }
    }
  }
`).then(result => {
    const blogs = result.data.allContentfulBlog.edges
    const blogsPerPage = 9
    const numPages = Math.ceil(blogs.length / blogsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/category/seo` : `/category/seo/${i + 1}`,
            component: path.resolve("./src/templates/seo.js"),
            context: {
                limit: blogsPerPage,
                skip: i * blogsPerPage,
                numPages,
                currentPage: i + 1
            },
        })
    })
});

// create podcast page for all blogs, including pagination
const getPodcast = makeRequest(graphql, `
{
    allContentfulBlog(
        sort: {fields: [createdAt], order: DESC}, 
        filter: {
            node_locale: {eq: "en-US"}, 
            category: {elemMatch: {title: {eq: "Podcast"}}}}
            ) {
      edges {
        node {
          id
          slug
        }
      }
    }
  }
`).then(result => {
    const blogs = result.data.allContentfulBlog.edges
    const blogsPerPage = 9
    const numPages = Math.ceil(blogs.length / blogsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/category/podcast` : `/category/podcast/${i + 1}`,
            component: path.resolve("./src/templates/podcast.js"),
            context: {
                limit: blogsPerPage,
                skip: i * blogsPerPage,
                numPages,
                currentPage: i + 1
            },
        })
    })
});

// create Google Analytics page for all blogs, including pagination
const getGoogleAnalytics = makeRequest(graphql, `
{
    allContentfulBlog(
        sort: {fields: [createdAt], order: DESC}, 
        filter: {
            node_locale: {eq: "en-US"}, 
            category: {elemMatch: {title: {eq: "Google Analytics"}}}}
            ) {
      edges {
        node {
          id
          slug
        }
      }
    }
  }
`).then(result => {
    const blogs = result.data.allContentfulBlog.edges
    const blogsPerPage = 9
    const numPages = Math.ceil(blogs.length / blogsPerPage)

    Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
            path: i === 0 ? `/category/google-analytics` : `/category/google-analytics/${i + 1}`,
            component: path.resolve("./src/templates/google-analytics.js"),
            context: {
                limit: blogsPerPage,
                skip: i * blogsPerPage,
                numPages,
                currentPage: i + 1
            },
        })
    })
});

    return Promise.all([
        getBlog,
        getArchive,
        getSEO,
        getPodcast,
        getGoogleAnalytics
    ])
};
 