import { Box, Heading, Stack, Input, Textarea, Button } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { bounceVariants } from './HomePage.js';


export default function ContactUsForm() {
    return (
        <AnimatePresence>
            <motion.div
                variants={bounceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'} as={'form'} mt={10}>
                    <Heading m={'10px'}>
                        Contact Us
                    </Heading>
                    <Stack spacing={4}>
                        <Input
                            placeholder="Name"
                            bg={'gray.100'}
                            borderRadius={'md'}
                        />
                        <Input
                            placeholder="Email"
                            type="email"
                            bg={'gray.100'}
                            borderRadius={'md'}
                        />
                        <Input
                            placeholder="Subject"
                            bg={'gray.100'}
                            borderRadius={'md'}
                        />
                        <Textarea
                            placeholder="Message"
                            bg={'gray.100'}
                            borderRadius={'md'}
                            minHeight={'150px'}
                        />
                        <Button colorScheme="blue" type="submit">
                            Send Message
                        </Button>
                    </Stack>
                </Box>
            </motion.div>
        </AnimatePresence>
    );
}