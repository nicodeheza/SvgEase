import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPal({cartProducts, setFloatWin, clearCart, router}){
   
    function createOrder(data, actions){
        const products= [];
        cartProducts.forEach(ele=>{
            const obj={
                reference_id: ele._id,
                amount:{
                    currency_code: "USD",
                    value: ele.price.toString()
                }
            }
            products.push(obj);
        });
        
        console.log(products);
        return actions.order.create({
            purchase_units: products
        });

    }

    function onApprove(data, actions){
        console.log('approve');
        return actions.order.capture().then((details)=>{
            console.log(details);
            let productsId= [];
            details.purchase_units.forEach(ele=>{
                productsId.push(ele.reference_id);
            });
            fetch('/api/user/products/add',{
                method:'PUT',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({productsId})
            })
            .then(res=> {
                console.log(res);
                if(res.status === 200){
                    setFloatWin('none');
                    clearCart();
                    router.replace(router.asPath);
                }
            })
            .catch(err=> console.log(err));
        });
    }

    return(
     <PayPalScriptProvider options={{"client-id": "ASL98diggYWYY2kJ7bsd2C-vd0jtbyZscvqZ0SnS-p65g9kd9B73NZM69Dl6GqQ-V8MvmNw6uiNsWzMj"}}>
         <PayPalButtons
         forceReRender={[cartProducts]}
         createOrder={(data, actions)=> createOrder(data, actions)} 
         onApprove={(data, actions)=> onApprove(data, actions)}
         onError={(err)=>console.log(err)}/>
     </PayPalScriptProvider>
    );
}