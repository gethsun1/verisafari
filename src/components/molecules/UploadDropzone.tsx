import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

export function UploadDropzone({
  onFileSelected,
  busy
}: {
  onFileSelected: (file: File) => void;
  busy?: boolean;
}) {
  const [isDrag, setIsDrag] = useState(false);
  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted[0]) onFileSelected(accepted[0]);
    },
    [onFileSelected]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    disabled: busy,
    onDragEnter: () => setIsDrag(true),
    onDragLeave: () => setIsDrag(false)
  });

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <motion.div
        className="group relative flex h-48 items-center justify-center rounded-2xl border-2 border-dashed border-white/40 bg-gradient-to-br from-white/5 to-white/10 text-white backdrop-blur-xl shadow-lg shadow-black/10"
        animate={{ borderColor: isDrag ? "#22d3ee" : "rgba(255,255,255,0.4)", scale: isDrag ? 1.01 : 1 }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        <div className="text-center">
          <UploadCloud className="mx-auto mb-2 h-8 w-8 text-white/30 transition-colors group-hover:text-white/60" />
          <p className="text-sm text-white/90">Drag & drop a file here</p>
          <p className="mt-1 text-xs text-white/70">or click to choose</p>
        </div>
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl ring-0 transition-all"
          style={{ boxShadow: isDrag ? "0 0 60px -20px rgba(34,211,238,0.45)" : "none" }}
        />
      </motion.div>
    </div>
  );
}


