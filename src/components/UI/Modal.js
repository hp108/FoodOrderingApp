import React from "react";
import classes from './Modal.module.css'

function Modal(props) {

  const Backdrop = () => {
    return <div onClick={props.onClose} className={classes.backdrop} />;
  };

  const ModalOverlay = (props) => {
    return (
      <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
      </div>
    );
  };

  return (
    <>
      <Backdrop />
      <ModalOverlay>{props.children}</ModalOverlay>
    </>
  );
}

export default Modal;
