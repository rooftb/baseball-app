import { useEffect, useState } from 'react'
import styles from "../page.module.css";
import { convertToMoneyline } from '../utils/functions';
import { GameCardType } from '../interfaces/types';

export default function Parlay({ data, index }: GameCardType) {

    const [favoredTeamOddsArray, setFavoredTeamsOddsArray] = useState();


    useEffect(() => {

        if (!data) { return; }

        if (data !== undefined) {
            console.log(data.matchups + ' parlay component')
        }

    }, [data])



    const [money, setMoney] = useState(10);

    var betcruncher, slip, selections;

    betcruncher = require("../utils/betcruncher");

    slip = {
        type: "single",
        stake: money,
        eachWay: false
    };

    selections = [
        { odds: "+735", terms: "1/4", position: 1 }
    ];

    console.log(betcruncher(slip, selections).returns); // { totalStake: 10, returns: 110, profit: 100 }

    console.log(data)


    useEffect(() => {
        if (data) {
            console.log(data.matchups)
            // console.log('favored team odds array ' + favoredTeamOddsArray)

            // console.log('favored team odds converted to parlay odds ' + +convertToParlayOdds(favoredTeamOddsArray))

            data.matchups.map((item, index) => {

                const home_team = data[index].matchups[0].odds[3].markets[0].outcomes[0].price;
                const away_team = data[index].matchups[0].odds[3].markets[0].outcomes[0].price;

                if (home_team < away_team) {
                    setFavoredTeamsOddsArray(home_team)
                } else {
                    setFavoredTeamsOddsArray(away_team)
                }
            });
        }
    }, [data])


    function convertToParlayOdds(favoredTeamOddsArray: number[]) {
        return favoredTeamOddsArray.reduce((a: number, b: number) => a * b).toFixed(2)
    }

    return (
        <>
            {/* {
                data.matchups && <span>Parlay all {data.matchups.length} ML: {convertToMoneyline(+convertToParlayOdds(favoredTeamOddsArray))}</span>
            } */}
            <span>$<input className={styles.input} name="money" value={money} onChange={(e) => setMoney(+e.target.value)} /> to win ${betcruncher(slip, selections).returns.toFixed(2)}</span>
        </>)

}
