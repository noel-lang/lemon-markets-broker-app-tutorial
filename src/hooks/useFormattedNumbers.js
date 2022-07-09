export default function useFormattedNumbers() {

    const getChangeInPercentage = (currentPrice, averageBuyPrice) => {
        let difference = currentPrice - averageBuyPrice;
    
        return (difference / currentPrice) * 100;
    };

    const getFormattedAmount = (value) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    };

    const getFormattedAmountWithDivision = (value) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value / 10000);
    };

    return { getChangeInPercentage, getFormattedAmount, getFormattedAmountWithDivision };
}