import React, { createContext, useContext } from 'react';
import useSuccessModal from './Success';
import useErrorModal from './Error';
import useConfirmModal from './Confirm';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const { showSuccessModal, SuccessModal } = useSuccessModal();
  const { showErrorModal, ErrorModal } = useErrorModal();
  const { showModalConfirm, ConfirmModal } = useConfirmModal();

  return (
    <ModalContext.Provider
      value={{ showSuccessModal, showErrorModal, showModalConfirm }}
    >
      {children}
      {SuccessModal}
      {ErrorModal}
      {ConfirmModal}
    </ModalContext.Provider>
  );
};
