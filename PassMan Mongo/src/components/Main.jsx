import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

// you have to apply cors in the express app for fetch to work

const Main = () => {
    const imgref = useRef();
    const passwordref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordarray, setpasswordarray] = useState([])

    const getpassword = async () => {
        const a = await fetch("http://localhost:3000")
        const password = await a.json()
        console.log(password)
        setpasswordarray(password)
        // let passwords = localStorage.getItem("passwords")
        // if (passwords) {
        //     setpasswordarray(JSON.parse(passwords))
        // }
    }


    useEffect(() => {
        getpassword()
    }, [])


    const handleinput = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }


    const showpassword = () => {
        passwordref.current.type = "text"
        if (passwordref.current.value == "") {
            return
        }
        if (imgref.current.src.includes("icons/hidden.png")) {
            imgref.current.src = "icons/eye.png"
            passwordref.current.type = "password"

        }
        else {
            passwordref.current.type = "text"
            imgref.current.src = "icons/hidden.png"
        }

    }


    const savepassword = async () => {

        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            toast('🦄 Password Saved!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });


            // If any such id exists in the db, delete it 
            if(form.id)
            {
                await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })
            }

            setpasswordarray([...passwordarray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            // localStorage.setItem("passwords", JSON.stringify([...passwordarray, form]))
            // console.log([...passwordarray, form])
            setform({ site: "", username: "", password: "" })
        }
        else {
            alert("Your Credentials Are Invalid!")
        }
    }

    const editpassword = (id) => {

        setform({ ...passwordarray.filter(i => i.id === id)[0], id: id })
        setpasswordarray(passwordarray.filter(item => item.id !== id))
    }
    const deletepassword = async (id) => {
        let c = confirm("Do you really want to delete your password?")
        if (c) {
            setpasswordarray(passwordarray.filter(item => item.id != id))
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id}) })

            toast(' Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }


    return (

        <div className='w-screen'>
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
                theme="light"
                transition={Bounce}
            />
            <div className='flex flex-col justify-center items-center gap-4'>
                <div className=' font-serif pt-10 text-5xl lg:text-8xl  lg:pt-20'>
                    <span className='text-green-400'>Pass</span>
                    <span className='text-neutral-800'>Man</span>
                </div>

                <h1 className='font-sans text-2xl lg:text-5xl'>
                    Your Own Password Manager
                </h1>
            </div>

            <div className='flex flex-col justify-center items-center pt-12 font-bold gap-2'>
                <input className='w-44 lg:w-3xl border border-b-black rounded-full p-3 py-2 mb-5' value={form.site} type="text" placeholder='Entre your site' name='site' onChange={handleinput} />
                <div className='flex flex-row gap-3'>
                    <input className='  w-44 lg:w-2xl border border-b-black rounded-full p-3 py-2' value={form.username} type="text" placeholder='Entre your username' name='username' onChange={handleinput} />
                    <div className=' relative'>
                        <input ref={passwordref} className=' w-44 lg:w-55 border border-b-black rounded-full p-3 py-2' value={form.password} type="password" placeholder='Entre your password' name='password' onChange={handleinput} />

                        <span className='absolute right-[15px] top-[9px]' onClick={showpassword} >
                            <img ref={imgref} width={26} src="/icons/eye.png" alt="" />
                        </span>
                    </div>
                </div>

                <button onClick={savepassword} className=' text-slate-200 border border-black rounded-full mt-10 w-44 font-bold text-2xl bg-gradient-to-r from-green-400 to-blue-700 hover:bg-gradient-to-r hover:from-blue-700 hover:to-green-400'>

                    Save

                </button>
            </div>

            <div className='flex justify-center items-center'>

                <div className='border border-black bg-black rounded-full w-3xl h-[3px] mt-10 '> </div>
            </div>


            <div className='passwords flex flex-col justify-center items-center'>
                <h1 className='m-6 text-2xl'>Your Passwords</h1>
                {passwordarray.length === 0 && (
                    <div className='mb-3 text-2xl text-black italic'>
                        No Passwords To Show 😢
                    </div>
                )}

                {passwordarray.length !== 0 && (

                    < div className="relative mb-8 w-[95%] max-w-5xl overflow-x-auto rounded-3xl border border-pink-500/20 bg-gradient-to-br from-[#12001A]/90 via-[#1A0033]/80 to-[#0B0018]/90 shadow-[0_0_50px_rgba(236,72,153,0.2)] backdrop-blur-2xl transition-all duration-500 hover:shadow-[0_0_70px_rgba(147,51,234,0.35)]">

                        {/* glowing aura */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-600/10 via-purple-700/10 to-indigo-600/10 blur-3xl"></div>

                        <table className="relative z-10 min-w-full text-sm text-pink-100 sm:text-base">
                            <thead className="bg-gradient-to-r from-pink-600/30 via-purple-700/30 to-indigo-600/30 text-pink-300 uppercase text-xs tracking-wider sm:text-sm">
                                <tr>
                                    <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-semibold whitespace-nowrap">Site</th>
                                    <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-semibold whitespace-nowrap">Username</th>
                                    <th className="px-3 py-3 sm:px-6 sm:py-4 text-left font-semibold whitespace-nowrap">Password</th>
                                    <th className="px-3 py-3 sm:px-6 sm:py-4 text-right font-semibold whitespace-nowrap">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-pink-500/10">
                                {passwordarray.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="group hover:bg-gradient-to-r hover:from-pink-600/10 hover:via-purple-700/10 hover:to-indigo-600/10 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.25)]"
                                    >
                                        <td className="px-3 py-3 sm:px-6 sm:py-4 font-medium text-white break-words">
                                            <a
                                                href={item.site.startsWith('http') ? item.site : `https://${item.site}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="hover:text-pink-400 transition-colors"
                                            >
                                                {item.site}
                                            </a>
                                        </td>
                                        <td className="px-3 py-3 sm:px-6 sm:py-4 text-gray-300 group-hover:text-white transition-colors break-words">
                                            {item.username}
                                        </td>
                                        <td className="px-3 py-3 sm:px-6 sm:py-4 font-mono text-gray-400 group-hover:text-pink-300 transition-all break-words">
                                            {"*".repeat(item.password.length)}
                                        </td>
                                        <td className="px-3 py-3 sm:px-6 sm:py-4 text-right font-semibold text-pink-400 whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-3">
                                                <span onClick={() => editpassword(item.id)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/iubtdgvu.json"
                                                        trigger="hover"
                                                        colors="primary:#c7c116,secondary:#ffffff"
                                                        style={{ width: "25px", height: "25px" }}
                                                    ></lord-icon>
                                                </span>

                                                <span onClick={() => deletepassword(item.id)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/tftntjtg.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff,secondary:#ffffff"
                                                        style={{ width: "25px", height: "25px" }}
                                                    ></lord-icon>
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                )}



            </div>



        </div >
    )
}

export default Main
