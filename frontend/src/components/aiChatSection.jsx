import { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Copy, Send, Bot } from 'lucide-react';
import axios from '../config/axios'; // Adjust the import based on your axios config

export default function ChatWidget({setCode, code}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Focus the input when opening the chat
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Get current code from your editor if needed
      const currentCode = getCurrentCode(); // You'll need to implement this function

      // Make API call to your AI endpoint
        const response= await axios.post('/ai/chatai', {
        message: inputValue,
        code: code
      })

      

      const data = response.data;
      
      // Handle the AI response
      const aiMessage = {
        type: 'ai',
        content: data.text,
        code: data.code || null
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error communicating with AI:', error);
      
      // Add error message
      setMessages(prev => [...prev, {
        type: 'ai',
        content: 'Sorry, there was an error processing your request.',
        isError: true
      }]);
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  // Handle keyboard events for the input
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // This is a placeholder - you'll need to implement how to get the current code
  const getCurrentCode = () => {
    // Return the code from your editor
    // Example: return editorInstance.getValue();
    return "// Your editor code will be retrieved here";
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="absolute bottom-4 right-4 z-50 ">

      <div className='relative '>

      {/* Chat toggle button */}
      <button 
        onClick={toggleChat}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#C84F19] text-white shadow-lg hover:bg-[#ca6a3e] transition-all"
      >
        {isOpen ? <X size={20} /> : <Bot size={20} />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[25rem]  h-[32rem] bg-[#1F1F1F] rounded-lg shadow-xl flex flex-col border-[2px]  border-[#5D5D5D]">
          {/* Chat header */}
          <div className="p-3 bg-[#C84F19] font-medium rounded-t-lg flex justify-between items-center">
            <span className='font-bold text-[#444242]#807878' >AI Assistant</span>
            <button onClick={toggleChat} className="text-white hover:text-gray-200">
              <X size={16} />
            </button>
          </div>
          
          {/* Chat messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-3 space-y-3"
          >
            {messages.length === 0 ? (
              <div className="text-gray-400 text-center mt-10">
                Ask a question about your code
              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div 
                    className={`max-w-3/4 rounded-lg p-2 ${
                      msg.type === 'user' 
                        ? 'bg-[#cf8b6c] text-[#1F1F1F]' 
                        : msg.isError 
                          ? 'bg-red-100 text-red-900' 
                          : 'bg-[#878484] text-gray-900'
                    }`}
                  >
                    {msg.content}
                  </div>
                  
                  {/* Code block with copy button if present */}
                  {msg.code && (
                    <div className="mt-2 bg-gray-800 text-gray-100 rounded-md w-full overflow-hidden">
                      <div className="flex justify-between items-center p-2 bg-gray-700">
                        <span className="text-xs">Code</span>
                        <button 
                          onClick={() => copyToClipboard(msg.code)}
                          className="flex items-center text-xs hover:text-blue-300"
                        >
                          <Copy size={12} className="mr-1" />
                          Copy
                        </button>
                      </div>
                      <pre className="p-2 overflow-x-auto text-sm">
                        <code>{msg.code}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <div className=" border-t border-gray-200 w-full h-12">
            <div className="flex gap-1 justify-center items-center w-full h-full p-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your code..."
                className="flex-1  bg-[#393939] p-2 w-full focus:outline-none rounded-full text-sm"
                disabled={isLoading}
              />
              <button 
                onClick={handleSubmit}
                className="bg-[#C84F19] text-white p-2 rounded-full hover:bg-[#ca6a3e]"
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
                ) : (
                  <Send size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
}