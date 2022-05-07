import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from 'axios'

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [password, setPassword] = useState('');
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    if (name === '' || email === '' || password === '' || confirmpassword === '') {
      toast({
        title: "Please fill all the details",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords don't match",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        header: {
          "Content-type": "application/json"
        }
      }

      const postData = pic === undefined ? { name, email, password } : { name, email, password, pic };
      const { data } = await axios.post('/api/user', postData, config);
      toast({
        title: "Registration Success!",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      history.push('/chats');
    } catch (err) {
      toast({
        title: "OOPS user registration failed",
        description: err?.response?.data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      console.log(err);
    }
  };

  const postDetails = (pic) => {
    if (pic !== undefined && (pic.type === 'image/jpeg' || pic.type === 'image/png')) {
      setLoading(true);
      const data = new FormData();
      data.append('file', pic);
      data.append('upload_preset', 'lets-chat');
      data.append('cloud_name', 'yash-cloudinary');
      fetch('https://api.cloudinary.com/v1_1/yash-cloudinary/image/upload', {
        method: 'POST',
        body: data
      }).then(res => res.json())
        .then(data => {
          setPic(data.url.toString());
          setLoading(false)
        }).catch(err => {
          console.log(err);
          setLoading(false)
        })
    } else {
      toast({
        title: "OOPS error uploading image!",
        description: "Either choose jpeg or a png file. Omit display picture selection for default image.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="teal"
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