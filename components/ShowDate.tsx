import React from 'react';

export class ShowDate extends React.Component<{dateTime: number}, {}> {

    dateToText(date: number) {
        const dateObj = new Date(date);
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const days = dateObj.getDate();
        const months = dateObj.getMonth()+1;
        const years = dateObj.getFullYear();

        let hoursString = `${hours}`;
        if (hoursString.length === 1) {
            hoursString = `0${hours}`;
        }

        let minutesString = `${minutes}`;
        if (minutesString.length === 1) {
            minutesString = `0${minutes}`;
        }

        const now = new Date().valueOf();
        const msPassed = now - date;
        const oneDayMS = 24 * 60 * 60 * 1000;
        if (msPassed <= oneDayMS) {
            return `${hoursString}:${minutesString}`;
        }
        else if (msPassed > oneDayMS && msPassed <= (2*oneDayMS)) {
            return "昨天";
        }
        else if (msPassed > (2*oneDayMS) && msPassed <= (365*oneDayMS)) {
            return `${months}-${days}`;
        }
        else {
            return `${years}-${months}-${days}`;
        }
    }

    render() {
        const dateTimeObj = new Date(this.props.dateTime);

        return <div className="mb-2 text-sm text-greenandgray-base01">
            <time 
                dateTime={dateTimeObj.toISOString()}
            >
                {this.dateToText(dateTimeObj.valueOf())}
            </time>
        </div>;
    }
}
