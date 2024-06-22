"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { userId } = useAuth();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (userId) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [userId]);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="flex mt-3">
            {isAuth && <Button>
              Go to Chats <ArrowRight className="ml-2" />
            </Button>}
          </div>

          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Join millions of students, researchers and professionals to
            instantly answer questions and understand research with AI
          </p>

          <div className="w-full mt-4">
            {isAuth ? (<h1>File Upload</h1>):(
              <Link href='/sign-in'>
                <Button> Login to get Started! 
                <LogIn className="m-4 h-5 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}