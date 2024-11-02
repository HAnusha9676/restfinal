import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";

function NonVeg(){
    const nonVegProducts=useSelector(state=>
        state.products.nonVeg
    )
    const dispatch=useDispatch()
    const items=nonVegProducts.map((product,index)=>(
        <li key={index}> name:{product.name},price:{product.price.toFixed()}
        <button onClick={()=>dispatch(addToCart(product))}>add to cart</button>
        </li>

    ));
    return(
        <>
        <h3>non-veg products</h3>
        <ul>{items}</ul>
        </>
    )
}
export default NonVeg;