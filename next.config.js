async function rewrites() {

    let routes = [];

    routes.push({
        source: '/posts/:anything(.+)',
        destination: 'http://localhost:3000/api/dynamicrewrites/posts/:anything'
    });

    routes.push({
        source: '/abouts/:anything(.+)',
        destination: 'http://localhost:3000/api/dynamicrewrites/abouts/:anything'
    });

    return routes;
}

module.exports = {
    rewrites
}