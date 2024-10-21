/* eslint-disable react/prop-types */
import { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Modal from '@mui/material/Modal';

export default function ButtonWithModal ( {
  type = 'button',
  onClick,
  className,
  disabled = false,
  children,
  modalContent, // Nueva prop para el contenido del modal
} ) {
  const [open, setOpen] = useState( false ); // Estado del modal

  let Icon = HomeIcon;
  if ( type === 'delete' ) Icon = DeleteIcon;
  if ( type === 'insert' ) Icon = CloudUploadIcon;
  if ( type === 'add' ) Icon = AddIcon;
  if ( type === 'update' ) Icon = CloudUploadIcon;

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: disabled ? 0.5 : 1,
    transition: 'opacity 0.3s ease',
  };

  const iconStyle = children ? { marginRight: '4px' } : {};

  const handleOpen = () => {
    if ( !disabled ) {
      if ( modalContent ) {
        setOpen( true );
      } else {
        // Solo ejecutamos onClick cuando no hay modalContent
        onClick();
      }
    }
  };

  const handleClose = () => {
    setOpen( false );
  };

  const handleConfirm = () => {
    // Solo ejecutamos onClick cuando el usuario confirma desde el modal
    onClick();
    handleClose(); // Cerramos el modal después de confirmar
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className={className}
        disabled={disabled}
        style={buttonStyle}
      >
        <Icon style={iconStyle} />
        {children}
      </button>

      {modalContent && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              margin: '15% auto',
              width: '300px',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            <Icon />
            <p>{modalContent}</p>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '10px' }}>
              <button onClick={handleConfirm} style={{ backgroundColor: '#80e049', color: 'white', width: '50px', borderRadius: '8px', padding: '2px 4px' }}>
                <CheckIcon />
              </button>
              <button onClick={handleClose} style={{ marginLeft: '10px', backgroundColor: '#e04949', color: 'white', width: '50px', borderRadius: '8px', padding: '2px 4px' }}>
                <CloseIcon />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
