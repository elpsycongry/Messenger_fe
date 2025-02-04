import {Navigate, useNavigate, useSearchParams} from "react-router-dom";
import userService from "../../service/userService";
import axios from "axios";
import {useEffect, useState} from "react";

export default function VerifiedEmail() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [countDown, setCountDown] = useState(5)
    const [verified, setVerified] = useState()
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token')
    const navigate = useNavigate();

    useEffect(() => {
        userService.verifyToken(token).then(res => {
            setLoading(false);
            setVerified("true")

            let timer = setInterval(() => {
                setCountDown((countDown) => {
                    if (countDown === 0) {
                        clearInterval(timer);
                        navigate("/login", {replace: true});
                    } else return countDown - 1;
                });
            }, 1000);
        }).catch(e => {
            setLoading(false);
            setVerified("false");
            let timer = setInterval(() => {
                setCountDown((countDown) => {
                    if (countDown === 0) {
                        clearInterval(timer);
                        navigate("/login", {replace: true});
                    } else return countDown - 1;
                });
            }, 1000);
        })
    }, []);

    const doNavigate = () => {
        // while (countDown > 0) {
        //     setTimeout(() => {
        //         if (countDown <= 0) {
        //             return <Navigate to="/login"></Navigate>
        //         }
        //         setCountDown(countDown - 1)
        //     }, 1000)
        // }
        console.log("navitet")
    }

    const returnLoading = () => {
        return(
            <div className={"pl-3 mb-1"}>
                {
                    loading ?
                        <div role="status">
                            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                        : verified === 'true' ? (
                                <svg className="h-10 w-10 text-green-500" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                                     stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z"/>
                                    <path d="M5 12l5 5l10 -10"/>
                                </svg>) :
                            <svg className="h-10 w-10 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                }
            </div>
        )

    }


    if (!token) {
        return <Navigate to="/login"></Navigate>
    }


    return (
        <div className="relative flex min-h-screen flex-col items-baseline  overflow-hidden pt-10 pl-10  bg-white">
            <div className=" px-5 text-center flex items-center justify-center">
                {verified ? (verified === "true" ?
                        <h4 className="mb-2 text-[30px] font-bold text-zinc-800">Xác minh tài khoản thành công </h4>
                        : <h4 className="mb-2 text-[30px] font-bold text-zinc-800">Xác minh tài khoản thất bại</h4>)
                    :
                    <h4 className="mb-2 text-[30px] text-left font-bold text-zinc-800">Chúng tôi đang xác minh email của bạn </h4>}
                <div className={"max-w-xl"}></div>
                <span> {returnLoading()} </span>
            </div>
            <div className="px-5 text-left flex items-center justify-center text-xl">
                {verified ? <a href={"/login"} className={"text-primary-800 underline"}>Bạn sẽ được chuyển hướng về trang login trong {countDown}</a> : <p>Quá trình này có thể mất một vài phút</p>}
            </div>
        </div>
    );
}