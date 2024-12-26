import React, { useState, useEffect } from 'react';
import { editBanner, getBanners } from '../../../api/Banner';
import { toast } from 'react-toastify';

const BannerTable = () => {
  const [banners, setBanners] = useState([]);
  const [editedBanners, setEditedBanners] = useState({});

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await getBanners();
        setBanners(response.data.banners);
      } catch (error) {
        toast.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  const handleFileChange = (bannerId, imageIndex, newImageFile) => {
    setEditedBanners(prevState => ({
      ...prevState,
      [bannerId]: {
        ...prevState[bannerId],
        [imageIndex]: newImageFile
      }
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setBanners(prevState => prevState.map(banner => {
        if (banner._id === bannerId) {
          const updatedImages = [...banner.imageUrl];
          updatedImages[imageIndex] = reader.result;
          return { ...banner, imageUrl: updatedImages };
        }
        return banner;
      }));
    };
    reader.readAsDataURL(newImageFile);
  };

  const handleSubmitChanges = async (bannerId) => {
    const bannerEdits = editedBanners[bannerId];
    if (!bannerEdits) return;

    try {
      for (const [imageIndex, newImageFile] of Object.entries(bannerEdits)) {
        await editBanner(bannerId, imageIndex, newImageFile);
      }
      toast.success('Banner images updated successfully');
      const updatedBanners = banners.map(banner => {
        if (banner._id === bannerId) {
          const updatedImages = [...banner.imageUrl];
          for (const [imageIndex, newImageFile] of Object.entries(bannerEdits)) {
            updatedImages[imageIndex] = newImageFile.name;
          }
          return { ...banner, imageUrl: updatedImages };
        }
        return banner;
      });
      setBanners(updatedBanners);
      setEditedBanners(prevState => {
        const newState = { ...prevState };
        delete newState[bannerId];
        return newState;
      });
    } catch (error) {
      toast.error('Error updating banner images');
    }
  };

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Banners</h2>
      <div className="">
        {banners.map((banner) => (
            <div key={banner._id} className="border p-4 rounded-lg ">
            <h3 className="font-semibold mb-2">{banner.title}</h3>
              <h5 className='mb-3'>Note:- Images Size Should be : 1583 × 633 px for all banners</h5>
            <div className="space-y-2">
              {banner.imageUrl.map((url, index) => (
                <div key={index} className="flex flex-wrap items-center gap-5">
                  <img
                    src={url.startsWith('data:') ? url : `http://localhost:5000/uploads/${url}`}
                    alt={`Banner ${banner.title} - Image ${index + 1}`}
                    className="w-[24rem] h-40 object-cover rounded"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        handleFileChange(banner._id, index, file);
                      }
                    }}
                    className="mt-2"
                  />
                </div>
              ))}
            </div>
            {editedBanners[banner._id] && (
              <button
                onClick={() => handleSubmitChanges(banner._id)}
                className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
              >
                Submit Changes
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerTable;