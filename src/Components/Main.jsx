import { VStack,Box,Heading } from "@chakra-ui/react";
import Card from "./Card";
import { ContextAPI } from '../ContextAPI/Context.API';





const CardList = () => {
    const {data} = ContextAPI()
    console.log(data)
  return (
    <VStack spacing={4} align="stretch" paddingLeft={'40px'} paddingRight={'40px'} paddingTop={'20px'}>
      {data.length?data.map((item) => (
        <Card
          key={item._id}
          imageURL={item.ImageURL}
          title={item.title}
          description={item.Description}
          date={item.Date}
          header = {item.header}
          _id={item._id}
          uuid = {item.uuid}
        />
      )):   <Box
      
    
      textAlign="center"
    >
      <Heading as="h1" size="lg" color="gray.500">
        You have not created any news Yet!
      </Heading>
    </Box>}
    </VStack>
  );
};


export default CardList