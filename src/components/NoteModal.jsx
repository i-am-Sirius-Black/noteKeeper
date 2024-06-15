import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Textarea,
  useToast,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  PopoverFooter,
  PopoverHeader,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import ColorPaletteModal from "./ColorPaletteModal";

function NoteModal({ isOpen, onClose, note, onSave, onDelete }) {
  const [title, setTitle] = useState(note?.title || "");
  const [tagline, setTagline] = useState(note?.tagline || "");
  const [body, setBody] = useState(note?.body || "");
  const [color, setColor] = useState(note?.color || "");
  const toast = useToast();

  const { onOpen: popoverOnOpen, onClose: popoverOnClose, isOpen: isPopoverOpen } = useDisclosure();

  useEffect(() => {
    setTitle(note?.title || "");
    setTagline(note?.tagline || "");
    setBody(note?.body || "");
    setColor(note?.color || "");
  }, [note]);

  const handleSave = () => {
    const updatedNote = { ...note, title, tagline, body, color, timestamp: new Date() };
    onSave(updatedNote);
    onClose();
  };
  const handleColorChange = (color) => {
    setColor(color);
    console.log(color);
  };

  const handleDelete=()=>{
    onDelete(note.id)
    popoverOnClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" isCentered>
      <ModalOverlay />
      <ModalContent bg={color} p={4}>
        <ModalHeader>
          <Textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            variant="unstyled"
            fontSize="2xl"
            fontWeight="bold"
            resize="none" // This will prevent the user from resizing the textarea
          />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Tagline"
            variant="unstyled"
            fontStyle="italic"
            mb={4}
          />
          <Textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Take a note..."
            variant="unstyled"
            resize="none"
            fontSize="md"
            rows={12}
            className="fontRoboto"
          />
        </ModalBody>

        <div className="flex justify-between px-6 items-center">
          <ColorPaletteModal handleColorChange={handleColorChange} />

          <Button colorScheme='teal' variant='solid' size='sm' onClick={handleSave}>
            Update
          </Button>
          <Button colorScheme='teal' variant='outline' size='sm' onClick={onClose}>
            Cancel
          </Button>

          <Popover placement="right" isOpen={isPopoverOpen} onOpen={popoverOnOpen} onClose={popoverOnClose}>
            <PopoverTrigger>
              <i class="ri-delete-bin-line font-bold text-xl cursor-pointer text-zinc-500" />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <span>
                  <i class="ri-alert-line text-red-500 text-xl" />
                </span>{" "}
                <span className="font-bold">Delete Note</span>
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <h1>Are you sure you want to delete this note?</h1>
              </PopoverBody>
              <PopoverFooter>
                <ButtonGroup size="sm">
                   <Button variant="outline" onClick={popoverOnClose}>Cancel</Button>
                  <Button colorScheme="red"  onClick={handleDelete}>Delete</Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </div>
      </ModalContent>
    </Modal>
  );
}

export default NoteModal;
