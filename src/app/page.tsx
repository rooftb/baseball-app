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

  const today = new Date();
  const [month, setMonth] = useState(today.toLocaleDateString('en-US', { month: '2-digit' }));
  const [day, setDay] = useState(today.toLocaleDateString('en-US', { day: '2-digit' }));
  const [year, setYear] = useState(today.getFullYear());
  const [calendarDate, setCalendarDate] = useState<Date | null>(new Date());

  useEffect(() => {
    const formattedDay = calendarDate.toLocaleDateString('en-US', { day: '2-digit' });
    const formattedMonth = calendarDate.toLocaleDateString('en-US', { month: '2-digit' });

    setDay(formattedDay);
    setMonth(formattedMonth);
    setYear(calendarDate.getFullYear());
  }, [calendarDate]);

  useEffect(() => {
    fetch(
      `https://us-central1-bet-baseball.cloudfunctions.net/check_firestore_and_return_response?schedule_date=${year}-${month}-${day}`
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
