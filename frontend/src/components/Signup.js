import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from '@chakra-ui/react'
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
 
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [loading , setLoading] =  useState(false);
  
  const navigate  = useNavigate();
  const toast = useToast()

  
  const postDetails = (pic) => {
    setLoading(true);
    if(pic === undefined){
      toast({
        title: 'Please select an Image.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position : "bottom"
      })
      return ;
    }
    if(pic.type === 'image/jpeg' || pic.type === 'image/png'){
      const data = new FormData();
      data.append("file" , pic);
      data.append("upload_preset" , "chat_app1");
      data.append("cloud_name" , "salmanshaik")
      
      // to send pic to cloudniary 
      fetch('https://api.cloudinary.com/v1_1/salmanshaik/image/upload' , {
        method : 'post' ,
        body : data
      })
      .then(res => res.json())
      .then(data => {
        setPic(data.url.toString());
        console.log(data)
        setLoading(false);
      })
      .catch(err=>{
        console.log(err);
        setLoading(false);
      })
      
    }else{
      toast({
        title: 'Invalid Image',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position : "bottom"
      })
      setLoading(false);
      return ;
    }
  };
  
  const submitHandler = async () => {

      if(!name || !email || !confirmpassword || !password){

        toast({
          title: 'Check all the fields',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position : "bottom"
        })
        
      }
      if(password !== confirmpassword){

        toast({
          title: `Password doesn't match` ,
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position : "bottom"
        })
       
      }

      try {

        const config = {
          headers : {
            "Content-type" : "application/json"
          }
        }

        const {data} = await axios.post( "/api/user" , { name ,email ,password,pic},config); 

        toast({
          title: `Registration is sussesful` ,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position : "bottom"
        })

        localStorage.setItem('userInfo' , JSON.stringify(data))
        setLoading(false);
        // to navigate to chats
        navigate("/chats")

      } catch (error) {
        toast({
          title: `Error occured !!!` ,
          description : error.response.data.message ,
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position : "bottom"
        })
        setLoading(false);
      }
  };
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          style={{borderStyle : 'none'}}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
       isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;