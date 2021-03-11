import md5 from 'md5';

export function avatarSimplify(link: string) {
    const apiEndPoint = "https://webimagecache.vercel.app";
    const apiPath = "/api/avatar";

    let url = new URL(`${apiEndPoint}${apiPath}`);
    url.searchParams.append("link", link);

    return url.toString();
}

export function getGravatar(email: string): string {

    const emailMD5 = md5(email);
    const gravatarAPI = "https://www.gravatar.com/avatar/";

    return `${gravatarAPI}${emailMD5}`;
}