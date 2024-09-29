// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { toast } from "sonner";
// import { BadgeCheck, CircleX, Loader2 } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import { signIn } from "@/services/auth.service";
// import { IUserCredential } from "@/interfaces/user.interface";
// import { useAuth } from "@/providers/auth-provider";
// import AuthImage from '../../assets/auth-image.jpg';
// import LogoImage from '../../assets/kurso-logo.png';
// import { UserType } from "../../interfaces/user.interface";

// const formSchema = z.object({
//   email: z.string().email(),
//   password: z.string().trim().min(1, {
//     message: "Password is required."
//   })
// });

// export default function SignIn() {
//   const {login} = useAuth();
//   const navigate = useNavigate();
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: ""
//     }
//   });

//   const {mutate: signInMutate, isPending: signingUp} = useMutation({
//     mutationFn: async (data: IUserCredential) => await signIn(data),
//     onError: (error) => {
//       toast(error.message, { 
//         position: 'top-center', 
//         icon: <CircleX size={20} className="text-destructive" />
//       })
//     },
//     onSuccess: (data) => {
//       login(data.token, data.user);
//       switch (data.user.role) {
//         case UserType.ADMIN:
//           navigate('/admin');
//           break;
//         default:
//           navigate('/');
//       }
//       toast("Signed in successfully", { 
//         position: 'top-center', 
//         icon: <BadgeCheck size={20} className="text-primary" />
//       });
//     }
//   });

//   function onSubmit(data: z.infer<typeof formSchema>) {
//     signInMutate(data);
//   }

//   return (
//     <div className="md:h-screen flex items-center justify-center sm:p-8 p-0">
//       <div className="w-full md:max-w-[950px] h-full md:max-h-[550px] flex md:flex-row flex-col sm:shadow-md sm:border sm:rounded-xl rounded-none md:p-0 pb-4">
//         <div className="md:h-full h-1/2 md:w-1/2 w-full">
//           <img 
//             src={AuthImage} 
//             alt="" 
//             className="md:h-full sm:h-[400px] h-[300px] w-full md:rounded-s-xl md:rounded-tr-none sm:rounded-t-xl rounded-none object-cover md:object-left object-bottom"
//           />
//         </div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 h-full flex flex-col md:overflow-y-auto md:py-8 py-0">
//             <div className="flex my-8 justify-center">
//               <Link to={'/'}>
//                 <img 
//                   src={LogoImage} 
//                   alt="" 
//                   className="w-[150px] object-cover"
//                 />
//               </Link>
//             </div>
//             <div className="h-full px-8 space-y-4">
//               <h1 className="text-md font-semibold">
//                 Sign In
//               </h1>
//               <div className="w-full space-y-2">
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email</FormLabel>
//                       <FormControl>
//                         <Input {...field} placeholder="Input email" />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="password"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Password</FormLabel>
//                       <FormControl>
//                         <Input {...field} placeholder="Input password" />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <Button type="submit" className="w-full flex gap-2 pt-2">
//                 {signingUp && 
//                   <Loader2 size={20} className="animate-spin"/>
//                 }
//                 Sign in
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   )
// }

import React from 'react'

export default function SignIn() {
  return (
    <div>SignIn</div>
  )
}
