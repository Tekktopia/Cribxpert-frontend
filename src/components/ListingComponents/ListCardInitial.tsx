/* component card for 1st time users*/
interface ListCardInitialProps {
    title: string
    description: string
    image: string
    index: number;
}

 const ListCardInitial: React.FC<ListCardInitialProps> = ({ title, description, image, index }) => {
  return (
    <div className="flex gap-8  items-start">
      <img
        src={image}
        alt={title}
        className="w-16 h-16 object-cover flex-shrink-0"
      />
      <div className="">
        <h2 className="text-2xl font-semibold mb-2">
          <span className="font-bold mr-2">{index + 1}.</span>
          {title}
        </h2>
        <p className="text-gray-600 max-w-xs">{description}</p>
      </div>
    </div>
  );
};

export default ListCardInitial