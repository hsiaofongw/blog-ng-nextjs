const resourceUrl = "https://blog-data-nextjs.vercel.app/api"

export async function getBlogBasicMetaData(): Promise< IBlogBasicMetaData > {
    const blogBasicMetaDataUrl = `${resourceUrl}/blog-basic-metadata`;
    const blogBasicMetaData = await fetch(blogBasicMetaDataUrl).then(d => d.json()) as IBlogBasicMetaData;

    return blogBasicMetaData;
}

export async function getComments(): Promise<ICommentData[]> {
    const dataUrl = `${resourceUrl}/comments`;
    const commentsData = await fetch(dataUrl).then(d => d.json()) as ICommentData[];

    return commentsData;
}

export async function getDataForCommentsPage(): Promise<[ ICommentData[], IBlogBasicMetaData ]> {

    const commentsData = await getComments();
    const blogBasicMetaData = await getBlogBasicMetaData();

    return [ commentsData, blogBasicMetaData ];
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
