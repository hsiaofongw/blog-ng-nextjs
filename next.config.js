async function rewrites() {

    let routes = [];

    routes.push({
        source: "/posts/:anything(.+)",
        destination: 'https://blog-data-nextjs.vercel.app/api/dynamicrewrites/:anything'
    });

    return routes;
}

module.exports = {
    rewrites
}