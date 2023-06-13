import { useState } from "react";

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = (e: any) => {
    e.preventDefaults();
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return { modalOpen, handleModalOpen, handleModalClose };
};