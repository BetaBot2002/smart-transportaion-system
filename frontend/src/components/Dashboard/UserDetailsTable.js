import React from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { EditableComponent } from "./UserEditControl.js"; 
export function UserDetailsTable() {
  const isAdmin = true;
  const user = {
    name: 'John Doe',
    username: 'john_doe123',
    email: 'johndoe@example.com',
    phoneNumber: 2242829842,
    role: 'admin', // change to 'user' to see the regular user view
    city:"Kolkata",
    nearestMetroStation:"Kanchrapara",
    nearestRailStation:"Dum Dum",
    favouriteRoutes: ['Station A to Station B', 'Station C to Station D'],
  };
  
  return (
    <TableContainer>
      <Table variant>
        <Tbody>
          <Tr>
            <Td><strong>Username</strong></Td>
            <Td><EditableComponent value={user.username}/></Td>
          </Tr>
          <Tr>
            <Td><strong>Email</strong></Td>
            <Td><EditableComponent value={user.email}/></Td>
          </Tr>
          <Tr>
            <Td><strong>Phone Number</strong></Td>
            <Td><EditableComponent value={user.phoneNumber}/></Td>
          </Tr>
          
          <Tr>
            <Td><strong>nearestMetroStation</strong></Td>
            <Td><EditableComponent value={user.nearestMetroStation}/></Td>
          </Tr>
          <Tr>
            <Td><strong>nearestRailStation</strong></Td>
            <Td><EditableComponent value={user.nearestRailStation}/></Td>
          </Tr>
          <Tr>
            <Td><strong>Favourite Routes</strong></Td>
            <Td>DropDown will be added</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}
