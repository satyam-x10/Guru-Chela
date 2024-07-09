import { Box, Textarea, Button, VStack } from '@chakra-ui/react';
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { saveNotes } from '../../redux/actions/other';
const Notes = ({user}) => {
    const [notes, setNotes] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if(user?.notes){
            setNotes(user?.notes)
        }
    }, []);

    const handleChange = (event) => {
        setNotes(event.target.value);
        // Save notes to localStorage whenever it changes
        // localStorage.setItem('notes', event.target.value);
        // Auto resize the textarea height
        adjustTextareaHeight();
    };

    const postNotes = async () => {
        if (notes.length > 3000) {
            toast.error("No more than 3k letters")
        }
        else {
          await saveNotes(notes,user?._id);
          toast.success("Updated")

        }
    }

    const adjustTextareaHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset the height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set the adjusted height
        }
    };

    return (
        <Box minH="100vh" p={4}>
            <VStack spacing={4} align="stretch">
                <Textarea
                    ref={textareaRef}
                    value={notes}
                    onChange={handleChange}
                    placeholder="Write your notes/To-Do List and anything here...You have a 3k letter limit"
                    size="lg"
                    minHeight="200px"
                    style={{ resize: 'none', overflow: 'hidden' }}
                    onFocus={adjustTextareaHeight}
                    onBlur={adjustTextareaHeight}
                />
                <Button onClick={postNotes} colorScheme="blue">Save</Button>
            </VStack>
        </Box>
    );
};

export default Notes;
