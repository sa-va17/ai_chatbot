import { styled, TextField } from '@mui/material'
import React from 'react'

type Props = {
    name: string,
    type: string,
    label: string
}

const CustomInput = (props: Props) => {
    return (
        <TextField
            margin='normal'
            InputLabelProps={{ style: { color: "white", fontFamily: "Raleway" } }}
            inputProps={{
                style: {
                    width: "400px",
                    borderRadius: 10,
                    borderColor: "white",
                    fontSize: 15,
                    fontFamily: "Raleway, Lucida Sans",
                    color: "white"
                }
            }}
            name={props.name}
            type={props.type}
            label={props.label} />
    )
}

export default CustomInput
