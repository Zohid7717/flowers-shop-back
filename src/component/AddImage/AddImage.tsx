import { FC, ChangeEvent, useRef, useState, useEffect } from 'react'
import './AddImage.scss'
import { SelectFilesType } from '../../utils/types'

type AddImagePropsType = {
  setAddImageValid: React.Dispatch<React.SetStateAction<boolean>>
  setImages: React.Dispatch<React.SetStateAction<FileList | null>>
}

const AddImage: FC<AddImagePropsType> = ({ setAddImageValid, setImages }) => {
  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const [selectFiles, setSelectFiles] = useState<SelectFilesType[] | null>(null)

  const [viewAddBtn, setViewAddBtn] = useState<boolean>(true)
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0]
      const fileNameParts = newFile.name.split('.')
      const uniqueName = `${fileNameParts[0]}_${Date.now()}.${fileNameParts[1]}`
      if (!selectFiles) {
        setSelectFiles([new File([newFile], uniqueName, {type: newFile.type})])
      } else {
        setSelectFiles([...selectFiles, new File([newFile], uniqueName, {type: newFile.type})])
      }
    }
  }
  useEffect(() => {
    if (selectFiles) {
      const fileList = new DataTransfer()
      selectFiles?.forEach(file => fileList.items.add(file))
      setImages(fileList.files)
    }
    function view() {
      if (selectFiles && selectFiles.length > 4) {
        setViewAddBtn(false)
      } else {
        setViewAddBtn(true)
      }
    }
    view()
    setAddImageValid(selectFiles?.length! < 1 || selectFiles?.length === undefined)
  }, [selectFiles])

  const handleImgDelete = async (removeItem: string) => {
    if (selectFiles) {
      const newArr: SelectFilesType[] = selectFiles?.filter(item => item.name !== removeItem)
      setSelectFiles(newArr)
    }
  }

  return <div className='add-img'>
    <label htmlFor="add-img__section" style={{ cursor: 'pointer' }}>Добавте изображения</label>
    <div className='add-img__wrap'>
      {selectFiles?.map((file, index) => (
        <div key={index} className='add-img__card'>
          <img
            src={URL.createObjectURL(file)}
            alt={`Preview-${index}`}
          />
          <button className='add-img__del-btn' onClick={() => handleImgDelete(file.name)}>-</button>
        </div>
      ))}
      {
        viewAddBtn ?
          <button style={{ width: '100px', height: '100px', margin: '5px' }} onClick={() => inputFileRef.current?.click()}>+</button> : ''
      }
    </div>
    <input
      id='add-img'
      type="file"
      onChange={handleFileChange}
      ref={inputFileRef}
      hidden
    />
  </div>
}

export default AddImage