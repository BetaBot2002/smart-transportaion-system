import {
	Input,
	Box,
	UnorderedList,
	ListItem,
	Button,
	FormControl,
	FormLabel,
	useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLRUtrains, getTrainStatus, setLRUtrains } from "../../redux/actions/trainActions";
import { useNavigate } from "react-router-dom";
import TrainInfoCard from "./TrainInfoCard.js";
import trainFile from '../../assets/trainNoList.txt'

export default function TrainSearch() {
	const [openTrainNumbers, setOpenTrainNumbers] = useState(false);
	const [filteredTrainNumbers, setFilteredTrainNumbers] = useState([]);
	const [trainNo, setTrainNo] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const toast = useToast();
	const { loading, data, error } = useSelector((state) => state.GetTrainStatus);
	const [trainNumbers, setTrainNumbers] = useState([]);
	useEffect(() => {
		fetch(trainFile)
			.then((response) => response.text())
			.then((data) => {
				const trains = data.split("\n").map((line) => line.trim());
				setTrainNumbers(trains);
			})
			.catch((error) => console.error("Error reading file:", error));
	}, []);

	const filterTrainNumbers = (trainInput) => {
		return trainNumbers.filter((train) =>
			train.toLowerCase().startsWith(trainInput.toLowerCase())
		);
	};

	const handleTrainSelection = (train) => {
		setTrainNo(train);
		setOpenTrainNumbers(false);
	};
	useEffect(() => {
		dispatch(getLRUtrains());
	}, [])
	useEffect(() => {


		if (error) {
			toast({
				title: "Invalid",
				description: error,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	}, [error]);

	const handleSearch = () => {
		setOpenTrainNumbers(false);
		dispatch(getTrainStatus(trainNo.slice(0, 5)));
		dispatch(setLRUtrains(trainNo));
	};

	return (
		<Box>
			<FormControl id="trainNo" mb={4}>
				<FormLabel>Train Number</FormLabel>
				<Input
					type="text"
					onChange={(e) => {
						setTrainNo(e.target.value);
						const trains = filterTrainNumbers(e.target.value);
						setFilteredTrainNumbers(trains.slice(0,10));
						setOpenTrainNumbers(e.target.value.length > 0);
					}}
					value={trainNo}
					placeholder="Train Number"
					autoComplete="off"
				/>
				{openTrainNumbers && (
					<Box
						bg="white"
						boxShadow="md"
						border="1px solid gray"
						w="100%"
						p={2}
						mt={1}
						borderRadius="md"
						maxH="150px"
						overflowY="auto"
					>
						<UnorderedList styleType="none">
							{filteredTrainNumbers.map((train, index) => (
								<ListItem
									key={index}
									onClick={() => handleTrainSelection(train)}
									cursor="pointer"
									p={2}
									borderRadius="md"
									_hover={{ backgroundColor: "teal.100" }}
									_active={{ backgroundColor: "teal.200" }}
								>
									{train}
								</ListItem>
							))}
						</UnorderedList>
					</Box>
				)}
			</FormControl>

			<Button
				isLoading={loading ? true : false}
				w="100%"
				colorScheme="teal"
				onClick={handleSearch}
			>
				Search
			</Button>
			{data && data.data && <TrainInfoCard data={data.data} />}
		</Box>
	);
}
