import { useMutation } from "@tanstack/react-query";
import { File, Upload, X } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { useUploadProgress } from "../../hooks/useUploadProgress";
import { Progress } from "../ui/progress";
import { IUploadFile } from "../../interfaces/upload.interface";
import { uploadFile } from "../../api/mutations/upload.mutation";

interface Props {
  values: string[];
  onValuesChange: (values: string[]) => void;
}

export default function UploadDocumentsInput({values, onValuesChange}: Props) {
  const { percentCompleted, onUploadProgress, resetProgress } = useUploadProgress();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileToUpload, setFileTOUpload] = useState<File | null>(null);

  const {mutate: uploadMutate, isPending: uploading} = useMutation({
    mutationFn: async(data: IUploadFile) => await uploadFile(data),
    onSuccess: (data) => {
      onValuesChange([...values, data.url])
    },
    onError: (error) => {
      toast.error(error.message, { 
        position: 'top-center', 
      });
    },
    onSettled() {
      resetProgress()
    },
  });

  // const {mutate: deleteMutate, isPending: deleting} = useMutation({
  //   mutationFn: async(filename: string) => await uploadFile(filename),
  //   onSuccess: (data) => {
  //     onValuesChange([...values, data.url])
  //   },
  //   onError: (error) => {
  //     toast.error(error.message, { 
  //       position: 'top-center', 
  //     });
  //   },
  //   onSettled() {
  //     resetProgress()
  //   },
  // });


  const handleSelectFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if(!file) return;

    setFileTOUpload(file);

    const formData = new FormData();
    formData.append('file', file);

    uploadMutate({
      data: formData,
      onUploadProgress
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {values.map(item => (
        <div className="flex items-center gap-2 p-2 bg-white border">
          <File size={18} className="text-secondary"/>
          <div className="flex-1">
            <span className="text-[12px]">{item}</span>
          </div>
          <X 
            size={16} 
            className="text-muted-foreground hover:text-destructive cursor-pointer"
          />
        </div>
      ))}
      {uploading && (
        <div className="gap-2 p-2 bg-white border space-y-2">
          <section className="flex items-center gap-2">
            <File size={18} className="text-secondary"/>
            <div className="flex-1">
              <span className="text-[12px]">{fileToUpload?.name}</span>
            </div>
            <span className="text-[12px]">{percentCompleted}%</span>
          </section>
          <Progress value={percentCompleted} className="h-[2px] text-primary"/>
        </div>
      )}
      <button 
        type="button"
        className="border border-dashed px-4 py-2 w-full flex items-center gap-2 bg-slate-100 hover:bg-slate-200 rounded-sm"
        onClick={handleSelectFile}
      >
        <Upload size={14}/>
        <span className="text-[12px] font-[]">Upload file</span>
      </button>
      <input 
        onChange={handleFileInputChange}
        ref={inputRef} 
        type="file" 
        hidden
      />
    </div>
  )
}
