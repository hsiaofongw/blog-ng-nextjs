async function rewrites() {

    const testApiEndPoint =  "https://exploro-git-test-hsiaofongw.vercel.app";
    const mainEndPoint = "https://exploro.vercel.app";

    const apiEndPoint = testApiEndPoint;

    const apiPath = "/api/rewrites";
    const fullURI = `${apiEndPoint}${apiPath}`;

    const routes = await fetch(fullURI).then(d => d.json());

    console.log("rewrite routes:");
    console.log(routes);

    return routes;
}

module.exports = {
    rewrites 
}