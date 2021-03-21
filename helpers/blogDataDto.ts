import got from 'got';

const resourceUrl = "https://blog-data-nextjs.vercel.app/api"
// const resourceUrl = "http://localhost:3000/api";
// const resourceUrl = "http://localhost:3001/api";
// const resourceUrl = "https://blog-data-nextjs-git-test-hsiaofongw.vercel.app/api";
// const resourceUrl = "https://blog-data-nextjs-5xrrk0piy-hsiaofongw.vercel.app/api";

export async function getBlogBasicMetaData(): Promise< IBlogBasicMetaData > {
    const blogBasicMetaDataUrl = `${resourceUrl}/blog-basic-metadata`;
    const blogBasicMetaData = await fetch(blogBasicMetaDataUrl).then(d => d.json()) as IBlogBasicMetaData;

    return blogBasicMetaData;
}

export async function getComments(): Promise<IComment[]> {
    const dataUrl = "https://comments-proxy.vercel.app/api/comments";
    // const dataUrl = "https://blog-comments.exploro.one/comments";
    const commentsData = await fetch(dataUrl).then(d => d.json()) as IComment[];

    return commentsData;
}

export async function postComment(comment: IComment): Promise<IComment> {
    const dataUrl = "https://comments-proxy.vercel.app/api/comments";
    // const dataUrl = "https://blog-comments.exploro.one/comments";

    const data = await fetch(dataUrl, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(comment)
    }).then(d => d.json());

    return data as IComment;
}

export async function getDataForCommentsPage(): Promise<[ IComment[], IBlogBasicMetaData ]> {

    const comments = await getComments();
    const blogBasicMetaData = await getBlogBasicMetaData();

    return [ comments, blogBasicMetaData ];
}

export async function getArticlesMock(): Promise<IPostExcerptData[]> {
    const dataUrl = `${resourceUrl}/hot-release`;
    const postExcerptData = await fetch(dataUrl).then(d => d.json()) as IPostExcerptData[];
    
    return postExcerptData;
}

export async function getArticles(): Promise<IPostExcerptData[]> {
    const dataUrl = `${resourceUrl}/articles`;
    const postExcerptData = await fetch(dataUrl).then(d => d.json()) as IPostExcerptData[];
    
    return postExcerptData;
}

export async function getAbouts(): Promise<IPostExcerptData[]> {
    const dataUrl = `${resourceUrl}/abouts`;
    const postExcerptData = await fetch(dataUrl).then(d => d.json()) as IPostExcerptData[];
    
    return postExcerptData;
}

export async function getDataForHomePage(): Promise<[ IPostExcerptData[], IBlogBasicMetaData ]> {


    const postExcerptData = await getArticles();
    const blogBasicMetaData = await getBlogBasicMetaData();

    return [ postExcerptData, blogBasicMetaData ];
}

export async function getDataForAboutPage(): Promise< [ IPostExcerptData[], IBlogBasicMetaData ] > {

    const postExcerptData = await getAbouts();
    const blogBasicMetaData = await getBlogBasicMetaData();

    return [ postExcerptData, blogBasicMetaData ];
}

export async function getCards(): Promise< ICardData[] > {
    const dataUrl = `${resourceUrl}/cards`;
    const cardData = await fetch(dataUrl).then(d => d.json()) as ICardData[];

    return cardData;
}

export async function getDataForFriendPage(): Promise< [ ICardData[], IBlogBasicMetaData ] > {
    
    const cardData = await getCards();
    const blogBasicMetaData = await getBlogBasicMetaData();

    return [ cardData, blogBasicMetaData ];
}
