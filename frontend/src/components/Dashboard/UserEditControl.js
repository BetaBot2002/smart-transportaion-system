import {
  ButtonGroup,
  Editable, useEditableContext,
  EditableInput,
  EditablePreview, Flex, IconButton, useEditableControls,
  Input,
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
export function EditableComponent({ value }) {
  
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()
    const handleNewInputSubmit = (req, res) => {
      
    }
    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} onClick={handleNewInputSubmit} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center'>
        <IconButton size='10' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  }

  return (
    <Editable
      textAlign='center'
      justifyContent='center'
      alignItems='center'
      gap='15px'
      defaultValue={value}
      fontSize='1xl'
      display='flex'
      isPreviewFocusable={false}
    >
      <EditablePreview />
      {/* Here is the custom input */}
      <Input onChange={(e)=> console.log(e.target.value)} as={EditableInput} />
      <EditableControls />
    </Editable>
  )
}