import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PartsFeatureImageModal from '../PartsFeatureImageModal';

const PartsFeature = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [partsFeatureImage, setPartsFeatureImage] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchPartsFeatureImage();
  }, []);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    axios
      .post(
        'http://localhost:5000/api/parts-feature-image/upload-parts-feature-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        console.log('Image uploaded successfully:', response.data);
        handleCloseModal();

        fetchPartsFeatureImage();
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  const fetchPartsFeatureImage = () => {
    axios
      .get(
        'http://localhost:5000/api/parts-feature-image/get-parts-feature-image',
        {
          responseType: 'arraybuffer',
        }
      )
      .then((response) => {
        const imageBlob = new Blob([response.data], {
          type: response.headers['content-type'],
        });
        setPartsFeatureImage(URL.createObjectURL(imageBlob));
      })
      .catch((error) => {
        console.error('Error fetching parts feature image:', error);
      });
  };

  const handleReplace = () => {
    if (!selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    axios
      .put(
        'http://localhost:5000/api/parts-feature-image/replace-parts-feature-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        console.log('Image replaced successfully:', response.data);
        fetchPartsFeatureImage();
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error replacing image:', error);
      });
  };

  return (
    <div className="listed-components">
      <div className="single-component" onClick={handleOpenModal}>
        <h4>Parts Feature Image</h4>
        {partsFeatureImage && (
          <img src={partsFeatureImage} alt="Parts Feature" />
        )}
      </div>
      <PartsFeatureImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleImageChange={handleImageChange}
        handleReplace={handleReplace}
        handleUpload={handleUpload}
      />
    </div>
  );
};

export default PartsFeature;
