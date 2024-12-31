import React, { useEffect, useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Autocomplete } from "@mui/material";
import JoditEditor from "jodit-react";

const EditModal = ({ open, onClose, product, setProduct, onSave }) => {
  const [previewImage, setPreviewImage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const [editorContent, setEditorContent] = useState(product?.details || "");

  const editorRef = useRef(null);

  const categoriesOptions = ["Smartphones", "Electronics", "Accessories"];
  const tagsOptions = ["Flagship", "5G", "Android", "Photography"];
  const colorsOptions = ["Phantom Black", "Cream", "Green", "Blue"];
  const sizesOptions = ["264GB", "512GB", "1TB"];
  const featuresOptions = ["S Pen", "Fast Charging", "Waterproof", "Wireless Charging"];

  useEffect(() => {
    if (product?.image && typeof product.image === "string") {
      setPreviewImage(`http://localhost:5000/uploads/${product.image}`);
    } else if (product?.image instanceof File) {
      setPreviewImage(URL.createObjectURL(product.image));
    }

    setSelectedCategories(product?.categories || []);
    setSelectedTags(product?.tags || []);
    setSelectedColors(product?.colors || []);
    setSelectedSizes(product?.sizes || []);
    setSelectedFeatures(product?.features || []);
  }, [product]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleMultiChange = (event, newValue, type) => {
    setProduct({ ...product, [type]: newValue });
    switch (type) {
      case "categories":
        setSelectedCategories(newValue);
        break;
      case "tags":
        setSelectedTags(newValue);
        break;
      case "colors":
        setSelectedColors(newValue);
        break;
      case "sizes":
        setSelectedSizes(newValue);
        break;
      case "features":
        setSelectedFeatures(newValue);
        break;
      default:
        break;
    }
  };

  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
    setProduct({ ...product, details: newContent });
  };

  const handleSpecificationChange = (e) => {
    setProduct({
      ...product,
      specifications: {
        ...product.specifications,
        [e.target.name]: e.target.value,
      },
    });
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-product" aria-describedby="edit-product-details">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl mx-auto mt-16 overflow-y-auto" style={{ maxWidth: "900px", maxHeight: "80vh" }}>
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <TextField label="Name" fullWidth value={product?.name || ""} onChange={(e) => setProduct({ ...product, name: e.target.value })} margin="normal" />
        <TextField label="Description" fullWidth value={product?.description || ""} onChange={(e) => setProduct({ ...product, description: e.target.value })} margin="normal" />
        <TextField label="Price" fullWidth type="number" value={product?.price || ""} onChange={(e) => setProduct({ ...product, price: e.target.value })} margin="normal" />
        <TextField label="Discounted Price" fullWidth type="number" value={product?.discountedPrice || ""} onChange={(e) => setProduct({ ...product, discountedPrice: e.target.value })} margin="normal" />
        <TextField label="Stock" fullWidth type="number" value={product?.stock || ""} onChange={(e) => setProduct({ ...product, stock: e.target.value })} margin="normal" />

        {["categories", "tags", "colors", "sizes", "features"].map((type) => (
          <div key={type} className="mt-4">
            <Autocomplete
              multiple
              freeSolo 
              options={
                type === "categories"
                  ? categoriesOptions
                  : type === "tags"
                  ? tagsOptions
                  : type === "colors"
                  ? colorsOptions
                  : type === "sizes"
                  ? sizesOptions
                  : featuresOptions
              }
              value={
                type === "categories"
                  ? selectedCategories
                  : type === "tags"
                  ? selectedTags
                  : type === "colors"
                  ? selectedColors
                  : type === "sizes"
                  ? selectedSizes
                  : selectedFeatures
              }
              onChange={(event, newValue) => handleMultiChange(event, newValue, type)}
              renderInput={(params) => <TextField {...params} label={type.charAt(0).toUpperCase() + type.slice(1)} margin="normal" />}
            />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4">
          <TextField label="Weight" fullWidth name="weight" value={product?.specifications?.weight || ""} onChange={handleSpecificationChange} />
          <TextField label="Dimensions" fullWidth name="dimensions" value={product?.specifications?.dimensions || ""} onChange={handleSpecificationChange} />
          <TextField label="Material" fullWidth name="material" value={product?.specifications?.material || ""} onChange={handleSpecificationChange} />
          <TextField label="Other" fullWidth name="other" value={product?.specifications?.other || ""} onChange={handleSpecificationChange} />
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-bold">Details</h3>
          <JoditEditor
            ref={editorRef}
            value={product?.details || ""}
            onBlur={handleEditorChange}
            config={{
              readonly: false,
              height: 400,
              uploader: {
                insertImageAsBase64URI: true,
              },
              paste: {
                cleanPasted: false,
                keepStyles: true,
                allow: true,
              },
            }}
          />
        </div>

        <div className="mt-4">
          {previewImage && <img src={previewImage} alt="Preview" className="max-h-32 object-contain mb-4" />}
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <Button variant="contained" color="primary" onClick={onSave} className="mt-6" fullWidth>
          Save Changes
        </Button>
      </div>
    </Modal>
  );
};

export default EditModal;
