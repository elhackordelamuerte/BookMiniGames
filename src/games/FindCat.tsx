import React, {useState} from "react";
import findcat from "../assets/findcat.jpg";
import { motion } from "framer-motion";
import hover from "../assets/hover.png";

const FindCat: React.FC = () => {
    const dragConstraintsRef = React.useRef(null);

    const [isaCat, setIsACat] = useState(false);


    return (
        <div>
        <h1>Trouve le chat</h1>
        {isaCat && (
    <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        zIndex: 1000
    }}>
        <h2 style={{ margin: 0, fontSize: "24px", color: "#333" }}>Félicitations!</h2>
        <p style={{ margin: "10px 0", fontSize: "18px", color: "#666" }}>Vous avez trouvé le chat!</p>
        <button 
            onClick={() => setIsACat(false)} 
            style={{ 
            padding: "10px 20px", 
            fontSize: "16px", 
            color: "white", 
            backgroundColor: "#007BFF", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer" 
            }}
        >
            Fermer
        </button>
    </div>
)}
        <div ref={dragConstraintsRef} style={{ width: "150vh", height: "90vh", position: "relative", background: `url(${findcat})` }} >
            <motion.img
                src={hover}
                alt="hover"
                style={{ width: 282, height: 250, position: "absolute" }}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 0.3 }}
                initial={{ y:400, x: 800 }}
                onClick={() => setIsACat(true)}
                className="collision-element"/>
        </div>
        </div>
    );
}

export default FindCat;