import React, { useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to open or close the chatbot */}
      <button 
        onClick={toggleChatbot} 
        style={{
          position: "fixed", 
          bottom: "20px", 
          right: "20px", 
          zIndex: 1001,  // Ensure button stays above the chatbot
          padding: "10px 20px",
          backgroundColor: "#4CAF50", 
          color: "white", 
          border: "none", 
          borderRadius: "5px"
        }}
      >
        {isOpen ? "Close Chatbot" : "Open Chatbot"}
      </button>

      {/* Chatbot iframe, visible only if isOpen is true */}
      {isOpen && (
        <div 
          style={{
            position: "fixed", 
            bottom: "20px", 
            right: "20px", 
            zIndex: 1000,  // Ensure chatbot stays below the button
            borderRadius: "10px", 
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)"
          }}
        >
          <iframe
            allow="microphone;"
            width="350"
            height="430"
            src="https://console.dialogflow.com/api-client/demo/embedded/c98e9863-59fb-4f4a-ae8d-94a86a44b39e"
            style={{
              border: "none", 
              borderRadius: "10px", 
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)"
            }}
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
