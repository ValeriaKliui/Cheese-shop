import { useState } from "react"

function useCard() {
    const [itemsChoosen, setItemsChoosen] = useState([]);
    const totalPrice = itemsChoosen.reduce((accum, curr) => accum + +curr.cost, 0);
    return { itemsChoosen, setItemsChoosen, totalPrice }
}
export default useCard