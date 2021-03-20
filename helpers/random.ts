export class Random {
    static getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    static shuffle<T>(l: T[]) {
        const n = l.length;
        for (let i = 0; i < n; i++) {
            const choose = Random.getRandomIntInclusive(i, n-1);
            const temp = l[i];
            l[i] = l[choose];
            l[choose] = temp;
        }
    }
}