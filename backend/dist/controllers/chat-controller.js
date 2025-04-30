import User from "../models/User.js";
import { geminiConfig } from "../config/gemini-config.js";
export const generateChatCompeletion = async (req, res, next) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401)
                .json({ message: "User not registerd. Please register to use the chat." });
        }
        const allChats = user.chats.map((chat, index) => ({
            role: chat.role,
            content: chat.content
        }));
        allChats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        //using gemini api
        const genModel = geminiConfig();
        // Assuming the Gemini API expects an array of messages for context, build the request
        const geminiRequestBody = {
            content: allChats, // Send the user's chat history along with the new message
        };
        const result = await genModel.generateContent(message);
        const reply = result.response.text();
        user.chats.push({ content: reply, role: "assistant" });
        await user.save();
        return res.status(200).json({ reply: reply });
    }
    catch (error) {
        console.error('Error in generateChatCompletion:', error.response ? error.response.data : error.message);
        return res.status(500).json({ error: 'Failed to communicate with the Google Gemini API.' });
    }
    //   //get old chats
    //   const allChats = user.chats.map((chat, index) =>
    //   ({
    //     role: chat.role,
    //     content: chat.content
    //   })) as ChatCompletionRequestMessage[];
    //   //send new chat to openai
    //   const config = openaiConfig();
    //   //fetching open ai api.
    //   const openai = new OpenAIApi(config);
    //   //getting latest chat response from ai
    //   const chatResponse = await openai.createChatCompletion({
    //     model: "gpt-4o",
    //     messages: allChats
    //   })
    //   user.chats.push(chatResponse.data.choices[0].message); //pushing the new response to the original user chat array
    //   await user.save()
    //   return res.status(200).json({ chats: user.chats })
    // } catch (error) {
    //   console.log(error)
    //   return res.status(500).json({ message: "Something went wrong." })
    // }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        //verify user token.
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User doesn't exist or token authentication failed.");
        }
        if (user.id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Unauthorized action.");
        }
        return res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        return res.status(404).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        //verify user token.
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User doesn't exist or token authentication failed.");
        }
        if (user.id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Unauthorized action.");
        }
        //@ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        return res.status(404).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controller.js.map