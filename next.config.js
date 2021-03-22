async function headers() {

    const sources = {
        'indexPage': '/',
        'directoryPage': '/:slug'
    };

    const oneMinuteCache = {
        key: 'Cache-Control',
        value: 'public,max-age=60,stale-if-error=86400,stale-while-revalidate=60',
    }

    let rules = [];
    for (const key in sources) {
        const source = sources[key];
        rules.push({
            source, headers: [ oneMinuteCache ]
        });
    }

    return rules;
}

async function rewrites() {

    const dataAPI = "https://blog-data-nextjs.vercel.app/api";

    let routes = [];

    routes.push({
        source: '/posts/:anything(.+)',
        destination: `${dataAPI}/dynamicrewrites/posts/:anything`
    });

    routes.push({
        source: '/abouts/:anything(.+)',
        destination: `${dataAPI}/dynamicrewrites/abouts/:anything`
    });

    routes.push({
        source: '/feed/:whatever',
        destination: 'https://blog-data-nextjs.vercel.app/api/feed/:whatever'
    });

    return routes;
}

module.exports = {
    rewrites, headers
}