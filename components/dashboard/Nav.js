"use client";
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Sheeet from "./sheeet";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";
import axios from "axios";
import { useUserData } from "../../contexts/userrContext";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { DropdownMenuSeparator } from "../ui/dropdown-menu";
import { useTheme } from "../../contexts/themeContext";
import { ScrollArea } from "../ui/scroll-area";

export default function Nav() {
  const router = useRouter();
  const { isDarkMode, baseColor, toggleTheme } = useTheme();
  const { coinPrices, setCoinPrices } = useUserData();
  const [loading, isloading] = useState(false);
  const { details, email, setDetails } = useUserData();
  const deposits = [
    {
      coinName: "Bitcoin",
      short: "Bitcoin",
      image: "/assets/bitcoin.webp",
      address: "0xiohxhihfojdokhijkhnofwefodsdhfodhod",
    },
    {
      coinName: "Ethereum",
      short: "Ethereum",
      image: "/assets/ethereum.webp",
      address: "0xiohxhihfojhijkhnowefodsdhfodhod",
    },
    {
      coinName: "Tether USDT",
      short: "Tether",
      image: "/assets/Tether.webp",
      address: "0Xxiohxhihfookhijkhnofwefodsdhfodhod",
    },
  ];
  const handleReadNotif = async () => {
    if (!details.isReadNotifications) {
      try {
        // Send a POST request to mark notifications as read
        const response = await axios.post(`/notifs/readNotifs/api`, { email });

        if (response.status === 200) {
          // Notifications marked as read successfully
          // Now, you can update the user's details to set isReadNotifications to true
          setDetails((prevDetails) => ({
            ...prevDetails,
            isReadNotifications: true,
          }));
        } else {
          // Handle any errors or display an error message to the user
          console.error("Failed to mark notifications as read:", response.data);
        }
      } catch (error) {
        // Handle network errors or other unexpected errors
        console.error("Error marking notifications as read:", error);
      }
    }
  };
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (details.notifications && details.notifications.length > 0) {
      setNotifications(details.notifications);
    }
  }, [details]);

  // ...

  const formatRelativeTime = (dateString) => {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Calculate the relative time to now
    return formatDistanceToNow(date, { addSuffix: true });
  };

  // Map over notifications and format the date as relative time for each
  const formattedNotifications = notifications
    ? notifications.map((notification) => ({
        ...notification,
        date: formatRelativeTime(notification.date), // Format as relative time
      }))
    : [];
  const sortedNotifications = formattedNotifications.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // Compare dates in descending order (newest first)
  });

  const handleNotificationClick = (id) => {
    isloading(true);
    // Send a DELETE request to the backend API to delete the notification
    axios
      .delete(`/notifs/deleteNotifs/api/${id}/${email}`)
      .then((response) => {
        if (response.status === 200) {
          const updatedNotifications = notifications.filter(
            (notification) => notification.id !== id
          );
          setNotifications(updatedNotifications);
          isloading(false);
        } else {
          // Handle any errors or display an error message to the user
          console.error("Failed to delete notification:", response.data);
          isloading(false);
        }
      })
      .catch((error) => {
        // Handle network errors or other unexpected errors
        console.error("Error deleting notification:", error);
        isloading(false);
      });
  };
  useEffect(() => {
    const fetchCoinPrices = async () => {
      try {
        // Create an array of coin symbols for API request
        const coinSymbols = deposits.map((coin) => coin.short.toLowerCase());

        // API request to fetch coin prices
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinSymbols.join(
            ","
          )}&vs_currencies=usd`
        );

        // Update coinPrices state with fetched prices
        setCoinPrices(response.data);
      } catch (error) {
        console.error("Error fetching coin prices:", error);
      }
    };

    fetchCoinPrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    // Remove the "token" cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to the logout page or any other desired action
    router.replace("/auth"); // Replace "/logout" with your actual logout route
  };

  return (
    <>
      <div
        className={`nav-container flex justify-between ${
          isDarkMode
            ? `${baseColor} text-white border border-white/5`
            : "text-slate-900 border-b bg-white"
        } duration-300  items-center py-3 px-5 transition-colors  `}
      >
        <div className="burger md:hidden cursor-pointer">
          <Sheet className="p-0">
            <SheetTrigger>
              <div className="burger-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </SheetTrigger>
            <SheetContent
              side="left"
              className={`px-4 ${
                isDarkMode ? `${baseColor} text-gray-200 border-0` : ""
              }`}
            >
              <Sheeet />
            </SheetContent>
          </Sheet>
        </div>
        <div className="title hidden md:flex">
          <h2 className="font-bold">
            <svg width="228" height="52" viewBox="0 0 228 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M46.024 43.384C44.7867 43.384 43.6773 43.1813 42.696 42.776C41.736 42.3707 40.9147 41.784 40.232 41.016C39.5707 40.248 39.0587 39.32 38.696 38.232C38.3333 37.144 38.152 35.928 38.152 34.584C38.152 33.24 38.3333 32.024 38.696 30.936C39.0587 29.848 39.5707 28.9307 40.232 28.184C40.9147 27.416 41.736 26.8293 42.696 26.424C43.6773 26.0187 44.7867 25.816 46.024 25.816C47.2613 25.816 48.36 26.0187 49.32 26.424C50.3013 26.8293 51.1227 27.416 51.784 28.184C52.4667 28.9307 52.9893 29.848 53.352 30.936C53.7147 32.024 53.896 33.24 53.896 34.584C53.896 35.928 53.7147 37.144 53.352 38.232C52.9893 39.32 52.4667 40.248 51.784 41.016C51.1227 41.784 50.3013 42.3707 49.32 42.776C48.36 43.1813 47.2613 43.384 46.024 43.384ZM46.024 39.64C46.9627 39.64 47.688 39.352 48.2 38.776C48.712 38.2 48.968 37.3787 48.968 36.312V32.888C48.968 31.8213 48.712 31 48.2 30.424C47.688 29.848 46.9627 29.56 46.024 29.56C45.0853 29.56 44.36 29.848 43.848 30.424C43.336 31 43.08 31.8213 43.08 32.888V36.312C43.08 37.3787 43.336 38.2 43.848 38.776C44.36 39.352 45.0853 39.64 46.024 39.64ZM59.6385 24.408C58.6785 24.408 57.9745 24.1947 57.5265 23.768C57.0998 23.32 56.8865 22.7547 56.8865 22.072V21.368C56.8865 20.6853 57.0998 20.1307 57.5265 19.704C57.9745 19.256 58.6785 19.032 59.6385 19.032C60.5985 19.032 61.2918 19.256 61.7185 19.704C62.1665 20.1307 62.3905 20.6853 62.3905 21.368V22.072C62.3905 22.7547 62.1665 23.32 61.7185 23.768C61.2918 24.1947 60.5985 24.408 59.6385 24.408ZM57.2705 26.2H62.0065V43H57.2705V26.2ZM66.4268 43V26.2H71.1628V29.048H71.3548C71.6534 28.1733 72.1761 27.416 72.9228 26.776C73.6694 26.136 74.7041 25.816 76.0268 25.816C77.7548 25.816 79.0561 26.392 79.9308 27.544C80.8268 28.696 81.2748 30.3387 81.2748 32.472V43H76.5388V32.856C76.5388 31.768 76.3681 30.968 76.0268 30.456C75.6854 29.9227 75.0774 29.656 74.2028 29.656C73.8188 29.656 73.4454 29.7093 73.0828 29.816C72.7201 29.9013 72.3894 30.0507 72.0908 30.264C71.8134 30.4773 71.5894 30.744 71.4188 31.064C71.2481 31.3627 71.1628 31.7147 71.1628 32.12V43H66.4268Z" fill={isDarkMode ? "White" :"#222222"}/>
<path d="M148.624 41C147.771 41 147.056 40.7333 146.48 40.2C145.925 39.6667 145.573 38.952 145.424 38.056H145.232C144.976 39.144 144.411 39.976 143.536 40.552C142.661 41.1067 141.584 41.384 140.304 41.384C138.619 41.384 137.328 40.936 136.432 40.04C135.536 39.144 135.088 37.96 135.088 36.488C135.088 34.7173 135.728 33.4053 137.008 32.552C138.309 31.6773 140.069 31.24 142.288 31.24H144.944V30.184C144.944 29.3733 144.731 28.7333 144.304 28.264C143.877 27.7733 143.163 27.528 142.16 27.528C141.221 27.528 140.475 27.7307 139.92 28.136C139.365 28.5413 138.907 29 138.544 29.512L135.728 27.016C136.411 26.0133 137.264 25.2347 138.288 24.68C139.333 24.104 140.741 23.816 142.512 23.816C144.901 23.816 146.693 24.3387 147.888 25.384C149.083 26.4293 149.68 27.9547 149.68 29.96V37.32H151.248V41H148.624ZM142.064 38.088C142.853 38.088 143.525 37.9173 144.08 37.576C144.656 37.2347 144.944 36.68 144.944 35.912V33.928H142.64C140.784 33.928 139.856 34.5573 139.856 35.816V36.296C139.856 36.9147 140.048 37.3733 140.432 37.672C140.816 37.9493 141.36 38.088 142.064 38.088ZM160.123 41.384C158.501 41.384 157.136 41.128 156.027 40.616C154.917 40.0827 153.925 39.336 153.051 38.376L155.835 35.56C156.432 36.2213 157.093 36.744 157.819 37.128C158.544 37.512 159.365 37.704 160.283 37.704C161.221 37.704 161.872 37.5653 162.235 37.288C162.597 36.9893 162.779 36.5947 162.779 36.104C162.779 35.3147 162.213 34.8453 161.083 34.696L159.259 34.472C155.483 34.0027 153.595 32.2747 153.595 29.288C153.595 28.4773 153.744 27.7413 154.043 27.08C154.363 26.3973 154.8 25.8213 155.355 25.352C155.931 24.8613 156.613 24.488 157.403 24.232C158.213 23.9547 159.12 23.816 160.123 23.816C160.997 23.816 161.765 23.88 162.427 24.008C163.109 24.1147 163.707 24.2853 164.219 24.52C164.752 24.7333 165.232 25.0107 165.659 25.352C166.107 25.672 166.544 26.0347 166.971 26.44L164.251 29.224C163.717 28.6907 163.109 28.2747 162.427 27.976C161.765 27.656 161.083 27.496 160.379 27.496C159.568 27.496 158.992 27.624 158.651 27.88C158.309 28.136 158.139 28.4773 158.139 28.904C158.139 29.352 158.256 29.704 158.491 29.96C158.747 30.1947 159.216 30.3653 159.899 30.472L161.787 30.728C165.477 31.2187 167.323 32.904 167.323 35.784C167.323 36.5947 167.152 37.3413 166.811 38.024C166.469 38.7067 165.979 39.304 165.339 39.816C164.72 40.3067 163.963 40.6907 163.067 40.968C162.192 41.2453 161.211 41.384 160.123 41.384ZM176.19 41C174.547 41 173.299 40.584 172.446 39.752C171.614 38.92 171.198 37.704 171.198 36.104V27.88H168.83V24.2H170.014C170.654 24.2 171.091 24.0507 171.326 23.752C171.56 23.432 171.678 22.984 171.678 22.408V19.656H175.934V24.2H179.262V27.88H175.934V37.32H179.006V41H176.19ZM189.435 41.384C188.155 41.384 187.013 41.1813 186.011 40.776C185.008 40.3493 184.155 39.7627 183.451 39.016C182.768 38.248 182.245 37.32 181.883 36.232C181.541 35.144 181.371 33.928 181.371 32.584C181.371 31.2613 181.541 30.0667 181.883 29C182.224 27.912 182.725 26.984 183.387 26.216C184.069 25.448 184.901 24.8613 185.883 24.456C186.864 24.0293 187.984 23.816 189.243 23.816C190.629 23.816 191.813 24.0507 192.795 24.52C193.797 24.9893 194.608 25.6187 195.227 26.408C195.867 27.1973 196.325 28.1147 196.603 29.16C196.901 30.184 197.051 31.2613 197.051 32.392V33.8H186.267V34.056C186.267 35.1653 186.565 36.0507 187.163 36.712C187.76 37.352 188.699 37.672 189.979 37.672C190.96 37.672 191.76 37.48 192.379 37.096C192.997 36.6907 193.573 36.2107 194.107 35.656L196.475 38.6C195.728 39.4747 194.747 40.1573 193.531 40.648C192.336 41.1387 190.971 41.384 189.435 41.384ZM189.339 27.304C188.379 27.304 187.621 27.624 187.067 28.264C186.533 28.8827 186.267 29.7147 186.267 30.76V31.016H192.155V30.728C192.155 29.704 191.92 28.8827 191.451 28.264C191.003 27.624 190.299 27.304 189.339 27.304ZM200.396 41V24.2H205.132V27.848H205.292C205.377 27.3787 205.526 26.9307 205.74 26.504C205.953 26.056 206.23 25.6613 206.572 25.32C206.934 24.9787 207.361 24.712 207.852 24.52C208.342 24.3067 208.918 24.2 209.58 24.2H210.412V28.616H209.228C207.841 28.616 206.806 28.7973 206.124 29.16C205.462 29.5227 205.132 30.1947 205.132 31.176V41H200.396ZM219.029 41.384C217.408 41.384 216.042 41.128 214.933 40.616C213.824 40.0827 212.832 39.336 211.957 38.376L214.741 35.56C215.338 36.2213 216 36.744 216.725 37.128C217.45 37.512 218.272 37.704 219.189 37.704C220.128 37.704 220.778 37.5653 221.141 37.288C221.504 36.9893 221.685 36.5947 221.685 36.104C221.685 35.3147 221.12 34.8453 219.989 34.696L218.165 34.472C214.389 34.0027 212.501 32.2747 212.501 29.288C212.501 28.4773 212.65 27.7413 212.949 27.08C213.269 26.3973 213.706 25.8213 214.261 25.352C214.837 24.8613 215.52 24.488 216.309 24.232C217.12 23.9547 218.026 23.816 219.029 23.816C219.904 23.816 220.672 23.88 221.333 24.008C222.016 24.1147 222.613 24.2853 223.125 24.52C223.658 24.7333 224.138 25.0107 224.565 25.352C225.013 25.672 225.45 26.0347 225.877 26.44L223.157 29.224C222.624 28.6907 222.016 28.2747 221.333 27.976C220.672 27.656 219.989 27.496 219.285 27.496C218.474 27.496 217.898 27.624 217.557 27.88C217.216 28.136 217.045 28.4773 217.045 28.904C217.045 29.352 217.162 29.704 217.397 29.96C217.653 30.1947 218.122 30.3653 218.805 30.472L220.693 30.728C224.384 31.2187 226.229 32.904 226.229 35.784C226.229 36.5947 226.058 37.3413 225.717 38.024C225.376 38.7067 224.885 39.304 224.245 39.816C223.626 40.3067 222.869 40.6907 221.973 40.968C221.098 41.2453 220.117 41.384 219.029 41.384Z" fill={isDarkMode ? "White" :"#222222"}/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M40.5809 20.0455C40.8596 21.2683 41.0003 22.5185 41.0003 23.7727H24.2275V7C28.0282 6.99998 31.7161 8.29076 34.6872 10.6609C37.6583 13.031 39.7364 16.3399 40.5809 20.0455ZM36.7288 20.0455C36.1098 17.9695 34.9836 16.0803 33.4518 14.5485C31.92 13.0167 30.0308 11.8904 27.9548 11.2715V20.0455H36.7288Z" fill="#0052FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.3133e-10 31.2279C-9.96883e-06 28.7085 0.56752 26.2215 1.66044 23.9516C2.75337 21.6817 4.34361 19.6871 6.31307 18.116C8.28253 16.5449 10.5806 15.4376 13.0367 14.8765C15.4927 14.3153 18.0436 14.3146 20.5 14.8745V27.5006H33.1261C33.6507 29.8024 33.6835 32.1891 33.2223 34.5044C32.761 36.8198 31.8162 39.0117 30.4496 40.9367C29.083 42.8618 27.3254 44.4767 25.2917 45.6758C23.258 46.8749 20.9942 47.6312 18.6481 47.8951C16.3021 48.1591 13.9267 47.9248 11.6775 47.2076C9.4282 46.4905 7.35566 45.3065 5.59543 43.7333C3.83519 42.16 2.42691 40.2329 1.46269 38.0779C0.498471 35.923 4.09901e-05 33.5887 1.3133e-10 31.2279ZM29.4529 31.2279H16.7727V18.5477C14.2648 18.5477 11.8132 19.2914 9.728 20.6847C7.64275 22.078 6.0175 24.0584 5.05777 26.3754C4.09803 28.6924 3.84692 31.2419 4.33619 33.7017C4.82546 36.1614 6.03313 38.4208 7.80649 40.1941C9.57984 41.9675 11.8392 43.1751 14.2989 43.6644C16.7587 44.1537 19.3082 43.9026 21.6252 42.9428C23.9422 41.9831 25.9226 40.3578 27.3159 38.2726C28.7092 36.1874 29.4529 33.7358 29.4529 31.2279Z" fill="#0052FF"/>
<path d="M133 43H92" stroke="#0052FF" stroke-width="3" stroke-linecap="round"/>
<path d="M130.95 42.9998V27.6248C130.95 26.8093 130.626 26.0271 130.05 25.4505C129.473 24.8738 128.691 24.5498 127.875 24.5498H121.725C120.91 24.5498 120.128 24.8738 119.551 25.4505C118.974 26.0271 118.65 26.8093 118.65 27.6248V42.9998" stroke="#0052FF" stroke-width="3"/>
<path d="M118.65 43V16.35M106.35 43V8.15C106.35 5.2513 106.35 3.80195 107.252 2.902C108.15 2 109.599 2 112.5 2C115.4 2 116.848 2 117.748 2.902C118.65 3.7999 118.65 5.24925 118.65 8.15" stroke="#0052FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M106.35 42.9998V17.3748C106.35 16.5593 106.026 15.7771 105.449 15.2005C104.872 14.6238 104.09 14.2998 103.275 14.2998H97.1248C96.3093 14.2998 95.5271 14.6238 94.9505 15.2005C94.3738 15.7771 94.0498 16.5593 94.0498 17.3748V30.6998M94.0498 42.9998V38.3873" stroke="#0052FF" stroke-width="3" stroke-linecap="round"/>
</svg>
          </h2>
        </div>{" "}
        {details === 0 ? (
          <div className="flex items-center gap-x-3">
            {" "}
            <Skeleton
              className={`md:w-52 md:h-10 rounded-md  ${
                isDarkMode ? "bg-[#333]" : "bg-gray-200/80"
              }  w-24 h-10`}
            />
            <Skeleton
              className={`md:w-52 md:h-10 md:rounded-sm  ${
                isDarkMode ? "bg-[#333]" : "bg-gray-200/80"
              } w-10 h-10 rounded-full`}
            />
            <Skeleton
              className={`md:w-10 md:h-10 rounded-full ${
                isDarkMode ? "bg-[#333]" : "bg-gray-200/80"
              } w-10 h-10`}
            />
          </div>
        ) : (
          <div className="nav-tools text-sm flex items-center">
            <Select defaultValue="Balance">
              <SelectTrigger
                className={`${isDarkMode ? "border border-[#222]" : "border"}`}
              >
                <SelectValue className="outline-none " />
              </SelectTrigger>
              <SelectContent
                className={`outline-none focus:outline-none ${
                  isDarkMode ? `${baseColor} text-white border-0` : ""
                }`}
              >
                <SelectItem value="Balance">
                  <div className="flex items-center py-2">
                    <div className="w-5 h-5 ">
                      {" "}
                      <Image
                        alt=""
                        src="/assets/dollar.png"
                        width={1000}
                        height={10000}
                      />
                    </div>
                    <div className="text-sm font-bold mx-2">
                      <code>{details.tradingBalance.toLocaleString()}</code>
                    </div>
                  </div>
                </SelectItem>
                {deposits.map((deps, index) => (
                  <div key={deps.coinName}>
                    <SelectItem key={deps.coinName} value={deps.coinName}>
                      <div className="flex items-center py-2">
                        <div className="image">
                          <Image
                            src={deps.image}
                            alt=""
                            width={20}
                            height={15}
                          />
                        </div>
                        <div className="price text-sm mx-2 font-bold">
                          {details !== 0 && details !== null ? (
                            <code>
                              {coinPrices[deps.short.toLowerCase()]
                                ? (
                                    details.tradingBalance /
                                    coinPrices[deps.short.toLowerCase()].usd
                                  ).toFixed(5)
                                : "0.00"}
                            </code>
                          ) : (
                            <span>calculating...</span>
                          )}
                        </div>
                      </div>
                    </SelectItem>
                  </div>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger onClick={handleReadNotif}>
                <div className="notif-cont  ml-3 relative">
                  <div
                    className={` flex font-bold ${
                      isDarkMode
                        ? `md:bg-[#0052FF10] text-[#0052FF]`
                        : "md:bg-[#0052FF10] text-[#0052FF]"
                    } rounded-full md:rounded-lg md:px-3 md:py-3`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="md:w-5 md:h-5 w-5 h-5 md:mr-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 8a6 6 0 1112 0c0 1.887.454 3.665 1.257 5.234a.75.75 0 01-.515 1.076 32.903 32.903 0 01-3.256.508 3.5 3.5 0 01-6.972 0 32.91 32.91 0 01-3.256-.508.75.75 0 01-.515-1.076A11.448 11.448 0 004 8zm6 7c-.655 0-1.305-.02-1.95-.057a2 2 0 003.9 0c-.645.038-1.295.057-1.95.057zM8.75 6a.75.75 0 000 1.5h1.043L8.14 9.814A.75.75 0 008.75 11h2.5a.75.75 0 000-1.5h-1.043l1.653-2.314A.75.75 0 0011.25 6h-2.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div
                      className={`hidden md:block  ${
                        isDarkMode ? "text-[#0052FF]" : "text-[#0052FF]"
                      }`}
                    >
                      Notifications
                    </div>
                  </div>

                  {!details.isReadNotifications && (
                    <div className="notifier-dot absolute md:-right-1 right-0  top-0">
                      <div className="dot bg-red-500 md:w-3 md:h-3 animate__rubberBand animate__animated animate__infinite rounded-full w-2 h-2"></div>
                    </div>
                  )}
                </div>
              </PopoverTrigger>
              <PopoverContent
                className={`w-[350px] md:w-[400px] mx-3 pb-0 pt-4 px-1 relative overflow-hidden ${
                  isDarkMode ? "bg-[#222] border-white/5 text-gray-200" : ""
                }`}
              >
                <div className="tit px-3">
                  <div className="flex w-full justify-between items-center pb-4">
                    <div
                      className={`title-name font-bold ${
                        isDarkMode ? "text-white" : "text-black/90"
                      }`}
                    >
                      Notifications
                    </div>
                    <div className="titcount fleex">
                      <div className=" ">
                        <div
                          className={`py-1 px-2 rounded-full text-xs font-bold ${
                            isDarkMode ? "bg-[#333]" : "bg-black/5"
                          }`}
                        >
                          {notifications.length}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`line w-1/2 mx-auto mb-2 h-0.5  rounded-full ${
                      isDarkMode ? "bg-white/5" : "bg-black/5"
                    }`}
                  ></div>
                </div>
                <div className="cont ">
                  {notifications.length === 0 && (
                    <>
                      {" "}
                      <div className="message text-center text-sm py-4">
                        No notifications yet
                      </div>
                    </>
                  )}
                  {loading && (
                    <div
                      className={`loader-overlay absolute w-full h-full ${
                        isDarkMode ? "bg-black" : "bg-white"
                      } opacity-60 left-0 top-0 blur-2xl z-50`}
                    ></div>
                  )}
                  {notifications.length !== 0 && (
                    <>
                      <div>
                        <div className=" max-h-[300px] overflow-scroll overflow-x-hidden w-full px-3 py-3">
                          {sortedNotifications.reverse().map((notif, index) => (
                            <>
                              <div
                                className={`flex justify-between w-full items-start cursor-pointer transition-all`}
                                key={crypto.randomUUID()}
                              >
                                <div className="icon flex items-center flex-col">
                                  <div
                                    className={`${
                                      notif.method === "success"
                                        ? isDarkMode
                                          ? "bg-green-500/10 text-green-500"
                                          : "bg-green-500/20 text-green-500"
                                        : notif.method === "failure"
                                        ? isDarkMode
                                          ? "bg-red-500/10 text-red-500"
                                          : "bg-red-500/20 text-red-500"
                                        : notif.method === "pending"
                                        ? isDarkMode
                                          ? "bg-orange-500/10 text-orange-500"
                                          : "bg-orange-500/20 text-orange-500"
                                        : isDarkMode
                                        ? "bg-[#333] text-white"
                                        : "bg-[#33333320] text-white"
                                    } rounded-full p-3`}
                                  >
                                    {notif.type === "trade" ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    ) : notif.type === "transaction" ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M13.2 2.24a.75.75 0 00.04 1.06l2.1 1.95H6.75a.75.75 0 000 1.5h8.59l-2.1 1.95a.75.75 0 101.02 1.1l3.5-3.25a.75.75 0 000-1.1l-3.5-3.25a.75.75 0 00-1.06.04zm-6.4 8a.75.75 0 00-1.06-.04l-3.5 3.25a.75.75 0 000 1.1l3.5 3.25a.75.75 0 101.02-1.1l-2.1-1.95h8.59a.75.75 0 000-1.5H4.66l2.1-1.95a.75.75 0 00.04-1.06z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    ) : notif.type === "intro" ? (
                                      <>🤝</>
                                    ) : notif.type === "verification" ? (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    ) : (
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-4 h-4 text-sm"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    )}
                                  </div>
                                  <div
                                    className={`linedwon   ${
                                      notif.method === "success"
                                        ? isDarkMode
                                          ? "bg-green-500/10 text-green-500"
                                          : "bg-green-500/20 text-green-500"
                                        : notif.method === "failure"
                                        ? isDarkMode
                                          ? "bg-red-500/10 text-red-500"
                                          : "bg-red-500/20 text-red-500"
                                        : notif.method === "pending"
                                        ? isDarkMode
                                          ? "bg-orange-500/10 text-orange-500"
                                          : "bg-orange-500/20 text-orange-500"
                                        : isDarkMode
                                        ? "bg-[#333] text-white"
                                        : "bg-[#33333320] text-white"
                                    } ${
                                      index !== notifications.length - 1
                                        ? "h-11 border border-dashed border-white/5"
                                        : ""
                                    }`}
                                    key={crypto.randomUUID()}
                                  ></div>
                                </div>
                                <div className="message w-full text-sm mx-2">
                                  <div
                                    className={`pb-1 pt-1 ${
                                      isDarkMode
                                        ? "text-white"
                                        : "text-black/90 font-bold"
                                    }`}
                                  >
                                    {" "}
                                    {notif.message}
                                  </div>
                                  <div
                                    className={`date text-xs capitalize ${
                                      isDarkMode ? "opacity-40" : "opacity-80"
                                    }`}
                                  >
                                    {notif.date}
                                  </div>
                                </div>
                                <div
                                  className="actiom pt-3 h-full /w-full"
                                  onClick={() =>
                                    handleNotificationClick(notif.id)
                                  }
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className={`w-4 h-4 ${
                                      isDarkMode
                                        ? "text-white/50 hover:text-white/80"
                                        : "text-black/30 hover:text-black/50"
                                    }`}
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.75 9.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <button
              className={`theme-toggler  md:p-3  ${
                isDarkMode
                  ? "md:bg-[#0052FF20] text-[#0052FF] "
                  : "md:bg-[#0052FF10] text-[#0052FF]"
              } rounded-full mx-5 md:mx-2`}
              onClick={toggleTheme}
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-5 h-5 
                          }`}
                >
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 
                          }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            <Popover>
              <PopoverTrigger>
                <div
                  className={`flex font-bold text-[#0052FF] rounded-full md:p-3 ${
                    isDarkMode ? "md:bg-[#0052FF20]" : "md:bg-[#0052FF10]"
                  } md:mr-5 text-sm`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 "
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </PopoverTrigger>
              <PopoverContent
                className={`w-[300px] mx-3  p-1   ${
                  isDarkMode ? "bg-[#111] text-white border border-white/5" : ""
                }`}
              >
                {/* <div className="header-title py-4 px-4 font-bold">
                  <h1 className="bgname text-lg">Menus</h1>
                </div> */}
                <div className="content1 grid grid-cols-3 gap-y-4 py-3 pt-5 gap-x-3 px-3">
                  <Link href="/dashboard/account" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3  ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <Image
                        alt=""
                        src="/assets/profile.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />

                      <p className="pt-2">Profile</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/deposits" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3  ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <Image
                        alt=""
                        src="/assets/wallet.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />
                      <p className="pt-2">Deposit</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/withdrawals" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3  ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <Image
                        alt=""
                        src="/assets/withdraw.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />
                      <p className="pt-2">Withdraw</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/markets" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3 relative ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <div className="identifier absolute -top-1 -right-2">
                        <div className="px-2  font-normal bg-green-500 rounded-md text-white  text-[10px]">
                          Live
                        </div>
                      </div>
                      <Image
                        alt=""
                        src="/assets/increase.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />

                      <p className="pt-2">Tradings</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/investments" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3  ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <Image
                        alt=""
                        src="/assets/money.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />

                      <p className="pt-2">Subscription</p>
                    </div>
                  </Link>
                  <Link href="/dashboard/verify" passHref>
                    <div
                      className={`deposit flex flex-col items-center text-xs justify-center rounded-md font-bold p-3  relative ${
                        isDarkMode
                          ? "bg-white/5 hite/5 hover:bg-white/10"
                          : "bg-gray-300/20 text-black/80 hover:bg-black/5"
                      }`}
                    >
                      <div className="verification-identifier absolute -top-1 -right-2">
                        {details.isVerified ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-green-500"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5 text-red-500"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <Image
                        alt=""
                        src="/assets/veraccount.png"
                        className="w-8 h-8"
                        width={1000}
                        height={1000}
                      />

                      <p className="pt-2">Verification</p>
                    </div>
                  </Link>
                </div>{" "}
                <div className="relative w-full flex items-center justify-center pt-4">
                  <div
                    className={` line h-0.5 w-1/2 mx-auto top-0 left-0 ${
                      isDarkMode ? "bg-white/5" : "bg-black/10"
                    } rounded-full`}
                  ></div>
                </div>
                <div
                  className={`logout flex items-center text-sm py-3 mb-4 mx-3 rounded-md text-red-600 mt-4 ${
                    isDarkMode
                      ? "bg-red-500/10 /border /border-red-600 font-bold"
                      : "bg-red-50"
                  } px-2 font-bold cursor-pointer`}
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5A.75.75 0 0110 2zM5.404 4.343a.75.75 0 010 1.06 6.5 6.5 0 109.192 0 .75.75 0 111.06-1.06 8 8 0 11-11.313 0 .75.75 0 011.06 0z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p>Logout</p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </>
  );
}
