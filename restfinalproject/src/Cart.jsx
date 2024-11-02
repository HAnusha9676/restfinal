import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, removeItem } from "./Store"; // Adjust the import path based on your file structure
import { useState } from "react";


function Cart() {
    // Use the selector to get the cart items from the Redux store
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();
  
    // Map through the items to display them or show a message if the cart is empty
    const itemsList = cartItems.length > 0 ? (
        cartItems.map((item) => (
            <li key={item.name}>
                {item.name}, ${(item.price * item.quantity).toFixed(2)}, Quantity: {item.quantity}
                <button onClick={() => dispatch(increment({ name: item.name }))}>+1</button>
                <button onClick={() => dispatch(decrement({ name: item.name }))}>-1</button>
                <button onClick={() => dispatch(removeItem({ name: item.name }))}>Remove</button>
            </li>
        ))
    ) : (
        "Cart is empty"
    );

    // Discount
    const [disperce, setDisPerc] = useState(0);
    
    const handleDisPercentage = (dvalue) => {
        setDisPerc(dvalue / 100); // Store as a fraction for calculations
    };

    //apply coupon
   const[couponCode,setCouponCode]=useState('');
    const[coupondiscPercentage,setCoupondiscPercentage]=useState(0);
    const handleApplyCoupon=()=>{
        switch(couponCode){
            case "anii10":
                setCoupondiscPercentage(10);
                break;

             case "anii20":
                setCoupondiscPercentage(20);
                break;
            case "aniii30":
                setCoupondiscPercentage(30);
                break;
            default:
                alert('Invalid coupon') 
                setCoupondiscPercentage(0); 


        }
    };
  
    const calculateTotal = () => {
        const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const disAmount = total * disperce;
        const couponAmount = total * (coupondiscPercentage / 100);
        const netAmount = total - disAmount - couponAmount;

        return {
            total,
            disAmount,
            couponAmount,
            netAmount
        };
    };

    const { total, disAmount, couponAmount, netAmount } = calculateTotal();
    return (
        <>
            <h2>This is the cart page</h2>
            <ul>{itemsList}</ul>
            <h2>Total before discount: ${total.toFixed(2)}</h2>
            <button onClick={() => handleDisPercentage(10)}>Apply 10%</button>
            <button onClick={() => handleDisPercentage(20)}>Apply 20%</button>
            <button onClick={() => handleDisPercentage(30)}>Apply 30%</button>
            <h2>Discount percentage: {disperce * 100}%</h2>
            <h2>Discount Amount: ${disAmount.toFixed(2)}</h2>
            <h2>Apply coupon</h2>
            <input 
                type="text" 
                value={couponCode} 
                onChange={(e) => setCouponCode(e.target.value)} 
                placeholder="Enter coupon code" 
            />
            <button onClick={handleApplyCoupon}>Apply coupon</button>
            <h2>Coupon Amount: ${couponAmount.toFixed(2)}</h2>
            <h2>Net Amount: ${netAmount.toFixed(2)}</h2>

            
        </>
    );
}

export default Cart;
