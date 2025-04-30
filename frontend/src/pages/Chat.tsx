import { Avatar, Box, Button, Icon, IconButton, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ChatItem from '../components/chat/ChatItem';
import { IoSend } from 'react-icons/io5';
import { deleteUserChats, sendChatRequest, sendChatRequestGemini } from '../utils/api-communication';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type Message = {
  role: "user" | "assistant";
  content: string
}
const Chat = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage])

    const chatData = await sendChatRequestGemini(content)

    const botMessage: Message = { role: "assistant", content: chatData.reply }
    setChatMessages((prev) => [...prev, botMessage]);



  }
  const handleDeleteChat = async () => {
    try {
      // toast.loading("Deleting chats", { id: "deleteChats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Chat deletion successful.")
    } catch (error) {
      toast.error("Error occured.", { id: "deleteChats" })
    }
  }

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login")
    }
  }, [auth])

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        width: "100%",
        height: "100%",
        mt: 3,
      }}>
      <Box sx={{ display: { md: "flex", sm: "none", xs: "none" }, flex: 0.2 }}>
        <Box sx={{
          display: "flex", width: "100%", height: "60vh",
          bgcolor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          flexDirection: "column", mx: 3
        }}>
          <Avatar sx={{
            mx: "auto",
            my: 2,
            bgcolor: "white",
            color: "black",
            fontFamily: "Raleway",
            fontWeight: 700
          }}>{auth?.user?.name[0]}</Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "Raleway" }}>Chatbot Ai</Typography>
          <Typography sx={{
            mx: "auto", my: 3,
            padding: 3,
            fontFamily: "Raleway"
          }}>Ask me anything!</Typography>
          <Button
            onClick={handleDeleteChat}
            sx={{
              width: "auto",
              padding: 1,
              mx: "auto",
              my: "auto",
              fontFamily: "Raleway",
              fontWeight: 700,
              borderRadius: 3,
              color: "black",
              bgcolor: "white",
              ":hover": {
                bgcolor: "#7C0902",
                color: "white"
              }
            }}
          >Clear Conversation</Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flex: { md: 0.8, sm: 1, xs: 1 }, flexDirection: "column", px: 2 }}>
        <Typography sx={{
          mx: "auto",
          textAlign: "center", fontSize: "40px",
          color: "white", mb: 2
        }}>Model GPT-4.o</Typography>
        <Box sx={{
          width: "100%", height: "60vh",
          display: "flex",
          mx: "auto",
          fontFamily: "Raleway",
          flexDirection: "column",
          overflow: "scroll",
          overflowX: "hidden",
          overflowY: "auto",
          scrollBehavior: "smooth",
          borderRadius: 3,
        }}>
          {chatMessages.map((chat, index) => <div style={{ color: "white" }}><ChatItem
            content={chat.content}
            role={chat.role} key={index} /></div>)}
        </Box>
        <Box sx={{ display: "flex", width: "100%" }}>
          <div style={{
            width: "100%",
            padding: "10px",
            borderRadius: 8,
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            display: "flex",
            margin: "auto"
          }}>
            {" "}
            <input
              ref={inputRef}
              type='text'
              style={{
                width: "100%",
                backgroundColor: "transparent",
                padding: "10px",
                fontSize: "14px",
                fontFamily: "Lucida Sans",
                border: "none",
                outline: "none",

              }} />
            <IconButton onClick={handleSubmit} sx={{ ml: "auto", color: "white" }}><IoSend /></IconButton>
          </div>

        </Box>
      </Box>
    </Box>
  )
}

export default Chat
