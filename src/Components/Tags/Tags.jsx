import React, { useState } from 'react';
import { Box, Button, Input, Tag, TagLabel, TagCloseButton, VStack, Wrap, WrapItem } from '@chakra-ui/react';
import { ContextAPI } from '../../ContextAPI/Context.API';

const Tags = () => {

    const [input, setInput] = useState('');
    const { tags, setTags } = ContextAPI();

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInput(value);
    };

    const handleAddTag = (tag) => {
        if (!tags.includes(tag) && tag.length > 0) {
            setTags([...tags, tag]);
            setInput('');
        }
    };

    const handleRemoveTag = (tag) => {
        setTags(tags.filter(t => t !== tag));
    };

    return (
        <Box className="tag-input" width="100%" p="4" borderWidth="1px" borderRadius="lg">
            <Wrap className="tag-input__tags" spacing="4" mb="4" width="100%">
                {tags.map(tag => (
                    <WrapItem key={tag}>
                        <Tag size="md" borderRadius="full" variant="solid" bg="#a20000" color="white">
                            <TagLabel>#{tag}</TagLabel>
                            <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                        </Tag>
                    </WrapItem>
                ))}
            </Wrap>
            <VStack spacing="4" width="100%">
                <Box className="tag-input__input-container" display="flex" width="100%">
                    <Input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Enter a tag"
                        flex="1"
                        mr="2"
                    />
                    <Button onClick={() => handleAddTag(input)} bg="#a20000" variant='solid' color='white'>Add Tag</Button>
                </Box>
            </VStack>
        </Box>
    );
};

export default Tags;
