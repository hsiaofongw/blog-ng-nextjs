import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { postComment } from '../helpers/blogDataDto';
import { HoverTransitionButton } from './Button';
import { HoverTransitionLink } from './Link';
import { avatarSimplify } from '../helpers/avatar';
import { ShowDate } from './ShowDate';

export class Input extends React.Component<{ placeHolder: string, name: string, type?: string }, {}> {
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

export class CommentForm extends React.Component<ICommentFormProps, { buttonText: string }> {

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
            uuidOfReplies: [],
            location: this.props.location
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
                <Input type="email" name="email" placeHolder="邮箱" />
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

export class CommentHeader extends React.Component<{ from: IVisitor, to?: IVisitor }> {

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

export class Comment extends React.Component<{ comment: IComment, replies?: IComment[], visitorsIndex: VisitorsIndex }, {}> {

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
