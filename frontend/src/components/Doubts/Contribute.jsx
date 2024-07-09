import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button, // Import Button component from Chakra UI
} from '@chakra-ui/react';
import axios from 'axios'; // Import Axios for HTTP requests
import { getDoubtById } from '../../redux/actions/doubt'; // Adjust the path to where your action is defined


const Contribute = () => {
  const { id: ticketID } = useParams(); // Get the doubtID from the route parameters

  const [doubt, setDoubt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [aiResult, setAiResult] = useState(''); // State to store AI result

  const { GoogleGenerativeAI } = require('@google/generative-ai');

  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(
    'AIzaSyDpjZeYXK_uh74AH4e2fwBOD0Q0X5WpvP4'
  );

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDoubtById(ticketID);
        setDoubt(data?.ticket);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticketID]);

  const handleAskAI = async () => {
    setAiResult('Loading...');
    try {
      const prompt = `I have a doubt. The topic is ${doubt?.title}. The description of the doubt is ${doubt?.description}`;

      // Assume `model` is already initialized with Google Generative AI

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
       text = text.replace(/\*\*|\*|\d+\./g, ''); // Remove markdown and numbered list markers

    // Convert Markdown to HTML

    setAiResult(text);
    } catch (error) {
      setAiResult('Some Error happened')
    }
  };

  if (loading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </Box>
    );
  }

  return (
    <Box minH="100vh" p={4}>
      <Text fontSize="4xl" mb={4} fontWeight="bold">
        {doubt?.title}
      </Text>

      <Text>{doubt?.description}</Text>
      <Text>{new Date(doubt?.createdAt).toLocaleString()}</Text>

      <Button mt={4} onClick={handleAskAI}>
        Ask AI
      </Button>

      {aiResult && (
        <Box mt={4}>
          <Text fontWeight="bold">AI Response:</Text>
          <Text>{aiResult}</Text>
        </Box>
      )}
    </Box>
  );
};

export default Contribute;
