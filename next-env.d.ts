/// <reference types="next" />
/// <reference types="next/types/global" />


interface IPostExcerptData {
    name: string;
    file: string;
    date: string;
    description?: string;
    prettyPath?: string;
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
    dateVerified?: boolean;
    dateVerifiedBy?: string;
}


interface IMenuProps {
    links: ILinkData[];
}

interface IBlogBasicMetaData {
    title: string;
    description: string;
    charSet: string;
    avatar?: string;
    menu: ILinkData[];
}

interface IHomeProps {
    postExcerptData: IPostExcerptData[];
    blogBasicMetaData: IBlogBasicMetaData;
}

interface IHomeState {
    postExcerptData: IPostExcerptData[];
}

interface IAboutProps {
    postExcerptData: IPostExcerptData[];
    blogBasicMetaData: IBlogBasicMetaData;
}

interface IFriendProps {
    cardData: ICardData[];
    blogBasicMetaData: IBlogBasicMetaData;
}

interface IFriendState {
    selected?: string;
    cardIdxes: { [key: string]: ICardData | undefined };
    cards: ICardData[];
}

interface ILayoutProps {
    blogBasicMetaData: IBlogBasicMetaData;
    pageName?: string;
    title?: string;
}

interface IPostURLRewriteRoute {
    source: string;
    destination: string;
}