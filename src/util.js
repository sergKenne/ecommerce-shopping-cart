export function formatPrice(price)  {
    return `$ ${ Number(price.toFixed(2) ).toLocaleString() + "  " }`;
}