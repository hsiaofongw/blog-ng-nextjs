import React from "react";
import Layout from "../../components/Layout";
import { avatarSimplify, getGravatar } from "../../helpers/avatar";
import { getDataForCommentsPage, postComment } from "../../helpers/blogDataDto";
import { v4 as uuidv4 } from 'uuid';
import { HoverTransitionButton } from '../../components/Button';
import { HoverTransitionLink } from '../../components/Link';
import { ShowDate } from "../../components/ShowDate";

export async function getServerSideProps(): Promise<{ props: ICommentsPageProps }> {
    const [comments, blogBasicMetaData] = await getDataForCommentsPage();
    let commentsIndex: CommentsIndex = {};
    let visitorsIndex: VisitorsIndex = {};

    for (const comment of comments) {
        commentsIndex[comment.uuid] = comment;
        visitorsIndex[comment.uuid] = comment.from;
    }

    const props = {
        commentsIndex,
        visitorsIndex,
        comments,
        blogBasicMetaData
    };

    return { props };
}

class Input extends React.Component<{ placeHolder: string, name: string, type?: string }, {}> {
    render() {
        return <input
            type={this.props.type || "text"}
            id={this.props.name}
            name={this.props.name}
            placeholder={this.props.placeHolder}
            className="rounded-none border-greenandgray-base01 border-b-2 outline-none p-1 mr-4 mb-2 text-greenandgray-base01"
        />;
    }
}

class CommentForm extends React.Component<ICommentFormProps, { buttonText: string }> {

    constructor(props: ICommentFormProps) {
        super(props);

        this.state = {
            buttonText: '提交'
        };
    }

    onCommiting() {
        this.setState({ buttonText: '提交中' });
    }

    onCommitSucced() {
        this.setState({ buttonText: '提交' });
        window.location.reload();
    }

    onSubmit(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();

        let comment: IComment = {
            uuid: uuidv4(),
            from: { nickName: '', website: '', email: '' },
            replyTo: '',
            at: new Date().valueOf(),
            says: '',
            replies: [],
            uuidOfReplies: []
        };

        const target = e.target;
        if (target instanceof HTMLFormElement) {
            let formData = new FormData(target);
            comment.from.nickName = formData.get('nickName') as string;
            comment.from.website = formData.get('website') as string;
            comment.from.email = formData.get('email') as string;

            comment.says = formData.get('says') as string;

            const uuidRegex = /replyTo:\s*([a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12})\s*---\s*/g;
            const uuidMatch = uuidRegex.exec(comment.says);
            console.log({ match: uuidMatch });
            if (uuidMatch) {
                comment.replyTo = uuidMatch[1] || "";
                comment.says = comment.says.replace(uuidRegex, "");
                // comment.to = this.props.visitorsIndex[uuidMatch[1]];
            }
        }

        this.onCommiting();
        postComment(comment).then(d => this.onCommitSucced());

    }

    render() {
        return <form onSubmit={e => this.onSubmit(e)} id="commentForm" className="mb-4">
            <div className="mb-2">
                <Input name="nickName" placeHolder="昵称" />
                <Input type="email" name="email" placeHolder="电子邮件" />
                <Input name="website" placeHolder="网站（选填）" />
            </div>
            <textarea
                id="commentFormInput"
                name="says"
                placeholder="评论内容"
                spellCheck={false}
                rows={8}
                className="border-greenandgray-base01 border-2 rounded-none resize-none outline-none p-1 w-full mb-2 text-greenandgray-base01"
            />
            <HoverTransitionButton onClick={() => { }} text={this.state.buttonText} />
        </form>;
    }
}

class CommentHeader extends React.Component<{ from: IVisitor, to?: IVisitor }> {

