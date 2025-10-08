import normal from '../../../../public/other-icons/search-normal.png';

interface ListingSearchProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

const ListingSearch: React.FC<ListingSearchProps> = ({ onChange, value }) => (

        <div className="flex items-center gap-2 border px-3 py-1 rounded-lg cursor-pointer  bg-gray-200 ">
          <img src={normal} alt="search" className="w-[15px] object-contain" />
         
          <input className="text-md w-full  bg-gray-200 focus:outline-none "
           type="text" value={value} onChange={onChange}   placeholder='Search'/>
        </div>
      
)

export default ListingSearch
