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

interface ICardData {
    title: string;
    description: string;
    avatar: string;
    link: string;
    addDate: string;
    dateVerified?: string;
}

interface IMenuProps {
    links: ILinkData[];
}

interface IBlogBasicMetaData {
    title: string;
    description: string;
    charSet: string;
    avatar?: string;
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

interface IFriendProps {
    cardData: ICardData[];
    linkData: ILinkData[];
    blogBasicMetaData: IBlogBasicMetaData;
}

interface IFriendState {
    selected?: string;
    cardIdxes: { [key: string]: ICardData | undefined }
}

interface ILayoutProps {
    blogBasicMetaData: IBlogBasicMetaData;
    pageName?: string;
}