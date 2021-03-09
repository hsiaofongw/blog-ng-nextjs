async function rewrites() {

    const testApiEndPoint =  "https://exploro-git-test-hsiaofongw.vercel.app";
    const mainEndPoint = "https://exploro.vercel.app";

    const apiEndPoint = mainEndPoint;

    const apiPath = "/api/rewrites";
    const fullURI = `${apiEndPoint}${apiPath}`;

    let routes = await fetch(fullURI).then(d => d.json());

    routes.push({
        "source": "/:slug/:resourcefile(\[^\.]+\.[a-z0-0A-Z]{1,})",
        "destination": "https://beyondstars.xyz/:slug/:resourcefile"
    });

    routes.push({
        "source": "/:resourcefile(\[^\.]+\.[a-z0-0A-Z]{1,})",
        "destination": "https://beyondstars.xyz/:resourcefile"
    });

    routes.push({
        "source": "/:resourcefile(\[^\.]+\.gv\.svg)",
        "destination": "https://beyondstars.xyz/:resourcefile"
    });

    routes.push({
        "source": "/css/:cssfile",
        "destination": "https://beyondstars.xyz/css/:cssfile"
    });

    routes.push({
        "source": "/favicon.png",
        "destination": "https://beyondstars.xyz/favicon.png"
    });

    // console.log("rewrite routes:");
    // console.log(routes);

    return routes;
}

async function headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "exploro.one,localhost:3000" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }

module.exports = {
    rewrites, headers
}