import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white">
        <h2 className="text-3xl font-semibold tracking-wide">❌ Paste not found!</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white">
      <div className="w-[90vw] h-[90vh] bg-[#0b1221]/85 backdrop-blur-2xl rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.7)] border border-white/10 p-10 flex flex-col gap-8 transition-all duration-300 hover:shadow-[0_0_100px_rgba(59,130,246,0.25)]">

        {/* 🔹 Title Section */}
        <input
          type="text"
          value={paste.title}
          disabled
          className="w-full px-8 py-4 rounded-xl bg-[#1e293b]/70 border border-white/20 
          text-white text-xl shadow-inner placeholder-gray-400 focus:outline-none"
        />

        {/* 🔹 Editor Section */}
        <div className="flex-1 bg-[#1e293b]/70 border border-white/10 rounded-2xl overflow-hidden flex flex-col backdrop-blur-lg transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]">
          
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-[#0f172a]/80">
            <div className="flex gap-2">
              <span className="w-3.5 h-3.5 bg-red-500 rounded-full shadow-sm"></span>
              <span className="w-3.5 h-3.5 bg-yellow-400 rounded-full shadow-sm"></span>
              <span className="w-3.5 h-3.5 bg-green-500 rounded-full shadow-sm"></span>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toast.success("Copied to Clipboard!");
              }}
              className="p-2 rounded-md hover:bg-white/10 transition"
            >
              <Copy size={22} />
            </button>
          </div>

          {/* Textarea */}
          <textarea
            value={paste.content}
            disabled
            placeholder="Paste content not available..."
            className="w-full flex-1 bg-transparent text-gray-100 p-6 focus:outline-none placeholder-gray-400 resize-none text-[17px] leading-relaxed font-mono"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
