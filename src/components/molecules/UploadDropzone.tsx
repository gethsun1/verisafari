import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";

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
        className="flex h-48 items-center justify-center rounded-2xl border-2 border-dashed border-white/30 bg-white/5 text-white backdrop-blur-md"
        animate={{ borderColor: isDrag ? "#22d3ee" : "rgba(255,255,255,0.3)", scale: isDrag ? 1.01 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="text-center">
          <p className="text-sm text-white/80">Drag & drop a file here</p>
          <p className="mt-1 text-xs text-white/60">or click to choose</p>
        </div>
      </motion.div>
    </div>
  );
}


