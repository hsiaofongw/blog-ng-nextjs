export class Random {
    static getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    static shuffle<T>(l: T[]): T[] {
        const n = l.length;
        let l1 = Array.from(l);
        for (let i = 0; i < n; i++) {
            const choose = Random.getRandomIntInclusive(i, n-1);
            const temp = l1[i];
            l1[i] = l1[choose];
            l1[choose] = temp;
        }

        return l1;
    }
}