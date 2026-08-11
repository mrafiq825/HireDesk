import React, { useState, useRef } from "react";
import type { IconProps, ResumeUploadProps } from "@app-types/components";

const CloudArrowUpIcon = ({ className, ...props }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
    />
  </svg>
);

const DocumentIcon = ({ className, ...props }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  </svg>
);

function ResumeUpload({
  onFileUpload,
  isLoading = false,
  onError,
  isPremium = false,
  onResumeUploaded,
}: ResumeUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "application/octet-stream",
      "application/x-msword",
      "application/vnd.ms-word",
      "",
    ];

    const allowedExtensions = [".pdf", ".doc", ".docx"];
    const fileExtension = file.name
      .toLowerCase()
      .substring(file.name.lastIndexOf("."));
    const isValidExtension = allowedExtensions.includes(fileExtension);

    if (allowedTypes.includes(file.type) || isValidExtension) {
      setSelectedFile(file);
      if (onFileUpload) {
        onFileUpload(file);
      }
      if (isPremium && onResumeUploaded) {
        onResumeUploaded();
      }
    } else {
      if (onError) {
        onError({
          message: `Invalid file type: ${file.type}. Please upload a PDF or Word document.`,
          type: "warning",
          category: "file",
        });
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isLoading) return;

    const files = e.dataTransfer?.files;
    if (files?.[0]) {
      handleFileChange(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading) return;

    const file = e.target?.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const openFileDialog = () => {
    if (!isLoading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="max-w-xl mx-auto glass-panel p-6 sm:p-8 relative overflow-hidden">
      <h2 className="text-xl sm:text-2xl font-bold text-[#F3F7F4] mb-6 text-center">
        Upload Candidate Resume
      </h2>

      {isPremium && (
        <div className="mb-4 glass-badge glass-badge-primary w-full justify-center py-2">
          <span>✨ Enterprise Deep Intelligence Active</span>
        </div>
      )}

      <div
        className={`relative p-8 sm:p-10 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all duration-300 ${
          isLoading
            ? "bg-white/5 border-white/20 cursor-not-allowed"
            : selectedFile
              ? "glass-ai border-[#94B69E]"
              : "border-white/20 hover:border-[#94B69E] hover:bg-white/5"
        }`}
        onClick={openFileDialog}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleInputChange}
          accept=".pdf,.doc,.docx"
          disabled={isLoading}
          aria-label="Upload resume file"
        />

        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#94B69E] border-t-transparent shadow-[0_0_12px_#94B69E]" />
            <p className="mt-4 text-sm font-semibold text-[#94B69E]">
              Analyzing Candidate Resume...
            </p>
          </div>
        ) : selectedFile ? (
          <>
            <DocumentIcon className="mx-auto h-12 w-12 text-[#94B69E]" />
            <p className="mt-4 text-sm font-semibold text-[#F3F7F4]">
              {selectedFile.name}
            </p>
            <p className="mt-1 text-xs text-[#718078]">
              {(selectedFile.size / 1024).toFixed(1)} KB • Ready for Analysis
            </p>
          </>
        ) : (
          <>
            <CloudArrowUpIcon className="mx-auto h-12 w-12 text-[#AAB8AF]" />
            <p className="mt-4 text-sm font-semibold text-[#F3F7F4]">
              Drag & Drop resume or click to browse
            </p>
            <p className="mt-1 text-xs text-[#718078]">
              Supports PDF, DOC, and DOCX files
            </p>
          </>
        )}
      </div>

      <div className="mt-4 text-center space-y-1">
        <p className="text-xs text-[#718078]">
          Instant extraction of skills, experience, leadership traits & interview questions
        </p>
      </div>
    </div>
  );
}

export default ResumeUpload;
