import React, { useEffect } from "react";
import {
	Table,
	Tbody,
	Tr,
	Td,
	TableContainer,
	useEditableControls,
	ButtonGroup,
	IconButton,
	Flex,
	Editable,
	EditablePreview,
	Input,
	EditableInput,
	Button,
	Tfoot,
	TableCaption,
	useToast,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clearUpdation, putUserUpdate } from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useNotifyError, useNotifySuccess } from "../../../customHooks/useNotifyError";

export function UserDetailsTable({user}) {
	const {loading,isUpdated,error } = useSelector(state=>state.IsUpdatedUser);

    
	function EditableComponent({ id, value }) {

		function EditableControls() {
			const {
				isEditing,
				getSubmitButtonProps,
				getCancelButtonProps,
				getEditButtonProps,
			} = useEditableControls();

			return isEditing ? (
				<ButtonGroup justifyContent='center' size='sm'>
					<IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
					<IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
				</ButtonGroup>
			) : (
				<Flex justifyContent='center'>
					<IconButton size='10' icon={<EditIcon />} {...getEditButtonProps()} />
				</Flex>
			);
		}

		const handleInputChange = (newValue) => {
			setUserData(prev => ({ ...prev, [id]: newValue }));
		};

		return (
			<Editable
				textAlign='center'
				justifyContent='center'
				alignItems='center'
				gap='15px'
				defaultValue={value}
				fontSize='1xl'
				display='flex'
				isPreviewFocusable={false}
				onSubmit={(newValue) => handleInputChange(newValue)}
			>
				<EditablePreview />
				<Input as={EditableInput} />
				<EditableControls />
			</Editable>
		);
	}
	
	const [userData, setUserData] = useState({
		username: user.username,
		email: user.email,
		phoneNumber: user.phoneNumber,
		city: user.city,
		nearestMetroStation: user.nearestMetroStation?.station_name,
		nearestRailStation: user.nearestRailStation?.station_name
	});
	const dispatch = useDispatch();
	const notifyError = useNotifyError();
    const notifySuccess = useNotifySuccess();
	const navigate = useNavigate();
	const handleNewInputSubmit =  (e) => {
		e.preventDefault();
		if(userData.phoneNumber.length != 10) {
			notifyError("Invalid phone number");
            return;
        }
		dispatch(putUserUpdate({
			...userData,
			nearestMetroStation: user.nearestMetroStation?._id,
			nearestRailStation: user.nearestRailStation?._id
		}));
	};
	
	useEffect(()=>{
		if(isUpdated) {
			notifySuccess("Profile updated successfully");
			dispatch(clearUpdation());
			navigate("/profile");
		}
		if(error) {
			notifyError(error);
			dispatch(clearUpdation());
		}
	},[isUpdated,error])

	
	return (
		<TableContainer>
			<Table variant>
				<TableCaption>
					<Button
						width={'100%'}
						isLoading={loading}
						bg={'blue.400'}
						onClick={handleNewInputSubmit}
						color={'white'}
						_hover={{
							bg: 'blue.500',
						}}
						spinnerPlacement='start'
					>Save changes</Button>
				</TableCaption>
				<Tbody>
					<Tr>
						<Td><strong>Username</strong></Td>
						<Td><EditableComponent id={"username"} value={userData.username} /></Td>
					</Tr>
					<Tr>
						<Td><strong>Email</strong></Td>
						<Td><EditableComponent id={"email"} value={userData.email} /></Td>
					</Tr>
					<Tr>
						<Td><strong>Phone Number</strong></Td>
						<Td><EditableComponent id={"phoneNumber"} value={userData.phoneNumber} /></Td>
					</Tr>
					<Tr>
						<Td><strong>City</strong></Td>
						<Td><EditableComponent id={"city"} value={userData.city} /></Td>
					</Tr>
					<Tr>
						<Td><strong>Nearest Metro Station</strong></Td>
						{/* <Td><EditableComponent id={"nearestMetroStation"} value={userData.nearestMetroStation} /></Td> */}
						<Td textAlign={'center'}>{userData.nearestMetroStation}</Td>
					</Tr>
					<Tr>
						<Td><strong>Nearest Rail Station</strong></Td>
						{/* <Td><EditableComponent id={"nearestRailStation"} value={userData.nearestRailStation} /></Td> */}
						<Td textAlign={'center'}>{userData.nearestRailStation} </Td>
					</Tr>
				</Tbody>
			</Table>
		</TableContainer>
	);
}
