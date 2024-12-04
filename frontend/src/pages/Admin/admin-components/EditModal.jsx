  import React, { useEffect, useState } from "react";
  import Modal from "@mui/material/Modal";
  import TextField from "@mui/material/TextField";
  import Button from "@mui/material/Button";

  const EditModal = ({ 
    open, 
    onClose, 
    product, 
    setProduct, 
    onSave 
  }) => {
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
      if (product?.image && typeof product.image === "string") {
        setPreviewImage(`http://localhost:5000/uploads/${product.image}`);
      } else if (product?.image instanceof File) {
        setPreviewImage(URL.createObjectURL(product.image));
      }
    }, [product]);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setProduct({ ...product, image: file });
        setPreviewImage(URL.createObjectURL(file));
      }
    };

    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="edit-product"
        aria-describedby="edit-product-details"
      >
        <div
          style={{
            background: "white",
            padding: "20px",
            margin: "50px auto",
            maxWidth: "500px",
            borderRadius: "10px",
          }}
        >
          <h2>Edit Product</h2>
          <TextField
            label="Name"
            fullWidth
            value={product?.name || ""}
            onChange={(e) =>
              setProduct({ ...product, name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Description"
            fullWidth
            value={product?.description || ""}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Price"
            fullWidth
            type="number"
            value={product?.price || ""}
            onChange={(e) =>
              setProduct({ ...product, price: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Discounted Price"
            fullWidth
            type="number"
            value={product?.discountedPrice || ""}
            onChange={(e) =>
              setProduct({
                ...product,
                discountedPrice: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            label="Stock"
            fullWidth
            type="number"
            value={product?.stock || ""}
            onChange={(e) =>
              setProduct({ ...product, stock: e.target.value })
            }
            margin="normal"
          />
          <div style={{ marginTop: "15px" }}>
            <label>Current Image:</label>
            <div>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Current Product"
                  style={{
                    maxHeight: "50px",
                    objectFit: "contain",
                    marginBottom: "10px",
                  }}
                />
              )}
            </div>
            <label>Update Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "block", marginTop: "5px" }}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={onSave}
            style={{ marginTop: "10px" }}
          >
            Save Changes
          </Button>
        </div>
      </Modal>
    );
  };

  export default EditModal;
