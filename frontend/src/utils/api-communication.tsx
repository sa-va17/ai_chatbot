import axios from "axios"

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password });
    if (res.status != 200) {
        throw new Error("Unable to login.")
    }

    const data = await res.data;
    return data;
};


export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");
    if (res.status != 200) {
        throw new Error("Unable to authenticate.")
    }

    const data = await res.data;
    return data;
}


export const sendChatRequest = async (message: string) => {
    const res = await axios.post("/chat/new", { message });
    if (res.status != 200) {
        throw new Error("Unable to send message.")
    }

    const data = await res.data;
    return data;
}

export const sendChatRequestGemini = async (message: string) => {
    const res = await axios.post("chat/new", { message })
    console.log(message)
    if (res.status != 200) {
        throw new Error("Unable to send message.")
    }
    const data = await res.data;
    return data;

}

export const retrieveUserChats = async () => {
    const res = await axios.get("chat/allChats")
    console.log(res)
    if (res.status != 200) {
        throw new Error("Unable to send message.")
    }
    const data = await res.data;
    return data;

}

export const deleteUserChats = async () => {
    const res = await axios.delete("chat/delete")
    console.log(res)
    if (res.status != 200) {
        throw new Error("Unable to send message.")
    }
    const data = await res.data;
    return data;

}


export const logoutUser = async () => {
    const res = await axios.get("user/logout")
    console.log(res)
    if (res.status != 200) {
        throw new Error("Unable to send message.")
    }
    const data = await res.data;
    return data;

}