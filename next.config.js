async function headers() {
    return [
        {
            source: '/:slug',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'public,max-age=60',
                },
                {
                    key: 'X-My-Comment',
                    value: 'you3 lian4 wei4 zhao1 zu1, xiang2 qing2 qing3 fa1 song4 you2 jian4 zi1 xun2: i@beyondstars.xyz'
                },
                {
                    key: 'X-My-Comment-Encoded',
                    value: 'U+53CB U+94FE U+4F4D U+62DB U+79DF U+8BE6 U+60C5 U+8BF7 U+53D1 U+9001 U+90AE U+4EF6 U+54A8 U+8BE2 : i @ b e y o n d s t a r s . x y z'
                },
                {
                    key: 'X-My-Feeling',
                    value: 'ha ha ha ha ha ha ha ha'
                }
            ]
        }
    ]
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