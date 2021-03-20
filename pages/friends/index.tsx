import React from "react";
import { FriendExcerpt } from "../../components/FriendExcerpt";
import Layout from "../../components/Layout";
import { getDataForFriendPage } from '../../helpers/blogDataDto';
import { Random } from "../../helpers/random";

export async function getServerSideProps() {

    const [cardData, blogBasicMetaData] = await getDataForFriendPage();

    return { props: { cardData, blogBasicMetaData }};
}

class Friend extends React.Component<IFriendProps, IFriendState> {

    render() {
        let cardData = this.props.cardData;
        Random.shuffle<ICardData>(cardData);

        const friends = cardData.map(card => {
            return <FriendExcerpt 
                key={card.link}
                title={card.title}
                description={card.description}
                link={card.link}
                addDate={card.addDate}
                avatar={card.avatar}
            />
        });

        return <Layout blogBasicMetaData={this.props.blogBasicMetaData}>
            <ul className="mb-6">
                {friends}
            </ul>
        </Layout>;
    }

}

export default Friend;
