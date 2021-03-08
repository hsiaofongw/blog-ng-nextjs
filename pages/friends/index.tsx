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
    render() {
        const title = this.props.title;
        const description = this.props.description;
        const addDate = this.props.addDate;
        const link = this.props.link;
        const previewLink = getPreviewURL(link);

        const preview = <img src={previewLink} height={100} />;

        return <div className={styles.carddetailcontainer} >
            <div className={styles.carddetail}>
            <h2>{title}</h2>
            <div className={styles.description}>{description}</div>
            <time dateTime={addDate} >{addDate+" 添加"}</time>
            </div>
            {preview}
        </div>;

    }
}

class Avatars extends React.Component<{ cards: ICardData[], hasSelected: (link: string) => void, unselect: () => void }, IFriendState > {

    constructor(props: { cards: ICardData[], hasSelected: (link: string) => void, unselect: () => void }) {
        super(props);

        this.state = {
            "selected": undefined,
            "cardIdxes": {}
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
            "cardIdxes": {}
        };
    }

    componentDidMount() {
        const cards = this.props.cardData;
        let cardIdx: { [key: string]: ICardData | undefined } = {};
        for (const card of cards) {
            const key = card.link;
            cardIdx[key] = card;
        }
        this.setState({
            "cardIdxes": cardIdx
        });
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
        
        const avatars = <Avatars unselect={() => this.unselect()} hasSelected={link => this.hasSelected(link)} cards={this.props.cardData} />;

        let detail = undefined;
        if (this.state.selected) {
            const card = this.state.cardIdxes[this.state.selected];
            if (card) {
                detail = <CardDetail {...card} />;
            }
        }

        let testCard = <CardDetail {...this.props.cardData[0]} />;

        return <Layout title="友链" pageName={pageName} blogBasicMetaData={this.props.blogBasicMetaData} >
            <main className={styles.main}>
                {avatars}
                {detail}
                {/* {testCard} */}
            </main>
        </Layout>;
    }

}

export default Friend;
