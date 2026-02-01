

function Badge({name, color}) {
    return (
        <div className="badge" style={{backgroundColor: color}}>{name}</div>
    );
}

export default Badge;