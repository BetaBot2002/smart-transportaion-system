import React from "react";
import { Heading, Box, Image, IconButton, useBreakpointValue, Stack, HStack, VStack, SimpleGrid, Icon, Container, Text } from "@chakra-ui/react";
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import { CheckIcon } from "@chakra-ui/icons";
// Helper component to display sections with image and text
function Helper({ imageUrl, textHeading, textContent, reverse = false }) {
    return (
        <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexWrap={'wrap'}
            p={6}
            borderRadius={'md'}
            flexDirection={reverse ? 'row-reverse' : 'row'} // Adjust layout based on reverse flag
        >
            <Box p={4}>
                <Image
                    borderRadius='20px'
                    boxSize='250px'
                    src={imageUrl}
                    alt={textHeading}
                />
            </Box>
            <Box p={4} maxW="500px">
                <Heading as='h2' size='xl' mb={6}>
                    {textHeading}
                </Heading>
                <Text fontSize="lg">
                    {textContent}
                </Text>
            </Box>
        </Box>
    );
}

// SlidingAnimation component for the carousel
function SlidingAnimation() {

    const cards = [
        {
            title: 'User-Centric Design',
            text: "Our system is designed for ease of use, allowing travelers to quickly search for routes and stations.",
            image: 'https://www.maptive.com/wp-content/uploads/2021/03/route-planner-multiple-stops-routes.jpg',
        },
        {
            title: 'Real-time Route Search',
            text: "Find the fastest routes between railway and metro stations.",
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAcT52-ejYxpF5UuyEJSFsN0pgPtIpUHTqyg&s',
        },
        {
            title: 'Saved Favorites',
            text: "Users can manage their favorite stations and routes.",
            image: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/202012/Screenshot_2020-12-07_at_1.44._1200x768.png?size=690:388',
        },
        {
            title: 'Shortest Path Algorithm',
            text: "We use an advanced algorithm to suggest the quickest routes between stations.",
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsb-jrcE8Vr11MPoRuOtZGtvIwPyg6xXxqcQ&s',
        },
        {
            title: 'Personalized Experience',
            text: "Users can save their favorite routes, check previous searches, and receive tailored suggestions.",
            image: 'https://www.lifewire.com/thmb/9LILR_bPSZLFbsxlvr5gA-a3EsI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1047578412-692fa117cf86450287d8873eeb1a95c8.jpg',
        },
        {
            title: 'Secure Payments',
            text: "Our integration with Stripe allows for secure in-app payments.",
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXa_IvYAo6UBJ5KPtIhHbh09SCSQda_sxv0w&s',
        }
    ];


    return (
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
                <Heading fontSize={'3xl'}>Our Key Features</Heading>
                <Text color={'gray.600'} fontSize={'xl'}>
                    Discover the standout features of our service designed to enhance your experience. Each feature is tailored to provide you with seamless functionality and unparalleled ease of use, ensuring you get the most out of our platform.
                </Text>
            </Stack>

            <Container maxW={'6xl'} mt={10}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                    {cards.map((feature, index) => (
                        <HStack key={index} align={'top'}>
                            <Box color={'green.400'} px={2}>
                                <Icon as={CheckIcon} />
                            </Box>
                            <VStack align={'start'}>
                                <Text fontWeight={600}>{feature.title}</Text>
                                <Text color={'gray.600'}>{feature.text}</Text>
                            </VStack>
                        </HStack>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}


const FAQDropdown = () => {
    const faqs = [
        {
            question: 'What is the purpose of this platform?',
            answer: 'Our platform aims to streamline urban transportation by connecting railway and metro systems, providing users with real-time data and efficient route management.',
        },
        {
            question: 'How does the route search work?',
            answer: 'The route search utilizes an advanced algorithm to suggest the fastest routes between stations, taking into account real-time data and user preferences.',
        },
        {
            question: 'Can I save my favorite routes?',
            answer: 'Yes, users can save their favorite routes and stations for quick access and receive tailored suggestions based on their saved preferences.',
        },
        {
            question: 'Is my payment information secure?',
            answer: 'We use Stripe for secure payment processing, ensuring that all transactions are encrypted and secure.',
        },
        {
            question: 'How do I log in to the platform?',
            answer: 'You can log in using JWT or Google OAuth for a secure and convenient authentication process.',
        },
    ];

    return (
        <Container maxW={'6xl'} py={8} centerContent>
            <Box maxW={'3xl'} width={'100%'} py={8} px={4} bg={'gray.50'} borderRadius={'md'} boxShadow={'md'}>
                <Heading mb={6} textAlign="center" color={'teal.600'}>
                    Frequently Asked Questions
                </Heading>
                <Accordion allowToggle>
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} border='none' borderBottom='1px solid' borderColor='gray.200'>
                            <h2>
                                <AccordionButton _expanded={{ bg: 'teal.100', color: 'teal.600' }} borderRadius='md'>
                                    <Box as='span' flex='1' textAlign='left'>
                                        {faq.question}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={4} bg={'white'} borderRadius={'md'} boxShadow={'sm'}>
                                <Text color={'gray.600'}>{faq.answer}</Text>
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Box>
        </Container>
    );
};

export default function AboutUs() {
    return (
        <>
            <Helper
                textHeading={"Our Mission"}
                imageUrl={"https://www.thedigitalspeaker.com/content/images/2023/10/Futureo-of-Mobility-Keynote-Speaker.jpg"}
                textContent={"At Smart Transportation System, our mission is to streamline and enhance urban transportation by creating a seamless connection between railway and metro networks. Our solution empowers users with real-time data, easy route management, and personalized transit experiences to help them navigate the complexities of urban travel with ease."}
            />

            <Helper
                reverse // Alternate the layout
                textHeading={"Our Vision"}
                imageUrl={"https://media.licdn.com/dms/image/D4D12AQFcZWsLKCZHTA/article-cover_image-shrink_720_1280/0/1675233967837?e=2147483647&v=beta&t=7y3zMjxXxKMHJ5lz0dSAZwewvvUIj6KfHXyi4Cyp5PY"}
                textContent={"We envision a future where urban transit is seamless, reducing travel time and making commutes stress-free. By integrating railway and metro systems, we aim to create a transportation experience that’s efficient, eco-friendly, and easy to use for everyone."}
            />

            <Helper
                textHeading={"Our Values"}
                imageUrl={"https://media.licdn.com/dms/image/D5612AQEUUZqUIs1PZA/article-cover_image-shrink_720_1280/0/1705559284860?e=2147483647&v=beta&t=slVttKjQhdnCz-BN7LKpX5STWnEtwCVMmgD5HVyhKy0"}
                textContent={"We believe in innovation, efficiency, and user-centric solutions. Our commitment to continuous improvement and sustainability drives us to create smarter transportation options for cities of the future."}
            />

            <SlidingAnimation />
            <FAQDropdown />

        </>
    );
}
