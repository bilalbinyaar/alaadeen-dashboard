import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HardwareFeatureImageModal from '../HardwareFeatureImageModal';

const HardwareFeature = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hardwareFeatureImage, setHardwareFeatureImage] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchHardwareFeatureImage();
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
        'http://localhost:5000/api/hardware-feature-image/upload-hardware-feature-image',
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

        fetchHardwareFeatureImage();
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  const fetchHardwareFeatureImage = () => {
    axios
      .get(
        'http://localhost:5000/api/hardware-feature-image/get-hardware-feature-image',
        {
          responseType: 'arraybuffer',
        }
      )
      .then((response) => {
        const imageBlob = new Blob([response.data], {
          type: response.headers['content-type'],
        });
        setHardwareFeatureImage(URL.createObjectURL(imageBlob));
      })
      .catch((error) => {
        console.error('Error fetching hardware feature image:', error);
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
        'http://localhost:5000/api/hardware-feature-image/replace-hardware-feature-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        console.log('Image replaced successfully:', response.data);
        fetchHardwareFeatureImage();
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error replacing image:', error);
      });
  };

  return (
    <div className="listed-components">
      <div className="single-component" onClick={handleOpenModal}>
        <h4>Hardware Feature Image</h4>
        {hardwareFeatureImage && (
          <img src={hardwareFeatureImage} alt="Hardware Feature" />
        )}
      </div>
      <HardwareFeatureImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleImageChange={handleImageChange}
        handleReplace={handleReplace}
        handleUpload={handleUpload}
      />
    </div>
  );
};

export default HardwareFeature;
