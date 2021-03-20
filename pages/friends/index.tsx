import React from "react";
import { FriendExcerpt } from "../../components/FriendExcerpt";
import Layout from "../../components/Layout";
import { getDataForFriendPage } from '../../helpers/blogDataDto';
import { Random } from "../../helpers/random";

export async function getStaticProps() {
    const [cardData, blogBasicMetaData] = await getDataForFriendPage();
    return { props: { cardData, blogBasicMetaData }};
}

class Friend extends React.Component<IFriendProps, IFriendState> {

    constructor(props: IFriendProps) {
        super(props);

        this.state = {
            cards: this.props.cardData
        };
    }

    render() {
        let friends = [];
        const n = this.state.cards.length;
        for (let i = 0; i < n; i++) {
            const card = this.state.cards[i];
            friends.push(
                <FriendExcerpt 
                    key={card.link}
                    title={card.title}
                    description={card.description}
                    link={card.link}
                    addDate={card.addDate}
                    avatar={card.avatar}
                />
            )
        }

        return <Layout blogBasicMetaData={this.props.blogBasicMetaData}>
            <ul className="mb-6">
                {friends}
            </ul>
        </Layout>;
    }

}

export default Friend;
