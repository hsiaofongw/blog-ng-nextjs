import React from "react";
import Layout from "../../components/Layout";
import { getDataForCommentsPage } from "../../helpers/blogDataDto";
import { Comment } from '../../components/Comment';
import { CommentForm } from '../../components/Comment';

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
                location="/comments"
            />
        </Layout>;
    }

}

export default CommentPage;
