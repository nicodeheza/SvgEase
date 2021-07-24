
export default function priceInPesos(price, usaToArs){
    const pesosPrice= price * usaToArs;
    const tax= pesosPrice * 65 / 100;
    const finalPrice= pesosPrice + tax;
    const roundPrice= Math.round( finalPrice * 100) / 100;
    return roundPrice;
}