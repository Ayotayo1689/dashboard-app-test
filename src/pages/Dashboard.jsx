"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, searchUsers } from "../redux/slices/usersSlice";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import LoadingSpinner from "../components/LoadingSpinner";
import ArrowUp from "../assets/arrowUp.svg";
import ArrowDown from "../assets/ArrowDown.svg";
import DashboardImg from "../assets/dashboard.svg";
import Help from "../assets/help.svg";
import UserImg from "../assets/user.svg";
import TotalUser from "../assets/totalUser.svg";
import Members from "../assets/members.svg";
import Active from "../assets/active.svg";
import { Menu, X } from "lucide-react";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { users, totalUsers, members, activeUsers, isLoading, error } =
    useSelector((state) => state.users);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const usersPerPage = 8;

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchUsers(searchQuery));
    } else {
      dispatch(fetchUsers());
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading && !users.length) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}

      <div
        className={`fixed md:relative top-0 z-50 left-0 h-full w-64 bg-white flex flex-col transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="w-64 z-50   flex flex-col">
          {/* <div className="p-6"> */}
          <div className="flex my-6 items-center gap-2">
          <button
            className="md:hidden absolute top-2 right-2"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
            <div className=" p-2">
              <img src={DashboardImg} alt="" />
            </div>
            <h1 className="text-xl font-bold">Dashboard</h1>
            <span className="text-xs text-gray-500">v1.0</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2">
          <div className="space-y-4">
            <Button className="w-full flex gap-4 p-6 text-[#fff] !bg-[#5932EA] justify-start ">
              <img src={UserImg} alt="" />
              Users
            </Button>

            <Button
              variant="ghost"
              className="w-full  flex gap-4 p-6 justify-start text-gray-500"
            >
              <img src={Help} alt="" />
              Help
            </Button>
          </div>
        </nav>

        <div className="p-4 mt-auto">
          <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
            <CardContent className="p-4">
              <p className="font-medium">
                Upgrade to PRO to get access all Features!
              </p>
              <Button className="w-full mt-4 bg-white text-indigo-600 hover:bg-gray-100">
                Get Pro Now!
              </Button>
            </CardContent>
          </Card>

          <div className="flex items-center mt-6 p-2">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                className="object-cover"
                src={
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
              />
              <AvatarFallback>
                {user?.firstName?.charAt(0) || "U"} h
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{user?.firstName || "Evano"}</p>
              <p className="text-xs text-gray-500">Project Manager</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* </div> */}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-[#f6faff] p-6 sticky top-0 z-10   flex justify-between items-center">
          <button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-medium">
            Hello {user?.firstName || "Evano"} 👋,
          </h1>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search" className="pl-10 w-64" />
          </div>
        </header>

        <main className="p-6">
          {/* Stats cards */}
          <div className=" p-4 flex bg-[#fff] gap-6 rounded-2xl flex-wrap mb-6">
            <div className="flex-1 flex items-center min-w-[200px]">
              <div className=" mr-4">
                <img src={TotalUser} alt="" className="w-[60px]" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <h3 className="text-2xl font-semibold">{totalUsers || 5423}</h3>
                <p className="text-sm  flex gap-2 text-green-500">
                  <img src={ArrowUp} alt="" /> 16% this month
                </p>
              </div>
            </div>

            <div className="flex-1 flex items-center min-w-[200px]">
              <div className=" mr-4">
                <img src={Members} alt="" className="w-[60px]" />{" "}
              </div>
              <div>
                <p className="text-sm text-gray-500">Members</p>
                <h3 className="text-2xl font-semibold">{members || 1893}</h3>
                <p className="text-sm flex gap-2 text-red-500">
                  <img src={ArrowDown} alt="" /> 1% this month
                </p>
              </div>
            </div>

            <div className="flex-1 flex items-center min-w-[200px]">
              <div className=" mr-4">
                <img src={Active} alt="" className="w-[60px]" />{" "}
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Now</p>
                <h3 className="text-2xl font-semibold">{activeUsers || 189}</h3>
                <div className="flex -space-x-2 mt-1">
                  {[
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "https://plus.unsplash.com/premium_photo-1670071482460-5c08776521fe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  ].map((i) => (
                    <Avatar key={i} className="h-6 w-6 border-2 border-white">
                      <AvatarImage className="object-cover" src={i} />

                      <AvatarFallback className="bg-primary text-xs text-white">
                        {"A"}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Users table */}
          <Card className="mb-6 border-none shadow-none">
            <CardContent className="p-6">
              <div className="flex justify-between gap-4 flex-wrap items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">All Users</h2>
                  <p className="text-sm text-green-500">Active Members</p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <form onSubmit={handleSearch}>
                      <Input
                        placeholder="Search"
                        className="pl-10 w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </form>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex gap-2">
                        Sort by: {sortBy}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSortBy("newest")}>
                        Newest
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("oldest")}>
                        Oldest
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-[#B5B7C0]">
                        User Name
                      </TableHead>
                      <TableHead className="text-[#B5B7C0]">Company</TableHead>
                      <TableHead className="text-[#B5B7C0]">
                        Phone Number
                      </TableHead>
                      <TableHead className="text-[#B5B7C0]">Email</TableHead>
                      <TableHead className="text-[#B5B7C0]">Country</TableHead>
                      <TableHead className="text-[#B5B7C0]">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentUsers.length > 0 ? (
                      currentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="py-4 font-medium">
                            {user.firstName} {user.lastName}
                          </TableCell>
                          <TableCell className="py-4">
                            {user.company?.name || "N/A"}
                          </TableCell>
                          <TableCell className="py-4">{user.phone}</TableCell>
                          <TableCell className="py-4">{user.email}</TableCell>
                          <TableCell className="py-4">
                            {user.address?.city || "N/A"}
                          </TableCell>
                          <TableCell className="py-4">
                            <Badge
                              variant={
                                user.id % 3 === 0 ? "destructive" : "success"
                              }
                              className={
                                user.id % 3 === 0
                                  ? "bg-[#FFC5C5] border border-[#DF0404]  text-[#DF0404] min-w-[100px] p-1.5"
                                  : "bg-[#16c0985b] border border-[#008767]  text-[#008767] min-w-[100px] p-1.5"
                              }
                            >
                              {user.id % 3 === 0 ? "Inactive" : "Active"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No users found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center flex-wrap gap-4 justify-between mt-6">
                <p className="text-sm min-w-[250px] text-[#B5B7C0]">
                  Showing data 1 to{" "}
                  {Math.min(currentUsers.length, usersPerPage)} of{" "}
                  {users.length} entries
                </p>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    // className={d}
                    size="icon"
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {Array.from({ length: Math.min(5, totalPages) }).map(
                    (_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <Button
                          className={`${
                            currentPage === pageNumber && "!bg-[#5932EA]"
                          } `}
                          key={pageNumber}
                          variant={currentPage === pageNumber ? "" : "outline"}
                          size="icon"
                          onClick={() => paginate(pageNumber)}
                        >
                          {pageNumber}
                        </Button>
                      );
                    }
                  )}

                  {totalPages > 5 && (
                    <>
                      <Button variant="outline" size="icon" disabled>
                        ...
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => paginate(totalPages)}
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      paginate(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
