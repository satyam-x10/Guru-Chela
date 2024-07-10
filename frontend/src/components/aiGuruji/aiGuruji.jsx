import React, { useState, useRef, useEffect } from 'react';
import { Box, Input, Button, VStack, HStack, Text, Spinner } from '@chakra-ui/react';
import { askGemini } from '../../redux/actions/gemini';

const AiGuruji = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async (event) => {
    event.preventDefault();
    if (input.trim() === '') return;
    const query = input;
    setInput('');
    const userMessage = { text: query, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    setLoading(true); // Set loading to true when starting to fetch AI response
    const aiResponse = await askGemini(query, 'ai');
    setLoading(false); // Set loading to false after getting the AI response

    const aiMessage = { text: aiResponse, sender: 'ai' };
    setMessages(prevMessages => [...prevMessages, aiMessage]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box minH="75vh" p={4} display="flex" flexDirection="column">
      <VStack spacing={4} align="stretch" flex={1} overflowY="hidden">
        <Box flex={1} overflowY="auto">
          {messages.map((message, index) => (
            <HStack
              key={index}
              justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}
            >
              <Box
                bg={message.sender === 'user' ? 'blue.500' : 'gray.500'}
                color="white"
                p={2}
                borderRadius="md"
                maxW="70%"
                mb={2}
              >
                <Text>{message.text}</Text>
              </Box>
            </HStack>
          ))}
          {loading && (
            <HStack justify="flex-start">
              <Box
                bg="gray.500"
                color="white"
                p={2}
                borderRadius="md"
                maxW="70%"
                mb={2}
                display="flex"
                alignItems="center"
              >
                <Spinner size="sm" mr={2} />
                <Text>Loading...</Text>
              </Box>
            </HStack>
          )}
          <div ref={messagesEndRef} />
        </Box>
      </VStack>
      <form onSubmit={handleSend}>
        <HStack mt={4}>
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your message..."
            flex={1}
          />
          <Button type="submit" colorScheme="blue" isDisabled={loading}>
            Send
          </Button>
        </HStack>
      </form>
    </Box>
  );
};

export default AiGuruji;
