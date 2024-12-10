import { Button } from "@mui/material";
import { type FC, memo, useRef, useState } from "react";
import { GoUpload } from "react-icons/go";

interface FileUploadProps {
  onUpload: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  className?: string;
}

const FileUpload: FC<FileUploadProps> = ({
  onUpload,
  accept = "image/*,.pdf",
  multiple = true,
  maxSize = 5, // default 5MB
  className,
}) => {
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setError("");

    // Validate file size
    const invalidFiles = files.filter((file) => file.size > maxSize * 1024 * 1024);

    if (invalidFiles.length > 0) {
      setError(`Some files exceed the ${maxSize}MB limit`);
      return;
    }

    onUpload(files);

    // Reset input value to allow uploading the same file again
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClick} className={className}>
        <GoUpload />
        <input
          ref={inputRef}
          type="file"
          onChange={handleChange}
          accept={accept}
          multiple={multiple}
          style={{ display: "none" }}
        />
      </Button>
      {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
    </div>
  );
};

export default memo(FileUpload);
