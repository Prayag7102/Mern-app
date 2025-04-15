import { useState, useEffect } from 'react';
import { getAllProducts } from '../api/products';
import { handleDelete, handleEditSave } from '../utils/productUtils';
import { toast } from 'react-toastify';

export const useProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModel, setFilterModel] = useState({ items: [] });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((product) => product._id === id);
    setSelectedProduct(productToEdit);
    setEditModalOpen(true);
  };

  const handleProductDelete = (id) => handleDelete(id, setProducts, toast);
  
  const handleProductEdit = () => handleEditSave(selectedProduct, setProducts, setEditModalOpen, toast);

  const getFilteredProducts = () => {
    return products.filter((product) => {
      const name = product.name || "";
      const description = product.description || "";
      const price = product.price?.toString() || "";
  
      return (
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        price.includes(searchQuery)
      );
    });
  }

  return {
    products,
    selectedProduct,
    editModalOpen,
    searchQuery,
    filterModel,
    setSelectedProduct,
    setEditModalOpen,
    setSearchQuery,
    setFilterModel,
    handleEdit,
    handleProductDelete,
    handleProductEdit,
    getFilteredProducts,
  };
}; 