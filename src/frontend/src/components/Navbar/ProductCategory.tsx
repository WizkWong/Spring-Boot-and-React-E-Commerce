const ProductCategory = () => {
  const productCategory: string[] = [
    "Sports",
    "Clothes",
    "Accessories",
    "Technology",
  ];

  return (
    <div className="flex items-center bg-gray-100 py-1">
      {productCategory.map((element, index) => (
        <p
          key={index}
          className="px-8 hover:text-black hover:cursor-pointer text-gray-600 font-bold"
        >
          {element}
        </p>
      ))}
    </div>
  );
};

export default ProductCategory;
