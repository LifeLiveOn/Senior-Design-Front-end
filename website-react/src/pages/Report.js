import { useParams } from "react-router-dom";


function App() {
    const {id} = useParams()

    return (
        <>
            <h1>Report (House ID: {id})</h1>
        </>
    );
}

export default App;