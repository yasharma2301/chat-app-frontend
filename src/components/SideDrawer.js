import React, { useState } from 'react'
import { Box } from "@chakra-ui/layout";
import { Button, Tooltip, Text } from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/menu";
import {
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
} from "@chakra-ui/modal";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";
import ProfileModal from './ProfileModal';
import { useToast } from "@chakra-ui/toast";
import { useDisclosure } from '@chakra-ui/react';
import { Spinner } from "@chakra-ui/spinner";
import { Input } from "@chakra-ui/input";
import axios from "axios";
import ChatLoading from './ChatLoading';
import UserListItem from './UserListItem'
import { getSender } from '../config/ChatLogic';
import { BASE_URL } from '../Constants';

export default function SideDrawer() {
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)
    const { user, setUser, setSelectedChat, chats, setChats, notifications, setNotification } = ChatState();
    const history = useHistory();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`${BASE_URL}/api/user?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`${BASE_URL}/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        toast({
            title: "Logged out successfully",
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
        setUser(null)
        history.push("/");
    };

    return (
        <>
            <Box
                d="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px"
            >
                <Tooltip label="Search Users to chat with" hasArrow placement='bottom'>
                    <Button variant="ghost" onClick={onOpen}>
                        <i className='fas fa-search'></i>
                        <Text d={{ base: "none", md: "flex" }} px={4}>
                            Search User
                        </Text>
                    </Button>

                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans" fontWeight="bold">
                    Let's Chat
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <div className='notication-button'>
                                <div className={`${notifications.length === 0 ? 'notifcation-none' : ''} notification`}>{notifications.length}</div>
                                <BellIcon fontSize="3xl" m={1} />
                            </div>
                        </MenuButton>
                        <MenuList p={2}>
                            {
                                !notifications.length && "No new Messages"
                            }
                            {
                                notifications.map(notif => (
                                    <MenuItem key={`${notif._id}-notification`} onClick={() => {
                                        setSelectedChat(notif.chat)
                                        setNotification(notifications.filter((n) => n !== notif))
                                    }}>
                                        {notif.chat.isGroupChat ? `New message in ${notif.chat.chatName}` : `New message from ${getSender(user, notif.chat.users)}`}
                                    </MenuItem>
                                ))
                            }
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.name}
                                src={user.pic}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>{" "}
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                    <DrawerBody>
                        <Box d="flex" pb={2}>
                            <Input
                                placeholder="Search by name or email"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}>Go</Button>
                        </Box>
                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map((user) => {
                                return (
                                    <UserListItem
                                        key={`${user._id}-search`}
                                        user={user}
                                        handleFunction={() => accessChat(user._id)}
                                    />
                                )
                            })
                        )}
                        {loadingChat && <Spinner ml="auto" d="flex" />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}
