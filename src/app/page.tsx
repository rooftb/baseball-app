'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import GameCard from './components/GameCard';
import { DataType } from './interfaces/types';
// import Parlay from './components/Parlay';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Home() {
  const [data, setData] = useState<DataType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const [year, setYear] = useState(new Date().getFullYear());
  const [calendarDate, setCalendarDate] = useState<Date | null>(new Date());

  useEffect(() => {
    const formattedDay =
      calendarDate.getDate() <= 9
        ? '0' + calendarDate.getDate()
        : calendarDate.getDate();

    console.log(formattedDay);

    const formattedMonth =
      calendarDate.getMonth() <= 10
        ? '0' + (calendarDate.getMonth() + 1)
        : calendarDate.getMonth() + 1;

    console.log(formattedMonth);

    console.log(calendarDate);

    setDay(+formattedDay);
    setMonth(+formattedMonth);
    setYear(calendarDate.getFullYear());
  }, [calendarDate]);

  useEffect(() => {
    fetch(
      `https://us-central1-bet-baseball.cloudfunctions.net/get_top_vs_bottom_matchups?schedule_date=${year}-${month}-${day}&ranking_date=${year}-${month}-${day}&odds_date=${year}-${month}-${day}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
        setLoading(!loading);
      });
  }, [year, month, day]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <DatePicker
          selected={calendarDate}
          onChange={(date: Date | null) => setCalendarDate(date)}
        />

        <span>
          {calendarDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>

        {data && data.matchups ? (
          data.matchups
            .sort(
              (a, b) =>
                new Date(a.game_time).valueOf() -
                new Date(b.game_time).valueOf()
            )
            .map((item, i) => <GameCard key={i} index={i} data={data} />)
        ) : (
          <p>Loading...</p>
        )}

        {data && data.matchups && data.matchups.length === 0 && (
          <p>No games found.</p>
        )}

        {error && <p>{error}</p>}

        {/* <Parlay data={data} /> */}
      </main>
    </div>
  );
}
