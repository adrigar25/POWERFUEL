import React, { useState, useEffect } from "react";
import { Modal, ModalContent, Button, useDisclosure, Badge } from "@nextui-org/react";
import AddImageForm from "@components/users/editUserImage/partials/addImageForm";

const EditUserImage = ({ children }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section className="w-full">
        <Badge 
            onClick={onOpen}
            className="p-1 cursor-pointer" content={
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/>
            </svg>
            }
            placement="bottom-right"
        >
            <section className="w-12 h-12">
                { children }
            </section>
        </Badge>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="p-8">
            <ModalContent>
                <AddImageForm onOpenChange={onOpenChange}/>
            </ModalContent>
        </Modal>
    </section>
  );
};

export default EditUserImage;
