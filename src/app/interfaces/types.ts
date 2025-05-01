export interface GameCardType {
    data: DataType
    index: number
}

export interface DataType {
    date: string
    matchups: Matchup[]
}

export interface Matchup {
    away_team: string
    away_team_rank: number
    away_pitcher: Pitcher
    game_time: string
    home_team: string
    home_team_rank: number
    home_pitcher: Pitcher
    odds: Odd[]
    ranking_diff: number
}

export interface Pitcher {
  era: string
  inningsPitched: string
  name: string
}
export interface Odd {
    key: string
    last_update: string
    markets: Market[]
    title: string
}

export interface Market {
    key: string
    last_update: string
    outcomes: Outcome[]
}

export interface Outcome {
    name: string
    price: number
}