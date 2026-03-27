import { useState } from "react";

function ImageModal({show, close,  imageSrc}) {
    const [showOriginal, setShowOriginal] = useState(false);
    if (show) {
        const src = showOriginal ? imageSrc.original : imageSrc.predicted;
        return (
            <>
                <div className="modal-background"></div>
                <div className="modal">
                    <div className="header">
                        <i
                            className={`modal-eye-toggle fa-solid ${showOriginal ? "fa-eye-slash" : "fa-eye"}`}
                            onClick={() => setShowOriginal(!showOriginal)}
                            title={showOriginal ? "Show damage boxes" : "Hide boxes"}
                        />
                        <button className="close" onClick={close}>&times;</button>
                    </div>
                    <div className="body">
                        <div className="image-container">
                            <img height={512} src={src}></img>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    

    return null;
}

export default ImageModal;