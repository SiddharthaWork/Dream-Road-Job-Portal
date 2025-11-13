'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  UserX,
  Users,
  UserCheck,
  Clock,
  TrendingUp
} from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { toast } from 'react-hot-toast';

export default function JobseekersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [user, setUser] = useState<any>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const itemsPerPage = 10;

  // Filter jobseekers based on search term
  const filteredJobseekers = user.filter((user: any) => {
    console.log(user);
    const matchesSearch = user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredJobseekers.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/getAllUser');
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching jobseekers:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="">
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Jobseekers Management</h1>
            <p className="text-gray-600">Manage and monitor your jobseekers</p>
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  className="pl-10 w-64"
                  placeholder="Search jobseekers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobseekers Table */}
        <Card>
          <CardContent className="px-6">
            <Table>
              <TableHeader>
                <TableRow className="divide-y divide-gray-200">
                  <TableHead>User</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>ProfileCompleted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {currentItems.map((user: any) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{user.fullname}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-gray-900">
                      {new Date(user.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm text-gray-900">
                      <Badge variant={user.profileCompleted ? 'default' : 'destructive'}> 
                        {user.profileCompleted ? 'Completed' : 'Not Completed'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.block ? 'destructive' : 'default'}>
                        {user.block ? 'Blocked' : 'Active'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-900">
                      {user.appliedJobs ? user.appliedJobs.length : 0}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/admin/jobseekers/${user._id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-red-600" 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUser(user);
                              setIsDialogOpen(true);
                            }}
                          >
                            <UserX className="mr-2 h-4 w-4" />
                            {user.block ? 'Unblock User' : 'Block User'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, filteredJobseekers.length)}
            </span>{' '}
            of <span className="font-medium">{filteredJobseekers.length}</span> jobseekers
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, Math.ceil(filteredJobseekers.length / itemsPerPage))
                )
              }
              disabled={currentPage === Math.ceil(filteredJobseekers.length / itemsPerPage)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Block/Unblock Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedUser?.block ? 'Unblock User' : 'Block User'}</DialogTitle>
            <DialogDescription>
              Are you sure you want to {selectedUser?.block ? 'unblock' : 'block'} {selectedUser?.fullname}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={async () => {
                if (!selectedUser) return;
                try {
                  if (selectedUser.block) {
                    // Unblock user
                    await axios.put(`http://localhost:4000/api/admin/unblockUser/${selectedUser._id}`);
                  } else {
                    // Block user
                    await axios.put(`http://localhost:4000/api/admin/blockUser/${selectedUser._id}`);
                  }
                  // Update the user state to reflect the change
                  setUser((prev: any) => prev.map((user: any) => 
                    user._id === selectedUser._id ? { ...user, block: !user.block } : user
                  ));
                  toast.success(`User ${selectedUser.block ? 'unblocked' : 'blocked'} successfully`);
                } catch (error) {
                  toast.error('Failed to update user status');
                  console.error(error);
                } finally {
                  setIsDialogOpen(false);
                }
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}