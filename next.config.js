async function rewrites() {

    let routes = [];

    routes.push({
        source: '/posts/:anything(.+)',
        destination: 'https://blog-data-nextjs.vercel.app/api/dynamicrewrites/posts/:anything'
    });

    routes.push({
        source: '/abouts/:anything(.+)',
        destination: 'https://blog-data-nextjs.vercel.app/api/dynamicrewrites/abouts/:anything'
    });

    return routes;
}

module.exports = {
    rewrites
}