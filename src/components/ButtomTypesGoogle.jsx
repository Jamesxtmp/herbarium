/* eslint-disable react/prop-types */
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function ButtomTypesGoogle ( { type = 'button', onClick, className, disabled = false, children } ) {
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

  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
      style={buttonStyle}
    >
      <Icon style={iconStyle} />
      {children}
    </button>
  );
}