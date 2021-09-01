export interface FileUploaderProps {
  label: string;
  isRequired?: boolean;
  handleFile: (files: Blob) => void;
}
