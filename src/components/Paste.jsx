import {
  Calendar,
  Copy,
  Eye,
  PencilLine,
  Trash2,
  Link as LinkIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatData } from "../Utlis/formatData";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
    toast.success("Paste deleted successfully!");
  };

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white">
      <div className="w-[90vw] h-[90vh] bg-[#0b1221]/80 backdrop-blur-lg rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 p-10 space-y-8 transition-all duration-300 hover:shadow-[0_0_80px_rgba(59,130,246,0.2)] overflow-hidden flex flex-col">

        {/* 🔍 Search Bar */}
        <div>
          <input
            type="search"
            placeholder="🔍 Search your pastes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1e293b]/70 text-white border border-white/20 px-5 py-3 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg backdrop-blur-lg"
          />
        </div>

        {/* 📋 Pastes List */}
        <div className="flex-1 bg-[#0b1221]/70 border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-lg p-8 overflow-y-auto transition-all duration-300 hover:border-blue-500/40 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]">
          <h2 className="text-3xl font-semibold border-b border-white/10 pb-4 mb-6">
            📄 All Pastes
          </h2>

          {filteredPastes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredPastes.map((paste) => (
                <div
                  key={paste._id}
                  className="bg-[#1e293b]/60 border border-white/10 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:scale-[1.02]"
                >
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-400 truncate">
                      {paste.title}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-3 mb-3">
                      {paste.content}
                    </p>
                    <div className="text-gray-400 text-xs flex items-center gap-x-2">
                      <Calendar size={14} />
                      {FormatData(paste.createdAt)}
                    </div>
                  </div>

                  {/* 🎨 Buttons Section */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <a href={`/?pasteId=${paste._id}`}>
                      <button className="flex items-center gap-1 bg-sky-500/90 hover:bg-sky-600 text-white font-medium transition-all px-3 py-1.5 rounded-lg text-sm shadow-md hover:shadow-sky-500/40">
                        <PencilLine size={16} /> Edit
                      </button>
                    </a>

                    <a href={`/pastes/${paste._id}`}>
                      <button className="flex items-center gap-1 bg-emerald-500/90 hover:bg-emerald-600 text-white font-medium transition-all px-3 py-1.5 rounded-lg text-sm shadow-md hover:shadow-emerald-500/40">
                        <Eye size={16} /> View
                      </button>
                    </a>

                    <button
                      onClick={() => handleDelete(paste._id)}
                      className="flex items-center gap-1 bg-rose-600/90 hover:bg-rose-700 hover:shadow-[0_0_10px_rgba(244,63,94,0.5)] transition-all px-3 py-1.5 rounded-lg text-sm font-medium"
                    >
                      <Trash2 size={16} /> Delete
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste.content);
                        toast.success("Copied to clipboard!");
                      }}
                      className="flex items-center gap-1 bg-yellow-500/90 hover:bg-yellow-600 transition-all px-3 py-1.5 rounded-lg text-sm font-medium text-white shadow-md hover:shadow-yellow-500/30"
                    >
                      <Copy size={16} /> Copy
                    </button>

                    <button
                      onClick={() => {
                        const shareLink = `${window.location.origin}/pastes/${paste._id}`;
                        navigator.clipboard.writeText(shareLink);
                        toast.success("Share link copied!");
                      }}
                      className="flex items-center gap-1 bg-violet-600/90 hover:bg-violet-700 hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all px-3 py-1.5 rounded-lg text-sm font-medium"
                    >
                      <LinkIcon size={16} /> Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-400 text-lg">No pastes found 🥲</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
