import React from "react";
import publicstyles from '../../styles/Public.module.scss'
import styles from '../../styles/Friend.module.scss'
import Layout from '../../components/Layout';
import { getDataForFriendPage } from '../../helpers/blogDataDto';

export async function getStaticProps() {

    const [cardData, blogBasicMetaData] = await getDataForFriendPage();

    return { props: { cardData, blogBasicMetaData }};
}

function avatarSimplify(link: string) {
    const apiEndPoint = "https://webimagecache.vercel.app";
    const apiPath = "/api/avatar";

    let url = new URL(`${apiEndPoint}${apiPath}`);
    url.searchParams.append("link", link);

    return url.toString();
}

function getPreviewURL(link: string) {
    // const apiEndPoint = "https://websitepreview.vercel.app";
    // const apiEndPoint = "http://localhost:3001";
    const apiEndPoint = "https://webimagecache.exploro.one";
    const apiPath = "/api/preview";

    let url = new URL(`${apiEndPoint}${apiPath}`);
    url.searchParams.append("link", link);

    return url.toString();
}

class CardDetail extends React.Component<ICardData, {}> {


    onClick(link: string) {
        window.open(link, '_blank');
    }

    render() {
        const title = this.props.title;
        const description = this.props.description;
        const addDate = this.props.addDate;
        const link = this.props.link;
        const previewLink = getPreviewURL(link);

        return <div key={link} onClick={e => this.onClick(link)} className={styles.carddetail}>
            <h2>{title}</h2>
            <div className={styles.description}>{description}</div>
            <time dateTime={addDate} >{addDate+" 添加"}</time>
        </div>;

    }
}

class Avatars extends React.Component<{ cards: ICardData[], hasSelected: (link: string) => void, unselect: () => void }, IFriendState > {

    constructor(props: { cards: ICardData[], hasSelected: (link: string) => void, unselect: () => void }) {
        super(props);

        this.state = {
            "selected": undefined,
            "cardIdxes": {},
            "cards": []
        };
    }

    onMouseOver(link: string) {
        this.setState({
            "selected": link
        }, () => this.props.hasSelected(link));
    }

    onMouseLeave() {
        this.setState({
            "selected": undefined
        }, () => this.props.unselect());
    }

    render() {
        const imgs = this.props.cards.map(card => {

            let cName = styles.avatarcontainer;
            if (this.state.selected) {
                if (card.link === this.state.selected) {
                    cName = styles.selectedavatarcontainer;
                }
            }

            const avatar = avatarSimplify(card.avatar);

            return <a 
                className={cName}
                key={card.link} 
                href={card.link}
                onMouseOver={e => this.onMouseOver(card.link)}
                onMouseLeave={e => this.onMouseLeave()}
            >
                <img className={styles.avatar} src={avatar} alt="avatar" />
            </a>;
        });

        const avatars = <div className={styles.avatars}>{imgs}</div>;

        return avatars;
    }

}

class Friend extends React.Component<IFriendProps, IFriendState> {

    constructor(props: IFriendProps) {
        super(props);

        this.state = {
            "selected": undefined,
            "cardIdxes": {},
            "cards": []
        };
    }

    componentDidMount() {
        let cards = this.props.cardData;
        this.shuffle(cards);

        let cardIdx: { [key: string]: ICardData | undefined } = {};
        for (const card of cards) {
            const key = card.link;
            cardIdx[key] = card;
        }
        this.setState({
            "cardIdxes": cardIdx,
            "cards": cards
        });
    }

    getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    shuffle(cards: ICardData[]) {
        const n = cards.length;
        for (let i = 0; i < n; i++) {
            const choose = this.getRandomIntInclusive(i, n-1);
            const temp = cards[i];
            cards[i] = cards[choose];
            cards[choose] = temp;
        }
    }

    hasSelected(link: string) {
        this.setState({
            "selected": link
        });
    }

    unselect() {
        this.setState({
            "selected": undefined
        });
    }

    render() {
        const pageName= `友链 | ${this.props.blogBasicMetaData.title}`;
        const cards = this.state.cards;
        
        const avatars = <Avatars unselect={() => this.unselect()} hasSelected={link => this.hasSelected(link)} cards={cards} />;

        let detail = undefined;
        if (this.state.selected) {
            const card = this.state.cardIdxes[this.state.selected];
            if (card) {
                detail = <CardDetail {...card} />;
            }
        }

        let detailList = <div>
            {cards.map(x => <CardDetail {...x} />)}
        </div>;

        return <Layout title="友链" pageName={pageName} blogBasicMetaData={this.props.blogBasicMetaData} >
            <main className={styles.main}>
                {avatars}
                {detail}
                {detailList}
            </main>
        </Layout>;
    }

}

export default Friend;
