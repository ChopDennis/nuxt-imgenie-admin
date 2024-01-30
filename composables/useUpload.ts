import type { UploadRawFile } from "element-plus";

export default function useUpload(uploadExtensions: string[]) {
  const handleFileUploadChange = (file: UploadRawFile | File) => {
    const fileExtension = file.name.split(".").pop() as string;
    const fileSize = file.size;
    const isAllowedExtension = _useIncludes(uploadExtensions, fileExtension);

    if (isAllowedExtension) {
      const maxSize = getMaxFileSize(fileExtension);
      if (fileSize <= maxSize) {
        return file;
      } else {
        return `檔案大小超過 ${maxSize / 1024 / 1024}MB 限制`;
      }
    } else {
      const acceptExtensions = _useMap(uploadExtensions, (extension) =>
        _useToUpper(extension),
      ).join(", ");
      return `限制只能上傳 ${acceptExtensions} 檔`;
    }
  };

  const getMaxFileSize = (extension: string): number => {
    switch (extension.toLowerCase()) {
      case "dbml":
        return 1 * 1024 * 1024; // 1 MB
      default:
        return 10 * 1024 * 1024; // 10 MB
    }
  };

  return {
    handleFileUploadChange,
  };
}
