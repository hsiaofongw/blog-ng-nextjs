import type { NextApiRequest, NextApiResponse } from 'next'

function createRewriteRule(data: IPostExcerptData[]): [IPostExcerptData[], IPostURLRewriteRoute[]] {
    
    const staticEndPoint = "https://static.exploro.one/pdf";
    const legacySiteEndPoint = "https://beyondstars.xyz";
    const pdfSuffix = ".pdf";

    let routes: IPostURLRewriteRoute[] = [];

    for (let a of data) {
        a["prettyPath"] = a["file"]
            .replace(staticEndPoint, "/posts")
            .replace(legacySiteEndPoint, "")
            .replace(pdfSuffix, "/");
        
        let source = a["prettyPath"] as string;
        let destination = a["file"];

        routes.push({ source, destination} as IPostURLRewriteRoute);

        source = source.substr(0, source.length-1);
        routes.push({ source, destination } as IPostURLRewriteRoute);
    }

    return [data, routes];
}

async function rewrites() {

    const giteeUrl = "https://gitee.com/hsiaofongw/helloworld/raw/master";
    const dataUrl = `${giteeUrl}/articles.json`;
    let data = await fetch(dataUrl).then(d => d.json()) as IPostExcerptData[];
    let routes: IPostURLRewriteRoute[] = [];
    [data, routes] = createRewriteRule(data);

    console.log("routes are:");
    console.log(routes);

    return routes;
}

async function handleRequest(req: NextApiRequest, res: NextApiResponse) {

    let rules = await rewrites();

    res.status(200).json(rules);
}

export default handleRequest;