import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';


const Register = () => {
  
  return (
    <div className='w-full max-w-7xl mx-auto h-[70vh] flex justify-center gap-10  '>
        {/* <div className='w-1/4 h-[16rem] bg-[#255cf4]/10 mt-20 flex flex-col items-center justify-center rounded-xl' >
        <div className='w-24 h-24 rounded-xl '>
            <img src="/dreamroad.svg" alt="" />
        </div>
        <Button variant={'custom'} size={'custom'} className='mt-4'>Login as Employers</Button>
        </div> */}
        <div className='h-full  w-fit'>
        <Signup/>
        </div>
    
    </div>
  )
}

export default Register;

export const Signup = () => {
  return (
    <div className="min-h-screen h-fit flex pt-20 items-start justify-center p-4 ">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {/* <div className="flex justify-center mb-4">
            <div className="rounded-lg overflow-hidden w-10 h-10">
                <img src="/dreamroad.svg" alt="" className='object-cover w-full h-full' />
            </div>
          </div> */}
          <CardTitle className="text-2xl font-bold">Join Dream Road</CardTitle>
          <CardDescription>Create your  account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" placeholder="Doe" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ram@gmail.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-[#255cf4] hover:bg-blue-500">
              Create account
            </Button>
            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

