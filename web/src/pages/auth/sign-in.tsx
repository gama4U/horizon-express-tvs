import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { IUserCredential, UserType } from "../../interfaces/user.interface";
import { useAuth } from "../../providers/auth-provider";
import { signIn } from "../../api/mutations/auth.mutation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import CommonInput from "../../components/common/input";
import logo from "../../assets/logo.png";
import backgroundImage from "../../assets/cover-photo.jpg";
import Loader from "../../components/animated/Loader";
import AnimatedDiv from "../../components/animated/Div";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().trim().min(1, {
    message: "Password is required."
  })
});

export default function SignIn() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const {mutate: signInMutate, isPending: signingUp} = useMutation({
    mutationFn: async (data: IUserCredential) => await signIn(data),
    onError: (error) => {
      toast.error(error.message, { 
        className: 'text-destructive',
        position: 'top-center', 
      })
    },
    onSuccess: (data) => {
      login(data.token, data.user);
      switch (data.user.userType) {
        case UserType.ADMIN:
          navigate('/admin');
          break;
        default:
          navigate('/');
      }
      toast.success("Signed in successfully", {
        className: 'text-primary',
        position: 'top-center', 
      });
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    signInMutate(data);
  }

  return (
    <div className="relative h-screen w-full flex items-center justify-center">
      <Loader isLoading={signingUp} />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          filter: 'blur(2px)',
        }}
      />
      <div className="absolute inset-0 bg-black opacity-15" />

      <AnimatedDiv animationType="FadeInFromDown" duration={1}>
        <div className="relative p-12 rounded-3xl shadow-lg bg-[#FFFFFF99] z-10 flex flex-col items-center space-y-8">
          <img 
            src={logo} 
            alt="company-logo"
            className="object-contain w-[220px] h-[220px]"
          />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col w-[300px]">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <CommonInput placeholder='E. g johndoe@email.com' inputProps={{ ...field }} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <CommonInput placeholder='Enter your password' type='password' inputProps={{ ...field }} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button>
                {signingUp ? (
                  <>
                    <Loader2 size={18} className="animate-spin"/>
                    <span>Loading...</span>
                  </>
                ) : 'Sign in'}
                Sign in
              </Button>
            </form>
          </Form>
        </div>
      </AnimatedDiv>
    </div>
  )
}
