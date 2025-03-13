"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/slices/authSlice"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Loader2, Mail, Lock } from "lucide-react"
import LoginImg from "../assets/loginImg.svg"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated, isLoading, error } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login({ username, password }))
  }

  return (
    <div className="h-screen flex">
      <div className="hidden lg:flex lg:w-2/3 bg-slate-50 items-center justify-center ">
        <div style={{
            backgroundImage:`url(${LoginImg})`,
            backgroundPosition:"center"
        }} className=" flex-1 h-full">
          
        
        </div>
      </div>

      <div className="w-full lg:w-1/3 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-none shadow-none">
          <CardContent className="pt-6">
            <div className="mb-8">
              <h1 className="text-xl text-center font-semibold text-slate-800 mb-1">Login into your account</h1>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[#555555] mb-4">
                    Email Id :
                  </label>
                  <div className="relative mt-2">
                    <Input
                      id="email"
                      type="text"
                      placeholder="kminchelle"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-3 pr-10 py-6"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute px-4 right-0 !bg-[#1E2772]  top-0 h-full aspect-square text-white"
                    >
                      <Mail className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="text-sm font-medium text-[#555555] ">
                      Password
                    </label>
                  </div>
                  <div className="relative mt-2">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-3 pr-10 py-6"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute px-4 !bg-[#1E2772] right-0 top-0 h-full aspect-square text-white"
                    >
                      <Lock className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex my-6 justify-end">
                    <a href="#" className="text-sm text-indigo-600 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                </div>

                <Button type="submit" className="w-full mt-4 shadow-2xl py-6 !bg-[#1E2772]  hover:bg-indigo-800" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Login now"
                  )}
                </Button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                  </div>
                </div>

                <Button type="button" variant="outline" className="w-full py-6" onClick={() => navigate("/signup")}>
                  Signup now
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login

