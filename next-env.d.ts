/// <reference types="next" />
/// <reference types="next/types/global" />


interface IPostExcerptData {
    name: string;
    file: string;
    date: string;
    description?: string;
}

interface ILinkData {
    name: string;
    link: string;
    newTab: boolean;
    experimental?: boolean;
}

interface IMenuProps {
    links: ILinkData[];
}

interface IBlogBasicMetaData {
    title: string;
    description: string;
    charSet: string;
}

interface IHomeProps {
    postExcerptData: IPostExcerptData[];
    linkData: ILinkData[];
    blogBasicMetaData: IBlogBasicMetaData;
}

interface IAboutProps {
    postExcerptData: IPostExcerptData[];
    linkData: ILinkData[];
    blogBasicMetaData: IBlogBasicMetaData;
}

interface Card {
    title: string;
    description: string;
    avatar: string;
    link: string;
    addDate?: string;
    dateVerified?: string;
}