import React, { useState } from 'react';
import { Box, IconButton, useBreakpointValue,Stepper, Container,useSteps, Stack, Heading, Text, Button, Link, SimpleGrid, Icon, Input, Textarea, Step, StepIndicator, StepIcon, StepNumber, StepTitle, StepDescription, StepSeparator, StepStatus } from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import { MdTrackChanges } from "react-icons/md";
import { FaNetworkWired } from "react-icons/fa";
import { GiAbacus } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import { motion, AnimatePresence } from 'framer-motion';
// Motion variants for animation
const bounceVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 50 } }
};

function SliderWithImage() {
    const [slider, setSlider] = useState(null);

    const top = useBreakpointValue({ base: '90%', md: '50%' });
    const side = useBreakpointValue({ base: '30%', md: '10px' });

    // Dynamically set the height and width based on screen size
    const containerHeight = useBreakpointValue({ base: '50vh', md: '80vh', lg: '100vh' });
    const imageSize = useBreakpointValue({ base: '90%', md: '80%', lg: '100%' });

    const cards = [
        {
            url: 'https://etimg.etb2bimg.com/photo/103791968.cms',
            title: 'Seamless Metro Integration',
            text: 'Connecting metro systems with railways to streamline your daily commute.',
        },
        {
            url: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Kolkata_Metro_CRRC_Dalian_rake_2.png',
            title: 'Advanced Technology',
            text: 'Leveraging cutting-edge technology for real-time updates and optimized routes.',
        },
        {
            url: 'https://assets-news.housing.com/news/wp-content/uploads/2021/05/28205417/DMRC-metro-rail-network-All-you-need-to-know-FB-1200x700-compressed.jpg',
            title: 'Smart Transportation',
            text: 'A smarter way to travel with integrated systems and user-friendly features.',
        },
    ];

    const settings = {
        dots: true,
        arrows: false,
        fade: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Box height={containerHeight} width="full" overflow="hidden" position="relative">
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />

            <IconButton
                aria-label="left-arrow"
                colorScheme="messenger"
                borderRadius="full"
                position="absolute"
                left={side}
                top={top}
                transform="translate(0%, -50%)"
                zIndex={2}
                onClick={() => slider?.slickPrev()}
            >
                <BiLeftArrowAlt />
            </IconButton>

            <IconButton
                aria-label="right-arrow"
                colorScheme="messenger"
                borderRadius="full"
                position="absolute"
                right={side}
                top={top}
                transform="translate(0%, -50%)"
                zIndex={2}
                onClick={() => slider?.slickNext()}
            >
                <BiRightArrowAlt />
            </IconButton>

            <Slider {...settings} ref={setSlider}>
                {cards.map((card, index) => (
                    <Box
                        key={index}
                        height={containerHeight}
                        backgroundPosition="center"
                        backgroundRepeat="no-repeat"
                        backgroundSize="cover"
                        backgroundImage={`url(${card.url})`}
                        width={imageSize} // Set image width dynamically
                    >
                        <Container size="container.lg" height="100%" position="relative">
                            <Stack
                                spacing={6}
                                w={'full'}
                                maxW={'lg'}
                                position="absolute"
                                top="50%"
                                transform="translate(0, -50%)"
                            >
                                <Heading
                                    fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                                    color="white"
                                    textShadow="1px 1px 2px black"
                                >
                                    {card.title}
                                </Heading>
                                <Text fontSize={{ base: 'md', lg: 'lg' }} color="white" textShadow="1px 1px 2px black">
                                    {card.text}
                                </Text>
                                <Button colorScheme="pink" variant={'solid'} width={'90%'}>
                                    <Link _hover={{ textDecoration: 'none' }} href="/routes">
                                        Search Routes
                                    </Link>
                                </Button>
                            </Stack>
                        </Container>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}

function StepperForUser() {
    const steps = [
        {
            title: 'Input Your Journey Details',
            description: 'Enter your starting station and destination. Our system will gather real-time data from metro and railway networks to suggest the fastest and most convenient routes for you.'
        },
        {
            title: 'Receive Optimal Routes & Real-Time Updates',
            description: 'Get instant recommendations for your route based on the latest schedules. You will receive real-time updates on train and metro timings, platform numbers, and potential delays to ensure a hassle-free journey.'
        },
        {
            title: 'Enjoy a Seamless Journey',
            description: 'After booking, sit back and enjoy your journey. Whether you’re on the metro or a train, our system keeps you updated on any changes in real-time. Arrive at your destination efficiently and stress-free.'
        }
    ];

    const { activeStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    return (
        <AnimatePresence>
            <motion.div
                    variants={bounceVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
        <Box display={'flex'} justifyContent={'center'} m={'4%'} px={{ base: 4, md: 8 }}>
            <Stepper index={activeStep} orientation='vertical' height='auto' gap='6'>
                {steps.map((step, index) => (
                    <Step m={'4%'} key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <Box flexShrink='0' textAlign={'center'}>
                            <StepTitle fontSize={{ base: 'md', md: 'lg' }}>
                                <Heading fontSize={'lg'}> {step.title} </Heading>
                            </StepTitle>
                            <StepDescription fontSize={{ base: 'sm', md: 'md' }}>
                                <Container>
                                    {step.description}
                                </Container>
                            </StepDescription>
                        </Box>
                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
        </Box>
        </motion.div>
        </AnimatePresence>
    );
}

function MobilePresentation() {
    const steps = [
        {
            title: 'Input Your Journey Details',
            description: 'Enter your starting station and destination. Our system will gather real-time data from metro and railway networks to suggest the fastest and most convenient routes for you.'
        },
        {
            title: 'Receive Optimal Routes & Real-Time Updates',
            description: 'Get instant recommendations for your route based on the latest schedules. You will receive real-time updates on train and metro timings, platform numbers, and potential delays to ensure a hassle-free journey.'
        },
        {
            title: 'Enjoy a Seamless Journey',
            description: 'After booking, sit back and enjoy your journey. Whether you’re on the metro or a train, our system keeps you updated on any changes in real-time. Arrive at your destination efficiently and stress-free.'
        }
    ];
    return (
        <AnimatePresence>
            {steps.map((step, index) => (
                <motion.div
                    key={index}
                    variants={bounceVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <Box padding={'5%'} textAlign={'center'}>
                        <Heading fontSize={'lg'}> {step.title} </Heading>
                        <Container>
                            {step.description}
                        </Container>
                    </Box>
                </motion.div>
            ))}
        </AnimatePresence>
    );
}
const ContactUsForm = () => {
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
    const WhySmartTransportationComponent = () =>{
        return (
            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} margin={'4%'} px={{ base: 4, md: 8 }}>
                <Heading m={'4%'} fontSize={{ base: '2xl', md: '2xl', lg: '3xl' }} mb={4}>
                    Why Choose Our Smart Transportation System?
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} px={{ base: 4, md: 8 }} textAlign={'center'}>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        <Icon as={FaNetworkWired} boxSize={12} color="pink.500" mb={4} />

                        <Box>
                            <Heading fontSize="lg">Real-Time Tracking</Heading>
                            <Text mt={2}>
                                Effortlessly connects metro and railway systems, ensuring a smooth and hassle-free commute with unified ticketing and scheduling.
                            </Text>
                        </Box>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        <Icon as={MdTrackChanges} boxSize={12} color="pink.500" mb={4} />
                        <Box>
                            <Heading fontSize="lg">Seamless Connectivity</Heading>
                            <Text mt={2}>
                                Stay informed with real-time updates on metro and train schedules to avoid delays.
                            </Text>
                        </Box>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        <Icon as={GiAbacus} boxSize={12} color="pink.500" mb={4} />
                        <Box>
                            <Heading fontSize="lg">Efficient Route Planning</Heading>
                            <Text mt={2}>
                                We simplify your commute by seamlessly connecting railways with metro systems, helping you travel faster and more efficiently.
                            </Text>
                        </Box>
                    </Box>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                        <Icon as={AiOutlineUser} boxSize={12} color="pink.500" mb={4} />
                        <Box>
                            <Heading fontSize="lg">User-Friendly Interface</Heading>
                            <Text mt={2}>
                                Enjoy a modern and intuitive interface designed to provide the best user experience.
                            </Text>
                        </Box>
                    </Box>
                </SimpleGrid>
            </Box>
        )
    }
    export default function HomePage() {
        const isMobile = useBreakpointValue({ base: true, md: false });
    
        return (
            <Box>
                <SliderWithImage />
                <WhySmartTransportationComponent/>
                {isMobile ? <MobilePresentation /> : <StepperForUser />}
                <ContactUsForm />
            </Box>
        );
    }
    
