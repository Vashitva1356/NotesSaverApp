import { Copy, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const allPastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) dispatch(updateToPastes(paste));
    else dispatch(addToPastes(paste));

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const foundPaste = allPastes.find((p) => p._id === pasteId);
      if (foundPaste) {
        setTitle(foundPaste.title);
        setValue(foundPaste.content);
      }
    }
  }, [pasteId, allPastes]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white">
      <div className="w-[90vw] h-[90vh] bg-[#0b1221]/80 backdrop-blur-lg rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 p-10 flex flex-col space-y-10 transition-all duration-300 hover:shadow-[0_0_80px_rgba(59,130,246,0.2)] overflow-hidden">

        {/* 🔹 Header Section */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
          <input
            type="text"
            placeholder="Enter your paste title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full sm:flex-1 px-6 py-3.5 rounded-xl bg-[#1e293b]/60 border border-white/20 
            focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-white text-lg shadow-inner"
          />

          <div className="flex gap-3">
            <button
              onClick={createPaste}
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-indigo-700
              px-8 py-3 rounded-xl font-semibold shadow-lg text-lg transition-all duration-300 hover:scale-105"
            >
              {pasteId ? "Update Paste" : "Create Paste"}
            </button>

            {pasteId && (
              <button
                onClick={resetPaste}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800
                px-4 py-3 rounded-xl shadow-md transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                <PlusCircle size={24} />
              </button>
            )}
          </div>
        </div>

        {/* 🔹 Editor Window */}
        <div className="relative bg-[#1e293b]/70 border border-white/10 rounded-2xl h-[70vh] flex flex-col backdrop-blur-lg overflow-hidden transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#0f172a]/90">
            <div className="flex gap-2">
              <span className="w-3.5 h-3.5 bg-red-500 rounded-full shadow-sm"></span>
              <span className="w-3.5 h-3.5 bg-yellow-400 rounded-full shadow-sm"></span>
              <span className="w-3.5 h-3.5 bg-green-500 rounded-full shadow-sm"></span>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast.success("Copied to Clipboard!");
              }}
              className="p-2 rounded-md hover:bg-white/10 transition"
            >
              <Copy size={22} />
            </button>
          </div>

          {/* Text Area */}
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Start writing your code, notes or paste content here..."
            className="w-full flex-1 bg-transparent text-gray-100 p-5 focus:outline-none placeholder-gray-400 resize-none text-[16px] leading-relaxed font-mono"
            style={{ height: "100%" }} // ✅ Textarea fills available space
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
