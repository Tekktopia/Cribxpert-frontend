import { PropertyListingProps } from "../interface";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
const PropertyListingCard:React.FC<PropertyListingProps>= ({
    propertyName,
price,
rating,
description,
location,
image,

}) =>{
    return(
        
<Link to="/propertydetail">
<div className="w-[305px] h-[347px] hover:cursor-pointer" >
    <div className="relative">
    <img src={image} alt="Property Image" className="w-full h-[230px]" />
    <div className="flex justify-end absolute top-2 right-4 ">
<CiHeart className="w-6 h-6 text-black"/>
    </div>
    </div>

<div className="flex flex-row justify-around mt-2 ">
<p className="font-[400] text-[16px] mb-2">{propertyName}</p>
<p className="font-[400] text-[14px]">⭐{rating}</p>
</div>
<div className="flex flex-col space-y-2">
<p className="font-[400] text-[14px]">{location}</p>
<p className="font-[400] text-[14px]">{description}</p>
<p><strong className="font-[7000]">NGN {price}</strong>/night</p>
</div>
</div>
     </Link>
       
     

        

    )
}
export default PropertyListingCard