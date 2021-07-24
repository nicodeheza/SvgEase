
export default function pesosToDolar(price, usaToArs){

    const tax= usaToArs * 65 / 100;
    const oneDolar= usaToArs + tax;
    return price / oneDolar;
}