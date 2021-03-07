import React from "react";
import publicstyles from '../../styles/Public.module.scss'
import styles from '../../styles/Friend.module.scss'
import Layout from '../../components/Layout';

export async function getStaticProps(): Promise< { props: IFriendProps } > {

    const giteeUrl = "https://gitee.com/hsiaofongw/helloworld/raw/master";
    const dataUrl = `${giteeUrl}/cards.json`;
    const blogBasicMetaDataUrl = `${giteeUrl}/blog-basic-metadata.json`;
    
    const cardData = await fetch(dataUrl).then(d => d.json());
    const blogBasicMetaData = await fetch(blogBasicMetaDataUrl).then(d => d.json());

    return { props: { cardData, blogBasicMetaData }};
}

class CardDetail extends React.Component<ICardData, {}> {
    render() {
        const title = this.props.title;
        const description = this.props.description;
        const addDate = this.props.addDate;
        const link = this.props.link;

        return <ul className={publicstyles.articlelist}><li>
            <a href={link} target="_blank">
                <h2>{title}</h2>
                <div className={styles.description}>{description}</div>
                <time dateTime={addDate} >{addDate+" 添加"}</time>
            </a>
        </li></ul>;

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

            return <a 
                className={cName}
                key={card.link} 
                href={card.link}
                onMouseOver={e => this.onMouseOver(card.link)}
                onMouseLeave={e => this.onMouseLeave()}
            >
                <img className={styles.avatar} src={card.avatar} alt="avatar" />
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

        return <Layout title="友链" pageName={pageName} blogBasicMetaData={this.props.blogBasicMetaData} >
            <main className={styles.main}>
                {avatars}
                {detail}
            </main>
        </Layout>;
    }

}

export default Friend;
