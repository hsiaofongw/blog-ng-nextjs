const giteeUrl = "https://gitee.com/hsiaofongw/helloworld/raw/master";
const githubUrl = "https://github.com/hsiaofongw/blog-data/raw/master";

// const resourceUrl = githubUrl;
const resourceUrl = giteeUrl;

export async function getDataForHomePage(): Promise<[ IPostExcerptData[], IBlogBasicMetaData ]> {

    const dataUrl = `${resourceUrl}/articles.json`;
    const blogBasicMetaDataUrl = `${resourceUrl}/blog-basic-metadata.json`;

    const postExcerptData = await fetch(dataUrl).then(d => d.json()) as IPostExcerptData[];
    const blogBasicMetaData = await fetch(blogBasicMetaDataUrl).then(d => d.json()) as IBlogBasicMetaData;

    return [ postExcerptData, blogBasicMetaData ];
}

export async function getDataForAboutPage(): Promise< [ IPostExcerptData[], IBlogBasicMetaData ] > {

    const dataUrl = `${resourceUrl}/abouts.json`;
    const blogBasicMetaDataUrl = `${resourceUrl}/blog-basic-metadata.json`;
    
    const postExcerptData = await fetch(dataUrl).then(d => d.json()) as IPostExcerptData[];
    const blogBasicMetaData = await fetch(blogBasicMetaDataUrl).then(d => d.json()) as IBlogBasicMetaData;

    return [ postExcerptData, blogBasicMetaData ];
}

export async function getDataForFriendPage(): Promise< [ ICardData[], IBlogBasicMetaData ] > {

    const dataUrl = `${resourceUrl}/cards.json`;
    const blogBasicMetaDataUrl = `${resourceUrl}/blog-basic-metadata.json`;
    
    const cardData = await fetch(dataUrl).then(d => d.json()) as ICardData[];
    const blogBasicMetaData = await fetch(blogBasicMetaDataUrl).then(d => d.json()) as IBlogBasicMetaData;

    return [ cardData, blogBasicMetaData ];
}
