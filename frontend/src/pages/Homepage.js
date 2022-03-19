import { Container , Box, Text , Tab ,Tabs ,TabList , TabPanels ,TabPanel} from '@chakra-ui/react';
import Login from './../components/Login';
import Signup from './../components/Signup';


const Homepage = () => {
    return (
        
        <Container maxWidth='xl' display='flex' className='container' >

            <div style={{flex : 1}}>
           
            </div>
           
            <div style={{flex : 1}}>
                <Box d="flex" justifyContent="center" p="3" bg="white" w="180%" m= '90px 0 15px 0' borderRadius='xl' borderWidth='1px' >
                    <Text fontSize='4xl' fontWeight="bolder" fontFamily='work-sans'> Chat Time</Text>
                </Box>

                <Box  p="4" bg="white" w="180%" borderRadius='lg' borderWidth='1px'>
                    <Tabs isFitted variant='enclosed' >
                        <TabList mb='1em'>
                            <Tab width='50%' > login </Tab>
                            <Tab width='50%'> sign up </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Login />
                            </TabPanel>
                            <TabPanel>
                                <Signup />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </div>
        </Container>
        
    )
}

export default Homepage;