    render() {
        const sender = this.props.from;
        const recipient = this.props.to;

        let senderHeader = (
            <span className="text-greenandgray-base02 mr-2">
                <HoverTransitionLink href={sender.website || "#"}>
                    {sender.nickName}
                </HoverTransitionLink>
            </span>
        );

        let recipientHeader = undefined;
        if (this.props.to) {
            recipientHeader = (
                <span>
                    <span className="text-greenandgray-base01 mr-2">说给</span>
                    <span className="text-greenandgray-base02">
                        <HoverTransitionLink href={recipient?.website || "#"} >
                            {recipient?.nickName}
                        </HoverTransitionLink>
                    </span>
                </span>
            );
        }

        let commentHeaderEle = <div className="mb-2">
            {senderHeader}{recipientHeader}
        </div>;

        return commentHeaderEle;
    }

}

class Comment extends React.Component<{ comment: IComment, replies?: IComment[], visitorsIndex: VisitorsIndex }, {}> {

    reply(uuid: string) {
        const commentFormId = "commentFormInput"
        window.location.hash = `#${commentFormId}`;
        let commentFormInputEle = document.getElementById(commentFormId);
        if (commentFormInputEle instanceof HTMLTextAreaElement) {
            commentFormInputEle.value = `replyTo: ${uuid}\n---\n`;
        }
    }

    render() {

        const sender = this.props.comment.from;
        const recipient = this.props.comment.to ||
            this.props.visitorsIndex[this.props.comment.replyTo || "#"] ||
            undefined;
        
        const senderAvatar = avatarSimplify(sender.avatar || "http://gravatar.com/avatar/0");

        return <div className="flex mt-8">
            <div className="min-w-max">
                <a className="min-w-max" href={sender.website || "#"}><img className="rounded-full w-10 h-10 mr-2" src={senderAvatar} /></a>
            </div>
            <div>
                <div>
                    <CommentHeader 
                        from={sender} 
                        to={recipient} 
                    />
                    <p className="text-greenandgray-base01 mb-2">{this.props.comment.says}</p>
                    <ShowDate dateTime={this.props.comment.at} />
                    <HoverTransitionButton onClick={() => this.reply(this.props.comment.uuid)} text="回复" />
                </div>
                {this.props.replies?.map(reply => <Comment visitorsIndex={this.props.visitorsIndex} key={reply.uuid} comment={reply} />)}
                {this.props.comment.replies?.map(reply => <Comment visitorsIndex={this.props.visitorsIndex} key={reply.uuid} comment={reply} />)}
            </div>
        </div>;
    }
}


class CommentPage extends React.Component<ICommentsPageProps, {}> {

    makeTree(rootComment: IComment, commentIndex: CommentsIndex): void {
        rootComment.replies = [];
        const uuidOfReplies = (rootComment.uuidOfReplies) || [];
        for (const uuidOfReply of uuidOfReplies) {
            const replyComment = commentIndex[uuidOfReply];
            if (replyComment) {
                rootComment.replies.push(replyComment);
            }
        }

        rootComment.replies.forEach(replyOfRootComment => {
            this.makeTree(replyOfRootComment, commentIndex);
        });
    }

    process(comments: IComment[]): IComment[] {
        let rootComments = comments.filter(comment => {
            if (comment?.replyTo) {
                return false;
            }
            else {
                return true;
            }
        });

        rootComments.forEach(rootComment => {
            this.makeTree(rootComment, this.props.commentsIndex);
        })

        return rootComments;
    }

    render() {

        const rootComments = this.process(this.props.comments);
        const commentsEle = rootComments.map(comment => {
            return <Comment visitorsIndex={this.props.visitorsIndex} key={comment.uuid} comment={comment} />;
        });

        return <Layout
            blogBasicMetaData={this.props.blogBasicMetaData}
        >
            <ul className="mb-8">
                {commentsEle}
            </ul>
            <CommentForm
                commentsIndex={this.props.commentsIndex}
                visitorsIndex={this.props.visitorsIndex}
            />
        </Layout>;
    }

}

export default CommentPage;
