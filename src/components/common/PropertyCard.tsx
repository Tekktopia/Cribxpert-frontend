import { PropertyListingProps } from "../interface";
const PropertyListingCard:React.FC<PropertyListingProps>= ({
    propertyName,
price,
rating,
description,
location,
image,

}) =>{
    return(
       
<div className="w-[305px] h-[347px]">
<img src={image} alt="Property Image" className="w-full h-[230px]" />
<div className="flex flex-row justify-around mt-2">
<p className="font-[400] text-[16px]">{propertyName}</p>
<p className="font-[400] text-[14px]">⭐{rating}</p>
</div>
<div className="mt-4 flex flex-col gap-3">
<p className="font-[400] text-[14px]">{location}</p>
<p className="font-[400] text-[14px]">{description}</p>
<p><strong className="font-[7000]">NGN {price}</strong>/night</p>
</div>
</div>
        

    )
}
export default PropertyListingCard