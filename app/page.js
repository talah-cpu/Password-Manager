"use client";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState, useEffect } from "react";
export default function Navbar() {
  const ref = useRef(null);
  const passwordRef = useRef(null);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([])
  const [editIndex, setEditIndex] = useState(null);
  useEffect(() => {
    let passwords = localStorage.getItem("password");

    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied to Clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
  };

  const showPassword = () => {
    passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password";
    ref.current.src = passwordRef.current.type === "password"
      ? "/icons/Eye off.png"
      : "/icons/Eye.png";
  }
  const savePassword = () => {
    if (!form.site || !form.username || !form.password) {
      toast('please sari field bahro', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
      
    });
      return;
    }

    let newArray;

    if (editIndex !== null) {
      // ✏️ EDIT MODE
      newArray = passwordArray.map(item =>
        item.id === editIndex ? { ...form, id: editIndex} : item
      );
      setEditIndex(null);
    } else {
      // ➕ ADD MODE
     newArray = [...passwordArray, { ...form, id: uuidv4() }];
    }

    setPasswordArray(newArray);
    localStorage.setItem("password", JSON.stringify(newArray));
    setForm({ site: "", username: "", password: "" });

    toast('Save password successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
      
    });
  };

  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });

  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
       
      />
      {/* NAVBAR */}

      <nav className="w-full bg-gray-800 flex items-center justify-between px-1 md:px-6 py-3 shadow-md sm:h-16
       ">

        <h1 className="text-xl font-bold mx-auto ">
          <span className="text-white">&lt;Pass</span>
          <span className="text-green-700">OP</span>
          <span className="text-green-700">/&gt;</span>
        </h1>

        <button onClick={() => window.open("https://github.com/talah-cpu", "_blank")} className="flex cursor-pointer items-center gap-2 border-2 bg-green-600 text-white px-2 py-1 mx-auto rounded-3xl hover:bg-green-700 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.71-2.78.61-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.05 1.53 1.05.9 1.54 2.36 1.1 2.94.84.09-.66.35-1.1.63-1.35-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.72.11 2.52.33 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.21 2.39.1 2.64.64.7 1.02 1.59 1.02 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .26.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"
            />
          </svg>
          GitHub
        </button>
      
      </nav>

      {/* TITLE BELOW NAV (CENTERED) */}
      <div className="text-center mt-14">
        <h1 className="text-3xl font-bold sm:text-4xl text-center">
          <span className="text-black">&lt;Pass</span>
          <span className="text-green-700">OP</span>
          <span className="text-green-700">/&gt;</span>
        </h1>

        <p className="text-gray-600 text-sm mt-1">
          Your own Password Manager
        </p>
        <input value={form.site} onChange={handleChange} className="border-2 border-cyan-100 rounded-3xl w-full p-1 my-5 lg:w-3/4" type="text" placeholder="Enter website URL" name='site' />
      </div>

      {/* USERNAME INPUT FIELD */}
      <div className="flex flex-col lg:flex-row gap-4 lg:w-3/4 mx-auto  ">
        <input value={form.username} onChange={handleChange} className="border-2 border-cyan-100 p-1 rounded-full  mb-5 w-full  py-1  lg:flex-1 " type="text" placeholder="Enter Username" name='username' />
        <div className="relative">
          <input ref={passwordRef} value={form.password} onChange={handleChange} className="border-2 border-cyan-100 p-1 rounded-full w-full  py-1 pr-12 " type="password" placeholder="Enter Password" name='password' />
          <span className="absolute right-0 top-1" onClick={showPassword}>
            <img ref={ref} className="w-[25px] cursor-pointer mr-3  " src="icons/Eye.png" alt="eye" />
          </span>
        </div>
      </div>

      {/* BUTTON */}
      <div className="text-center mt-4">
        <button onClick={savePassword} className="border-2  bg-green-500 text-white px-4 py-2 rounded-3xl w-27 hover:bg-green-700 transition">
          Save
        </button>
        <h2 className=" font-bold mt-2 w-fit lg:ml-43 ">Your Passwords</h2>
        {passwordArray.length === 0 && <div>No password to show</div>}

        {passwordArray.length != 0 && <table className="table-fixed w-full mt-2 border-collapse  border-white overflow-hidden rounded-md bg-green-100 lg:w-3/4 lg:mx-auto ">
          <thead className="bg-green-800 text-white ">
            <tr>
              <th className="">Site</th>
              <th >Username</th>
              <th className="">Password</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody>
            {passwordArray.map((item, index) => (
              <tr key={item.id}>
                <td className="py-2 border border-white">
                  <div className="flex items-center justify-center gap-2  mx-auto ">

                    <a
                      href={item.site}
                      target="_blank"
                      className="break-all truncate"
                    >
                      {item.site}
                    </a>
                    <div
                      className="absolute z-20 left-1/2 top-full mt-1 -translate-x-1/2
    w-max max-w-[400px] break-all
    scale-0 group-hover:scale-100
    bg-black text-white text-xs px-2 py-1 rounded
    transition-all duration-200 "
                    >
                      {item.site}
                    </div>

                    <div className="relative group shrink-0">
                      <img
                        onClick={() => copyText(item.site)}
                        className="w-4 cursor-pointer hover:scale-110 "
                        src="icons/Copy.png"
                        alt="copy"
                      />
                      <span
                        className="absolute -top-7 left-[63%] -translate-x-1/2 
               scale-0 group-hover:scale-100
               bg-black text-white text-xs px-2 py-1 rounded
               transition-all duration-200"
                      >
                        Copy
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-2 border border-white">
                  <div className="flex items-center justify-center gap-2 ">
                    <span className="truncate max-w-[200px]">{item.username}</span>
                    <div className="relative group shrink-0">
                      <img
                        onClick={() => copyText(item.username)}
                        className="w-4 cursor-pointer  hover:scale-110"
                        src="icons/Copy.png"
                        alt=""
                      />
                      <span
                        className="absolute -top-7 left-[63%] -translate-x-1/2 
               scale-0 group-hover:scale-100
               bg-black text-white text-xs px-2 py-1 rounded
               transition-all duration-200"
                      >

                        Copy
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-2 border border-white">
                  <div className="flex items-center justify-center gap-2 ">
                    <span className="truncate max-w-[150px]">{"*".repeat(item.password.length)}</span>
                    <div className="relative group shrink-0">
                      <img
                        onClick={() => copyText(item.password)}
                        className="w-4 cursor-pointer  hover:scale-110 "
                        src="icons/Copy.png"
                        alt=""
                      />
                      <span
                        className="absolute -top-7 left-[63%] -translate-x-1/2 
               scale-0 group-hover:scale-100
               bg-black text-white text-xs px-2 py-1 rounded
               transition-all duration-200"
                      >
                        Copy
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-2 border border-white">
                  <div className="flex items-center justify-center gap-4">

                    {/* DELETE */}
                    <div
                      className="relative group"
                      onClick={() => { 
                       
                         const newArray = passwordArray.filter((password) => password.id !== item.id);
                        setPasswordArray(newArray);
                        localStorage.setItem("password", JSON.stringify(newArray));
                        toast('Password deleted successfully', {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: false,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark"
                        });
                      }}
                    >
                      <img
                        className="w-5 cursor-pointer"
                        src="icons/Delete.png"
                        alt="delete"
                      />
                      <span
                        className="absolute -top-7 left-1/2 -translate-x-1/2 
        scale-0 group-hover:scale-100
        bg-black text-white text-xs px-2 py-1 rounded
        transition-all duration-200"
                      >
                        Delete
                      </span>
                    </div>

                    {/* EDIT */}
                    <div
                      className="relative group"
                      onClick={() => { 
                        setForm({
                          site: item.site,
                          username: item.username,
                          password: item.password,
                          
                        });
                        setEditIndex(item.id);
                      }}
                    >
                      <img
                        className="w-5 cursor-pointer"
                        src="icons/Edit.png"
                        alt="edit"
                      />
                      <span
                        className="absolute -top-7 left-1/2 -translate-x-1/2 
        scale-0 group-hover:scale-100
        bg-black text-white text-xs px-2 py-1 rounded
        transition-all duration-200"
                      >
                        Edit
                      </span>
                    </div>

                  </div>
                </td>


              </tr>

            ))}

          </tbody>
        </table>
        }
      </div>


    </>
  );
}