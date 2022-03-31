import React from 'react'
import { useDisclosure } from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { Image , Text , Button} from '@chakra-ui/react';

const ProfileModel = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div>
            {props.children ? (
            <span onClick={onOpen}>{props.children}</span>
        ) : (
            <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
        )}
         <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent h="410px">
            <ModalHeader
                fontSize="40px"
                fontFamily="Work sans"
                d="flex"
                justifyContent="center"
            >
                {props.user.name}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
                d="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="space-between"
            >
                <Image
                borderRadius="full"
                boxSize="150px"
                src={props.user.pic}
                alt={props.user.name}
                />
                <Text
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                >
                Email: {props.user.email}
                </Text>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose}>Close</Button>
            </ModalFooter>
            </ModalContent>
         </Modal>
        </div>
    )
}

export default ProfileModel ;
