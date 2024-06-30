import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const IconBox = props => {
  return (
    <Link
      to={`/${props.url}`}
      style={{
        display: 'inline-block',
        position: 'relative',
        marginTop: '8px', // Adjust margin as needed
      }}
    >
      <Button
        variant="ghost"
        fontSize="larger"
        colorScheme={props.active ? 'teal' : 'transparent'}
        style={{
          paddingBottom: '4px', // Adjust padding as needed
          position: 'relative', // Ensure the pseudo-element is positioned relative to the Button
        }}
      >
        <props.Icon style={{ margin: '6px' }} />
        {props.title}
        <span
          style={{
            position: 'absolute',
            left: 0,
            bottom: '-2px', // Adjust bottom position as needed
            width: '100%',
            height: '4px', // Adjust underline thickness as needed
            backgroundColor: props.active ? 'teal' : 'transparent', // Match with your color scheme
            transition: 'background-color 0.3s', // Smooth transition for underline color change
          }}
        />
      </Button>
    </Link>
  );
};

export default IconBox;
