function formatMoney(amountCents) {
    if (amountCents >= 0) {
        return `$${(amountCents / 100).toFixed(2)}`;
    } else if (amountCents < 0) {
        return `-$${((amountCents * -1) / 100).toFixed(2)}`;
    }
}
export default formatMoney;
