import React from "react";
import { FriendExcerpt } from "../../components/FriendExcerpt";
import Layout from "../../components/Layout";
import { getDataForFriendPage } from '../../helpers/blogDataDto';
import { Random } from "../../helpers/random";

export async function getServerSideProps() {
    let [cardData, blogBasicMetaData] = await getDataForFriendPage();

    cardData = Random.shuffle(cardData);

    return { props: { cardData, blogBasicMetaData }};
}

class Friend extends React.Component<IFriendProps, {}> {

    render() {
        let friends = this.props.cardData.map(card => <FriendExcerpt key={card.link} {...card} />);

        return <Layout blogBasicMetaData={this.props.blogBasicMetaData}>
            <ul className="mb-6">
                {friends}
            </ul>
        </Layout>;
    }

}

export default Friend;
