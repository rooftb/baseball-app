export function convertToMoneyline(decimalOdds: number = 0) {
    if (decimalOdds <= 1) {
        return "Invalid Input";
    }

    if (decimalOdds >= 2) {
        return "+" + Math.round((decimalOdds - 1) * 100);
    } else {
        return Math.round(-100 / (decimalOdds - 1));
    }
}

export function calculateWinnings(betAmount: number, odds: number) {
    if (odds > 0) {
        return (betAmount * (odds / 100)).toFixed(2);
    } else if (odds < 0) {
        return (betAmount / (Math.abs(odds) / 100)).toFixed(2);
    } else {
        return "Invalid odds";
    }
}