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
  Button,
  HStack,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { getDoubtById, addCommentToTicket } from '../../redux/actions/doubt'; // Adjust the path to where your action is defined
import { askGemini } from '../../redux/actions/gemini';

const Contribute = ({ user }) => {
  const { id: ticketID } = useParams(); // Get the doubtID from the route parameters

  const [doubt, setDoubt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aiResult, setAiResult] = useState(''); // State to store AI result
  const [newComment, setNewComment] = useState(''); // State to store new comment
  const [submitting, setSubmitting] = useState(false); // State to handle submitting status

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
    const res = await askGemini(doubt, 'doubt');
    setAiResult(res);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    setSubmitting(true);

    try {
      const updatedDoubt = await addCommentToTicket({userId:user?._id,ticketID,  message: newComment} );
      setNewComment(''); // Clear the input field after successful submission
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
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
      <Box mt={6}  maxH="100vh" overflowY="auto">
        <Text fontSize="2xl" fontWeight="bold">
          Conversation
        </Text>
        <VStack spacing={1} mt={4} mx={3} align="stretch">
          {doubt?.chats?.map((chat, index) => (
            <Box
              key={index}
              p={2}
              borderWidth={1}
              borderRadius="md"
              alignSelf={chat?.sender === user?._id ? 'flex-end' : 'flex-start'}
              bg={chat?.sender === user?._id ? 'teal' : 'orange'}
            >
              <HStack spacing={1}>
                <VStack align="start">
                  <Text>{chat?.message}</Text>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
        <Box mt={4}>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type your comment here..."
            isDisabled={submitting}
          />
          <Button mt={2} onClick={handleCommentSubmit} isLoading={submitting} isDisabled={!newComment.trim()}>
            Add Comment
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Contribute;
