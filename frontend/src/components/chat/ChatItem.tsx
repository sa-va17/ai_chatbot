import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { coldarkCold } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message: string) {
    if (message.includes("```")) {
        const blocks = message.split("```");
        return blocks;
    }
}
function isCodeBlock(str: string) {
    const codeBlockPattern = /(```[\s\S]*?```|[{[\](){};]|[a-z]+\s?\([\s\S]*?\)\s?{|\/\/.*|#.*|\/\*[\s\S]*?\*\/)/gim;
    return codeBlockPattern.test(str);
}

const ChatItem = ({ content, role }: {
    content: string,
    role: "user" | "assistant"
}) => {
    const messageBlock = extractCodeFromString(content);
    const auth = useAuth();
    return (
        (role === "assistant" ?
            <Box sx={{
                display: "flex", p: 1, gap: 2, bgcolor: "#0D1F22", my: 1
            }}>
                <Avatar sx={{ ml: 0 }}>
                    <img src='ai-chat-logo.png' alt="ai-chat-logo" width={"30px"} />
                </Avatar>
                <Box>
                    {!messageBlock && (<Typography sx={{ fontSize: "14px", fontFamily: "Raleway" }}>
                        {content}</Typography>
                    )}
                    {messageBlock && messageBlock.length && messageBlock.map((block) => isCodeBlock(block) ?
                        <SyntaxHighlighter style={coldarkCold} language='javascript'>
                            {block}
                        </SyntaxHighlighter>
                        : <Typography sx={{ fontSize: "14px", fontFamily: "Raleway" }}>
                            {block}</Typography>)}

                </Box>
            </Box>
            : <Box sx={{
                display: "flex", p: 1, gap: 2, bgcolor: "#354447"
            }}>
                <Avatar sx={{ ml: 0, bgcolor: "white", color: "grey", fontFamily: "Raleway" }}>
                    {auth?.user?.name[0]}
                </Avatar>
                <Box>
                    {!messageBlock && (<Typography sx={{ fontSize: "14px", fontFamily: "Raleway" }}>
                        {content}</Typography>
                    )}
                    {messageBlock && messageBlock.length && messageBlock.map((block) => isCodeBlock(block) ?
                        <SyntaxHighlighter style={coldarkCold} language='javascript'>
                            {block}
                        </SyntaxHighlighter>
                        : <Typography sx={{ fontSize: "14px", fontFamily: "Raleway" }}>
                            {block}</Typography>)}

                </Box>
            </Box>)
    )
}

export default ChatItem
