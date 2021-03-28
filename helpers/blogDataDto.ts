import got from 'got';

const resourceUrl = "https://blog-data-nextjs.vercel.app/api"
// const commentsUrl = "https://comments-proxy.vercel.app/api/comments";
// const commentsUrl = "http://127.0.0.1:3001/comments";
const commentsUrl = "https://blog-comments.exploro.one/comments";

export async function getBlogBasicMetaData(): Promise< IBlogBasicMetaData > {
    const blogBasicMetaDataUrl = `${resourceUrl}/blog-basic-metadata`;
    const blogBasicMetaData = await fetch(blogBasicMetaDataUrl).then(d => d.json()) as IBlogBasicMetaData;

    return blogBasicMetaData;
}

export async function getComments(location: string): Promise<IComment[]> {
    let url = new URL(commentsUrl);
    url.searchParams.append("location", location);

    const commentsData = await fetch(url.toString()).then(d => d.json()) as IComment[];

    return commentsData;
}

export async function postComment(comment: IComment): Promise<IComment> {

    const data = await fetch(commentsUrl, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(comment)
    }).then(d => d.json());

    return data as IComment;
}

export async function getDataForCommentsPage(): Promise<[ IComment[], IBlogBasicMetaData ]> {

    const comments = await getComments("/comments");
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
