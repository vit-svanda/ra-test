'use client';

import { useRef, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase';

type Props = {
  onUploadComplete: (urls: string[]) => void;
};

export default function ImageUploader({ onUploadComplete }: Props) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const fileArr = Array.from(files);
    setSelectedFiles(fileArr);
    setPreviews(fileArr.map(file => URL.createObjectURL(file)));
  };

  // Drag & drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleUpload = async () => {
    setUploading(true);
    const supabase = supabaseBrowser();
    const urls: string[] = [];

    for (const file of selectedFiles) {
      const filePath = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from('property-images')
        .upload(filePath, file, { upsert: true });

      if (!error) {
        const { data } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);
        urls.push(data.publicUrl);
      }
    }

    setUploading(false);
    onUploadComplete(urls);
  };

  return (
    <div>
      <div
        className="border-2 border-dashed rounded p-4 mb-2 text-center cursor-pointer"
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          ref={inputRef}
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
        />
        <p>Přetáhněte obrázky sem nebo klikněte pro výběr</p>
      </div>
      <div className="flex gap-2 mb-2 flex-wrap">
        {previews.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`preview-${i}`}
            className="w-20 h-20 object-cover rounded border"
          />
        ))}
      </div>
      <button
        type="button"
        onClick={handleUpload}
        disabled={uploading || selectedFiles.length === 0}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {uploading ? 'Nahrávám...' : 'Nahrát obrázky'}
      </button>
    </div>
  );
}