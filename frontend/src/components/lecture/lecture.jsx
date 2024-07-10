import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLecture } from '../../redux/actions/lecture';
import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { RiDownload2Fill, RiHeadphoneFill } from 'react-icons/ri';
import { transcribeAudio } from '../../redux/actions/assemblyAI';
import jsPDF from 'jspdf';

const Lecture = () => {
  const { courseId, lectureId } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [lectureData, setLectureData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transcript, setTranscript] = useState('');
  console.log(courseId, lectureId);

  useEffect(() => {
    const fetchLectureData = async () => {
      try {
        const response = await getLecture(courseId, lectureId);
        const data = await response;
        console.log('data', data);
        setLectureData(data);
      } catch (error) {
        console.error('Error fetching lecture data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLectureData();
  }, [courseId, lectureId]);

  const getAudioTranscript = async () => {
    setTranscript('Loading transcribe...');

    onOpen(); // Open modal after fetching transcript
    const transcribe = await transcribeAudio(lectureData?.lecture?.video?.url);
    console.log('audio', transcribe);
    setTranscript(transcribe);

  };

  const downloadTranscript = () => {
    const title = lectureData?.lecture?.title || 'Untitled Lecture';
    const desc =
      lectureData?.lecture?.description || 'No description available';
    const url = window.location.href;

    const doc = new jsPDF();

    // Add title as a string
    doc.setFontSize(16);
    doc.text(title, 15, 15);
    doc.setTextColor(0, 0, 255); // Blue color for link
    doc.setFontSize(10);

    doc.textWithLink(`Open this lecture`, 40, 15, { url });
    doc.setFontSize(16);

    doc.setTextColor(0, 0, 0); // Blue color for link

    // Add description as a string
    doc.setFontSize(12);
    doc.text(desc, 15, 25);

    // Add transcript text
    const lines = doc.splitTextToSize(transcript, 180); // Adjust width as needed
    doc.setFont('times');
    doc.setFontSize(12);
    doc.text(lines, 15, 35);

    // Save the PDF with title
    doc.save(`${title}_transcript.pdf`);
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  return (
    <Box minHeight="90vh" p={4}>
      <Heading as="h1" mb={6}>
        Lecture Details
      </Heading>
      {lectureData.lecture ? (
        <Flex flexDirection={{ base: 'column', md: 'row' }} gap={4}>
          <Box flex="1" mb={{ base: 4, md: 0 }}>
            <video
              controls
              style={{ width: '100%', height: 'auto' }}
              src={
                lectureData?.lecture?.video?.url ||
                lectureData.lecture.thumbnail
              }
            />
            <HStack justify="space-between" spacing={4} m={4}>
              {lectureData.previousLecture && (
                <Button
                  onClick={() => {
                    window.location.href = `./${lectureData.previousLecture.id}`;
                  }}
                  colorScheme="teal"
                  leftIcon={<ArrowBackIcon />}
                >
                  Previous: {lectureData.previousLecture.title}
                </Button>
              )}
              {lectureData.nextLecture && (
                <Button
                  onClick={() => {
                    window.location.href = `./${lectureData.nextLecture.id}`;
                  }}
                  colorScheme="teal"
                  rightIcon={<ArrowForwardIcon />}
                >
                  Next: {lectureData.nextLecture.title}
                </Button>
              )}
            </HStack>
          </Box>
          <Box flex="1">
            <Heading as="h2" size="lg" mb={4}>
              {lectureData.lecture.title}
              {lectureData?.lecture?.video?.url
                .split('.')
                .pop()
                .toLowerCase() === 'mp3' ? (
                <Button
                  ml={2}
                  onClick={getAudioTranscript}
                  colorScheme="teal"
                  leftIcon={<RiHeadphoneFill />}
                >
                  Get Audio Transcript
                </Button>
              ) : (
                'video'
              )}
            </Heading>
            <Text mb={4}>{lectureData.lecture.description}</Text>
          </Box>
        </Flex>
      ) : (
        <Text>No lecture data found.</Text>
      )}

      {/* Modal for Transcript */}
      <Modal isOpen={isOpen}  onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{lectureData?.lecture?.title} Transcript</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>{lectureData?.lecture?.description}</Text>
            
              <Button
                onClick={downloadTranscript}
                colorScheme="teal"
                leftIcon={<RiDownload2Fill />}
                m={1}
              >
                Download Transcript as PDF
              </Button>
            
            {transcript.split('\n\n').map((para, index) => (
              <Text key={index} mb={4}>
                {para}
              </Text>
            ))}
            
              <Button
                onClick={downloadTranscript}
                colorScheme="teal"
                leftIcon={<RiDownload2Fill />}
              >
                Download Transcript as PDF
              </Button>
            
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Lecture;
