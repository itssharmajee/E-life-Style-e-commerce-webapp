import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "@/store/admin/userSlice";

function AdminFeatures() {
  const dispatch = useDispatch();

  const { users, isLoading, error } = useSelector(
    (state) => state.adminUsersDetails
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="text-center font-bold text-foreground text-2xl mb-6">List of Users</div>
      <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] font-bold">User Name</TableHead>
            <TableHead className="w-[250px] font-bold">Email</TableHead>
            <TableHead className="w-[150px] font-bold">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow>
              <TableCell className="font-semibold">{user.userName}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell className="font-normal">{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className='font-bold' colSpan={3}>Total Users</TableCell>
            <TableCell className="text-right font-bold">{users.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
    </div>
  );
}

export default AdminFeatures;
