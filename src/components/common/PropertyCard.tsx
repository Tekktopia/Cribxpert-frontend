import { PropertyListingProps } from '@/types';
import { Link } from 'react-router';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useSavedList } from '../context/SavedListContext';
const PropertyListingCard:React.FC<PropertyListingProps>= ({
    id,
    propertyName,
price,
rating,
description,
location,
image,

}) =>{
    const{addList,savedList,removeList}=useSavedList() 
    const isSavedProperty=savedList.some((savedProperty)=>savedProperty.id===id)
    const handleIconToggle=()=>{
        if(isSavedProperty){
            removeList({id,propertyName,price,location,rating,description,image})
            console.log("removed")
        }
            else{
                addList({id,propertyName,price,location,rating,description,image})
                console.log("added")
            }
    }
    
    return(
        
<Link to ="/propertydetail">

<div className="w-[305px] h-[347px] hover:cursor-pointer" >
    <div className="relative">
    <img src={image}  className="w-full h-[230px]" />
    <div className="flex justify-end absolute top-2 right-4 ">
        {isSavedProperty ? (
                        <FaHeart className="w-6 h-6 text-black" onClick={handleIconToggle}/>
        ) : (
            <CiHeart className="w-6 h-6 " onClick={handleIconToggle}/>

        )
    }

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