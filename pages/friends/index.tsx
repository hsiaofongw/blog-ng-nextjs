import React from "react";
import { FriendExcerpt } from "../../components/FriendExcerpt";
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

        return <div className="mx-auto p-4 max-w-3xl">
            <h1 className="text-2xl mb-4">探索子</h1>
            <nav className="mb-4">
                <ul>
                    <li className="inline mr-2"><a href="/">文章</a></li>
                    <li className="inline mr-2"><a href="/friends">友链</a></li>
                    <li className="inline mr-2"><a href="/abouts">关于</a></li>
                </ul>
            </nav>
            <ul className="mb-6">
                {friends}
            </ul>
        </div>
    }

}

export default Friend;
