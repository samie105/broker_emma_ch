/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/themeContext";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const { isDarkMode, baseColor } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      // Increment the progress by a certain amount
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 1.4; // Increase by 10% (adjust as needed)
        } else {
          clearInterval(interval); // Stop the interval when progress reaches 100%
          setIsVisible(false);
          return prevProgress;
        }
      });
    }, 100);
  }, []);

  return isVisible ? (
    <div
      className={`fixed top-0 left-0 z-50 ${
        isDarkMode ? `${baseColor}` : "bg-white"
      } w-full h-full`}
    >
      <section className="section relative w-full h-full">
        {" "}
        <div
          className={`   animate__animated text-xl flex w-full h-full justify-center items-center ${
            progress > 94 ? "animate__slideOutRight" : ""
          }`}
        >
          <div className="progress-cont w-4/5 md:w-1/2">
            <div
              className={`${
                isDarkMode ? "bg-[#11111150]" : "bg-gray-100"
              } progressguauge w-full h-1.5 rounded-full  overflow-hidden transition-all relative`}
            >
              <div
                className="progressbar absolute rounded-full h-full top-0 left-0 transition-all bg-[#0052FF]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>{" "}
        <div
          className={`header  absolute w-full flex items-center justify-center font-bold pt-4  ${
            progress > 10 ? "top-0 " : "-top-20"
          }`}
        >
          <div
            className={` animate__faster mt-3 animate__animated ${
              isDarkMode ? "text-white" : "text-black"
            } font-bold text-lg ${
              progress > 10 && progress <= 95 ? "animate__slideInDown" : ""
            } ${progress >= 95 ? "animate__slideOutUp" : ""}`}
          >
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

          </div>
        </div>
        <div
          className={`messages absolute w-full flex items-center justify-center pb-4 ${
            progress > 10 ? "bottom-0" : "-bottom-20"
          }`}
        >
          {progress <= 40 && (
            <div
              className={`text-sm md:text-base rounded-full animate__faster animate__animated py-3 px-4 font-bold ${
                isDarkMode
                  ? `bg-[#111] text-white shadw-[0px_2px_20px_10px_#f7fafc09]`
                  : "bg-white shadow-[0px_0px_15px_10px_#00000009]"
              }  ${
                progress > 10 && progress <= 35 ? "animate__slideInUp" : ""
              } ${progress >= 35 ? "animate__slideOutDown" : ""}`}
            >
              Hey👋 Nice seeing you
            </div>
          )}
          {progress > 40 && progress <= 85 && (
            <div
              className={`text-sm md:text-base rounded-full animate__faster animate__animated py-3 px-4 font-bold ${
                isDarkMode
                  ? `bg-[#111] text-white shadw-[0px_2px_20px_10px_#f7fafc09]`
                  : "bg-white shadow-[0px_0px_15px_10px_#00000009]"
              }  ${
                progress > 40 && progress <= 82 ? "animate__slideInUp" : ""
              } ${progress >= 82 ? "animate__slideOutDown" : ""}`}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 animate-spin mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>

                <div className="div">Setting up the page...</div>
              </div>
            </div>
          )}
          {progress > 85 && (
            <div
              className={`text-sm md:text-base flex items-center rounded-full animate__faster animate__animated py-3 px-4 font-bold ${
                isDarkMode
                  ? `bg-[#111] text-white shadw-[0px_2px_20px_10px_#f7fafc09]`
                  : "bg-white shadow-[0px_0px_15px_10px_#00000009]"
              }  ${
                progress > 85 && progress <= 95 ? "animate__slideInUp" : ""
              }${progress >= 95 ? "animate__slideOutDown" : ""}`}
            >
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 mr-2 text-green-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="message"> Your page is ready</div>
            </div>
          )}
        </div>
      </section>{" "}
    </div>
  ) : null;
}
