
function ImageModal({show, close, imageSrc}) {
    if (show) {
        return (
            <>
                <div className="modal-background"></div>
                <div className="modal">
                    <div className="header">
                        <button className="close" onClick={close}>&times;</button>
                    </div>
                    <div className="body">
                        <div className="image-container">
                            <img width={700} height={700} src={imageSrc}></img>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    

    return null;
}

export default ImageModal;