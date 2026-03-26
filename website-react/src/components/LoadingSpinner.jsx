

function LoadingSpinner({text = "", type = "red"}) {
    return (
        <div className="loading-container">
            {text != "" && (
                <p>{text}</p>
            )}
            <div className={"loading-spinner-" + type}></div>
        </div>
    );
}

export default LoadingSpinner;