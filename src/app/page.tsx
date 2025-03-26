'use client'

import { useState, useEffect } from "react";
import baseballData from '../../public/data.json'
import styles from "./page.module.css";
import GameCard from "./components/GameCard";
import Parlay from "./components/Parlay";

export default function Home() {
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      'https://us-central1-bet-baseball.cloudfunctions.net/get_top_vs_bottom_matchups?schedule_date=2025-03-27&ranking_date=2024-09-01&odds_date=2025-03-27'
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
      .catch((err) => {
        setError(err);
        setLoading(!loading);
      })
  }, []);

  useEffect(() => {

    if (data) {
      console.log(data)
    }

  }, [data])

  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <span>{data.schedule_date}</span>

        {data.matchups && data.matchups.map((item, i) => (
          <GameCard key={i} index={i} data={data} />
        ))}

        {/* <Parlay data={data} /> */}

      </main>
    </div>
  );
}
