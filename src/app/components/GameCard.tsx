import React, { useEffect, useRef } from 'react'
import styles from "../page.module.css";
import { GameCardType } from '../interfaces/types';
import { convertToMoneyline } from '../utils/functions';

export default function GameCard({ data, index }: GameCardType) {

    return (
        <div className={styles.cta}>
            <table>
                <tbody>
                    <tr><td>{new Date(data.matchups[index].game_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
                        <td className={styles.odds}>ML</td>
                        <td className={styles.rank}>Rank</td>
                    </tr>
                    <tr>
                        <td className={styles.teamName}>{data.matchups[index].home_team}</td>
                        <td className={styles.odds}><span>{convertToMoneyline(data.matchups[index].odds[4].markets[0].outcomes[1].price)}</span></td>
                        <td className={styles.rank}>{data.matchups[index].home_team_rank}</td>
                    </tr>
                    <tr>
                        <td className={styles.teamName}>{data.matchups[index].away_team}</td>
                        <td className={styles.odds}> {convertToMoneyline(data.matchups[index].odds[4].markets[0].outcomes[0].price)}</td>
                        <td className={styles.rank}>{data.matchups[index].away_team_rank}</td>
                    </tr>
                </tbody>
            </table >
        </div >
    )
}
