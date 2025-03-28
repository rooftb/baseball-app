'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import GameCard from './components/GameCard';
import { DataType } from '../interfaces/types';
// import Parlay from "./components/Parlay";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Home() {
  const [data, setData] = useState<DataType>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const [year, setYear] = useState(new Date().getFullYear());
  const [calendarDate, setCalendarDate] = useState<Date | null>(new Date());

  useEffect(() => {
    setDay(calendarDate.getDate());
    setMonth(calendarDate.getMonth() + 1);
    setYear(calendarDate.getFullYear());
  }, [calendarDate]);

  useEffect(() => {
    fetch(
      `https://us-central1-bet-baseball.cloudfunctions.net/get_top_vs_bottom_matchups?schedule_date=${year}-${month}-${day}&ranking_date=2024-09-01&odds_date=${year}-${month}-${day}`
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

        <span>{calendarDate.toLocaleDateString('en-US')}</span>

        {error && <p>{error}</p>}

        {data.matchups ? (
          data.matchups.map((item, i) => (
            <GameCard key={i} index={i} data={data} />
          ))
        ) : (
          <p>No data available.</p>
        )}

        {data.matchups && data.matchups.length === 0 && <p>No games found.</p>}

        {/* <Parlay data={data} /> */}
      </main>
    </div>
  );
}
