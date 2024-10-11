import React, { useState } from "react";
import "./App.css";
import { FaCode } from "react-icons/fa6";
import { IoMdPlanet } from "react-icons/io";
import { SiPython } from "react-icons/si";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { IoSendSharp } from "react-icons/io5";
import { GoogleGenerativeAI } from "@google/generative-ai";

const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([])

  const hitRequest = () => {
    if (message) {
      generateResponse(message);
    } else {
      alert("Please enter a message");
    }
  };


  const generateResponse = async(msg) => {

      if(!msg){
        return;
      }
    const genAI = new GoogleGenerativeAI("AIzaSyDdyjUc1wBg9gojbql5kUAbgpRuR7g1zX4");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(msg);
    const newMessages = [
      ...messages,
     {
      type: "userMsg",
      message: msg,
     },
     {
      type: "responseMsg",
      message: await result.response.text(),
     }
    ];

    setMessages(newMessages);
    setIsResponseScreen(true);
    setMessage("");
    console.log(result.response.text());
  };

  const newChat = () =>{
    setIsResponseScreen(false);
    setMessages([]);
  }

  return (
    <>
      <div className="container w-screen min-h-screen overflow-x-hidden bg-[#3f2e2e] text-white">
        {isResponseScreen ? (
          <div className=" h-[82vh]">
            <div className="header pt-[25px] flex items-center justify-between w-[100vw] px-[300px]">
              <h2 className="text-2xl">SmartAssist</h2>
              <button id="newChatBtn"
                className="bg-[#181818] p-[10px] rounded-[30px] cursor-pointer text-[14px] px-[20px]"
                onClick={newChat}
              >
                New Chat{" "}
              </button>
            </div>

            <div className="messages">
              {
                messages ?.map((msg,index) =>{
                  return (
                    <div key={index} className={msg.type}>{msg.message}</div>
                  )
                })
              }
            </div>
          </div>
        ) : (
          <div className="middle h-[82vh] flex items-center flex-col justify-center">
            <h1 className="text-4xl">SmartAssist</h1>
            <div className="boxes mt-[40px] flex items-center gap-4">
              <div className="card rounded-lg transition-all cursor-pointer hover:bg-[#201f1f]  min-h-[16vh] relative bg-[#372424] p-[10px] px-[20px]">
                <i className="text-[25px]">
                  <FaCode />
                </i>
                <p className="text-[18px] mt-2">
                  What is Coding? <br />
                  How we can learn it .
                </p>
              </div>
              <div className="card rounded-lg transition-all cursor-pointer hover:bg-[#201f1f] min-h-[16vh] relative bg-[#372424] p-[10px] px-[20px] ">
                <i className="text-[25px]">
                  <IoMdPlanet />
                </i>
                <p className="text-[18px] mt-2">
                  Which is the red planet
                  <br />
                  of solar system .
                </p>
              </div>
              <div className="card rounded-lg transition-all cursor-pointer hover:bg-[#201f1f] min-h-[16vh] relative bg-[#372424] p-[10px] px-[20px]">
                <i className="text-[25px]">
                  <SiPython />
                </i>
                <p className="text-[18px] mt-2">
                  In which year python <br />
                  was invested ?
                </p>
              </div>
              <div className="card rounded-lg transition-all cursor-pointer hover:bg-[#201f1f] min-h-[16vh] relative bg-[#372424] p-[10px] px-[20px]">
                <i className="text-[25px]">
                  <TbMessageChatbotFilled />
                </i>
                <p className="text-[18px] mt-2">
                  How we can use the
                  <br />
                  AI for adopt .
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bottom w-[100%] flex flex-col justify-center items-center">
          <div className="inputBox w-[60%] text-[15px] py-[7px] flex items-center bg-[#181818] rounded-[30px]">
            <input value={message} onChange={(e) => {setMessage(e.target.value)}} type="text" className="p-[5px] pl-[15px] bg-transparent flex-1 outline-none" placeholder="write message here . . ." id="messageBox" autoComplete="off"/>
            {
            message == "" ? "" : <i className="text-green-500 text-[20px] mr-5 cursor-pointer" onClick={hitRequest}><IoSendSharp/></i>
            }
          </div>
          <p className="text-[gray] text-[15px] my-4">
          SmartAssist, developed by Mr. Rahul Patra, leverages the Gemini API to provide intelligent responses
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
