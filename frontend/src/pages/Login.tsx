import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CustomInput from '../components/shared/CustomInput'
import { IoLogIn } from 'react-icons/io5'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing In", { id: "login" })
      await auth?.login(email, password);
      toast.success("Sucessfully signed in 😊", { id: "login" });
      navigate("/chat")
    } catch (error) {
      console.log(error);

      toast.error("Oops, can't sign you in ☹️", { id: "login" })
    }

  }
  return (
    <Box width={'100%'} height={'100%'} display={'flex'} flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img className="img-inverted" src='ai-chat-logo.png' alt='logo' style={{ width: '350px' }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ md: "1", sm: "0.5", xs: "0.5" }}
        justifyContent={'center'}
        alignItems={'center'}
        padding={2}
        ml={'auto'}
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 25px #FFFFFF",
            borderRadius: "10px",
            border: "none"
          }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
            <Typography variant='h4'
              textAlign={'center'}
              padding={2}
              fontWeight={600}>
              Login
            </Typography>
            <CustomInput type="email" name='email' label='Email' ></CustomInput>
            <CustomInput type="password" name='password' label='Password'></CustomInput>
            <Button type="submit" sx={{
              px: 1, py: 1, mt: 3, ml: 2, mr: 2,
              fontSize: "20px",
              color: "white",
              width: "400px",
              borderRadius: 2,
              bgcolor: "#27899A",
              justifySelf: "center",
              ":hover": {
                bgcolor: "white",
                color: "black"
              }
            }}
              endIcon={<IoLogIn />}
            >SUBMIT</Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

export default Login
