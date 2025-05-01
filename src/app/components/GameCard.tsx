import React, { useEffect, useState } from 'react';
import styles from '../page.module.css';
import { GameCardType } from '../interfaces/types';
import { convertToMoneyline } from '../utils/functions';

export default function GameCard({ data, index }: GameCardType) {
  const [homeTeamOdds, setHomeTeamOdds] = useState<number>();
  const [awayTeamOdds, setAwayTeamOdds] = useState<number>();

  useEffect(() => {
    if (data.matchups[index].odds[3]) {
      setHomeTeamOdds(
        data.matchups[index].odds[3].markets[0].outcomes.filter(o => o.name === data.matchups[index].home_team)[0].price
      );
      setAwayTeamOdds(
        data.matchups[index].odds[3].markets[0].outcomes.filter(o => o.name === data.matchups[index].away_team)[0].price
      );
    }
  }, [data]);

  return (
    <div className={styles.gameCard}>
      <table>
        <tbody>
          <tr>
            <td>
              {new Date(data.matchups[index].game_time).toLocaleTimeString(
                'en-US',
                { hour: '2-digit', minute: '2-digit' }
              )}
            </td>
            <td className={styles.odds}>ML</td>
            <td className={styles.rank}>Rank</td>
            <td>SP</td>
            <td className={styles.rank}>ERA</td>
            <td className={styles.rank}>IP</td>
          </tr>
          <tr>
            <td className={styles.teamName}>
              {data.matchups[index].home_team}
            </td>
            <td className={styles.odds}>
              <span>
                {homeTeamOdds ? convertToMoneyline(homeTeamOdds) : 'N/A'}
              </span>
            </td>
            <td className={styles.rank}>
              {data.matchups[index].home_team_rank}
            </td>
            <td className={styles.pitcherName}>
              {data.matchups[index].home_pitcher.name}
            </td>
            <td className={styles.rank}>
              {data.matchups[index].home_pitcher.era}
            </td>
            <td className={styles.rank}>
              {data.matchups[index].home_pitcher.inningsPitched}
            </td>
          </tr>
          <tr>
            <td className={styles.teamName}>
              {data.matchups[index].away_team}
            </td>
            <td className={styles.odds}>
              {' '}
              {awayTeamOdds ? convertToMoneyline(awayTeamOdds) : 'N/A'}
            </td>
            <td className={styles.rank}>
              {data.matchups[index].away_team_rank}
            </td>
            <td className={styles.pitcherName}>
              {data.matchups[index].away_pitcher.name}
            </td>
            <td className={styles.rank}>
              {data.matchups[index].away_pitcher.era}
            </td>
            <td className={styles.rank}>
              {data.matchups[index].away_pitcher.inningsPitched}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
