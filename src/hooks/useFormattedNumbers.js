export default function useFormattedNumbers() {

    const getFormattedAmount = (value) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    };

    const getChangeInPercentage = (oldNumber, newNumber) => {
        let difference = oldNumber - newNumber;
    
        return (difference / oldNumber) * 100;
    };

    const getFormattedAmountWithDivision = (value) => {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value / 10000);
    };

    return { getFormattedAmount, getChangeInPercentage, getFormattedAmountWithDivision };
}