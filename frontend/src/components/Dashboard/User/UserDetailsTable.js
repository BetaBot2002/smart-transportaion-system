import React from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import {useSelector,useDispatch} from "react-redux" 
import { useEffect, useState } from 'react'
import { EditableComponent } from "./UserEditControl.js"; 
export function UserDetailsTable({user}) {
  
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
            <Td><strong>City</strong></Td>
            <Td><EditableComponent value={user.city}/></Td>
          </Tr>
          <Tr>
            <Td><strong>NearestMetroStation</strong></Td>
            <Td><EditableComponent value={user.nearestMetroStation}/></Td>
          </Tr>
          <Tr>
            <Td><strong>NearestRailStation</strong></Td>
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
