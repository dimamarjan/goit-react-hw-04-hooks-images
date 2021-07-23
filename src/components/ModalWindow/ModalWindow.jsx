import { createPortal } from 'react-dom';

import { BackDrop, ImageContainer, LargeImg } from './ModalWindow.style';

const modalRoot = document.querySelector("#modal-root");

export function ModalWindow ({currentImage, onCloseModal}) {
         
    return createPortal(
        <BackDrop className="backdrop" onClick={onCloseModal} >
            <ImageContainer>
                <LargeImg src={currentImage.largeImageURL} />
            </ImageContainer>
        </BackDrop>,
        modalRoot,
    );
};
