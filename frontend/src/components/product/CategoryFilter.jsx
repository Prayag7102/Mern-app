const CATEGORIES = [
    { id: 'all', name: 'All Products' },
    { id: 'clothing', name: 'Clothing & Accessories' },
    { id: 'smartphones', name: 'Smartphones' },
    { id: 'electronics', name: 'Electronics' }
  ];
  
  const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {CATEGORIES.map(category => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedCategory === category.id 
              ? 'bg-blue-700 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
  
  export { CATEGORIES };
  export default CategoryFilter;