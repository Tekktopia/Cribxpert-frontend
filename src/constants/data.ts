import allShortLet from "../assets/icons/all-shorlet.png"
import otherFilterIcon from "../assets/icons/otherFilterIcon.png";
import { PropertyListingProps } from "../components/interface";
import propertyImage from "../assets/images/property-image.jpeg"
const SAMPLE_DATA:PropertyListingProps[]=[
    {
        image:propertyImage,
        propertyName: "Makinwaa’s Cottage - Newly Remodeled-",
        location: "Federal Capital Territory Gombe",
        rating: 4.76,
        price: 620,
         description:"3 bedroom apartment ",
       
      },
      {
image:propertyImage,
        propertyName:"Makinwaa’s Cottage - Newly Remodeled-a",
        location: "Federal Capital Territory Gombe",
        rating: 4.85,
  description:"3 bedroom apartment ",
        price: 750,
        
      },
      {image:propertyImage,

        propertyName:"Makinwaa’s Cottage - Newly Remodeled-",
        location: "Federal Capital Territory Gombe",
        rating: 4.92,
      
        price: 900, 
        description:"3 bedroom apartment "
       
      },
      {
image:propertyImage,
        propertyName: "Makinwaa’s Cottage - Newly Remodeled-",
        location: "Federal Capital Territory Gombe",
        rating: 4.78,
        
        price: 680,
       
        description:"3 bedroom apartment "
      },
      {
image:propertyImage,
        propertyName: "Makinwaa’s Cottage - Newly Remodeled-",
        location: "Federal Capital Territory Gombe",
        rating: 4.88,
       description:"3 bedroom apartment",
        price: 1200,
        
      },
      {
image:propertyImage,
        propertyName:"Makinwaa’s Cottage - Newly Remodeled-",
        location: "Federal Capital Territory Gombe",
        rating: 4.95,
       description:"3 bedroom apartment ",
        price: 2500,
       
      },
      {
image:propertyImage,
        propertyName: "Makinwaa’s Cottage - Newly Remodeled-",
        location: "Federal Capital Territory Gombe",
        rating: 4.81,
       description:"3 bedroom apartment ",
        price: 1500,
        
      },
      {
image:propertyImage,
        propertyName: "Makinwaa’s Cottage - Newly Remodeled-",
        location: "Federal Capital Territory Gombe",
        rating: 4.89,
       description:"3 bedroom apartment ",
        price: 850,
       
      },
      {
image:propertyImage,
        propertyName: "Makinwaa’s Cottage - Newly Remodeled-",
        location: "Federal Capital Territory Gombe",
        rating: 4.83,
       
        price: 720,
        description:"3 bedroom apartment ",
      },
      {
image:propertyImage,
        propertyName: "Makinwaa’s Cottage - Newly Remodeled-",
        location: "Federal Capital Territory Gombe",
        rating: 4.90,
       description:"3 bedroom apartment ",
        price: 780,
    
      } ,
      {image:propertyImage,

        propertyName:"Makinwaa’s Cottage - Newly Remodeled-",
        location: "Federal Capital Territory Gombe",
        rating: 4.92,
      
        price: 900, 
        description:"3 bedroom apartment "
       
      },
      {image:propertyImage,

        propertyName:"Makinwaa’s Cottage - Newly Remodeled-",
        location: "Federal Capital Territory Gombe",
        rating: 4.92,
      
        price: 900, 
        description:"3 bedroom apartment "
       
      },
    ];
  



const Filter=[
    {
name:"All Short-let",
image:allShortLet
} ,
{
    name:"House",
    image:otherFilterIcon
    } ,
    {
        name:"Apartment",
        image:otherFilterIcon
        } ,
        {
            name:"Beach Houses",
            image:otherFilterIcon
            } ,
            {
                name:"Cottage",
                image:otherFilterIcon
                } ,
                {
                    name:"Cabin",
                    image:otherFilterIcon
                    } ,
                    {
                        name:"Beach Houses",
                        image:otherFilterIcon
                        } ,     {
                            name:"Beach Houses",
                            image:otherFilterIcon
                            } ,
                            {
                                name:"Beach Houses",
                                image:otherFilterIcon
                                } ,
                                {
                                    name:"Beach Houses",
                                    image:otherFilterIcon
                                    } , 
                                    {
                                        name:"Beach Houses",
                                        image:otherFilterIcon
                                        } ,
                                        {
                                            name:"Beach Houses",
                                            image:otherFilterIcon
                                            } 
]
 export{SAMPLE_DATA,Filter}