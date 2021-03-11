import type { NextApiRequest, NextApiResponse } from 'next'
import { getArticles, getAbouts } from '../../helpers/blogDataDto';

function createRewriteRule(data: IPostExcerptData[]): [IPostExcerptData[], IPostURLRewriteRoute[]] {
    
    const staticEndPoint = "https://blog-data-nextjs.vercel.app/api/pdfs";
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

    let data = await getArticles();
    let abouts = await getAbouts();
    data = data.concat(abouts);
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