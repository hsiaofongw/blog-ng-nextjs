async function rewrites() {

    const apiEndPoint = "https://exploro.vercel.app";
    const apiPath = "/api/rewrites";
    const fullURI = `${apiEndPoint}${apiPath}`;

    const routes = await fetch(fullURI).then(d => d.json());

    console.log("rewrite routes:");
    console.log(routes);

    if (routes) {
        if (routes.length) {
            return routes;
        }
    }

    return [];
}

module.exports = {
    rewrites 
}