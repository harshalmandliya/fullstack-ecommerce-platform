import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";
const ProductCard = ({
    productId,
    productName,
    image,  
    description,
    quantity,
    price,
    discount,
    specialPrice
}) => {
    const [openProductViewModal, setOpenProductViewModal] = useState(false);
    const btnLoader=false;
    const [selectedViewProduct, setSelectedViewProduct]=useState("");
    const isAvailable=quantity && Number(quantity)>0;
    const handleProductView=(product)=>{
        setSelectedViewProduct(product);
        setOpenProductViewModal(true);
    }

    return (
        <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
            <div onClick={()=>{
            handleProductView({ id:productId, productName, image, description, quantity, price, discount, specialPrice });

            } } className="w-full overflow-hidden aspect-[3/2]">
                <img src={image} alt={productName} className="w-full h-full cursor-pointer transition-transform duration-300 hover:scale-105"/>
            </div>
         <div className="p-4">
            <h2 onClick={()=>{
                handleProductView({ id:productId, productName, image, description, quantity, price, discount, specialPrice });
            }} className="text-lg font-semibold mb-2 cursor-pointer">
                {productName}
            </h2>
            <div className="min-h-20 max-h-20">
                <p className="text-gray-600 text-sm">{description}</p>
            </div>
            <div className="flex item-center justify-between">
            {specialPrice?( <div className="flex flex-col">
                <span className="text-grey-700 line-through">${Number(specialPrice).toFixed(2)}</span>
                 <span className="text-xl font-bold text-slate-700">${Number(specialPrice).toFixed(2)}</span>
            </div>): (
                <span className="text-grey-700">${Number(price).toFixed(2)}</span>
            )}
            <button disabled={!isAvailable || btnLoader}
            onClick={()=>{}}
            className={`bg-blue-500 text-white items-center transition-colors py-2 px-3 py-1 rounded-lg text-sm duration-300 w-36 flex justify-center
                ${isAvailable ? 'hover:bg-blue-600' : 'opacity-50'}`}>
                    <FaShoppingCart className="mr-2" />
                {isAvailable?"Add to Cart":"Out of Stock"}
            </button>
            </div>
         </div>
         <ProductViewModal 
         open={openProductViewModal} 
         setOpen={setOpenProductViewModal} 
         product={selectedViewProduct}
         isAvailable={isAvailable}
         />
        </div>
    )
}

export default ProductCard