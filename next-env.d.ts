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
    timer: number | undefined;
    articleIndices: Set<string>;
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
    // selected?: string;
    // cardIdxes: { [key: string]: ICardData | undefined };
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

type CommentsIndex = {
    [key: string]: IComment // key 是 uuid 的字符串形式，IComment 是评论
};

type VisitorsIndex = {
    [key: string]: IVisitor // key 是 uuid 的字符串形式，IComment 是评论
}

interface ICommentsPageProps {

    commentsIndex: CommentsIndex;           // uuid 到 评论 的对应法则
    visitorsIndex: VisitorsIndex;           // uuid 到 访客 的对应法则
    comments: IComment[];                   // 评论列表
    blogBasicMetaData: IBlogBasicMetaData;  // 博客的基本信息

}

interface IVisitor {
    nickName: string;   // 昵称，网名
    email: string;      // 电子邮件地址
    website?: string;   // 网站网址（如果有的话）
    avatar?: string;
}

interface IComment {
    uuid: string;               // 这个评论的唯一标识符
    replyTo?: string;           // 这个评论所回复的那个评论的唯一标识符
    from: IVisitor;             // 这个评论的作者
    to?: IVisitor;              // 这个评论所回复的那个评论的作者
    at: number;                 // 这个评论所产生的时刻距离 Unix Epoch 的毫秒数
    says: string;               // 这个评论的内容
    replies?: IComment[];       // 这个评论底下的回复
    uuidOfReplies?: string[];   // 这个评论底下的每一个回复的 uuid
    location: string;           // 这个评论是产生自哪一个页面
}

interface ICommentFormProps { 
    commentsIndex: CommentsIndex, 
    visitorsIndex: VisitorsIndex,
    location: string;
};
