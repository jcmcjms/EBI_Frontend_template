import * as React from "react";
import {cn} from "@/src/lib/utils"
import {
    Field,
    FieldGroup, FieldLabel
} from "@/src/components/ui/field"
import {Input} from "@/src/components/ui/input";
import {Button} from "@/src/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useLogin} from "@/src/hooks/auth";
import {CircleNotch, Eye, EyeSlash} from "@phosphor-icons/react";

const loginSchema = z.object({
    username: z.string()
        .min(3, "Username is required")
        .max(50)
        .regex(/^[a-zA-Z0-9_]+$/, "Invalid username format"),
    password: z.string()
        .min(8, "Invalid credentials")
        .max(100)
});

type LoginFormData = z.infer<typeof loginSchema>;

export  function LoginForm({className, ...props}: React.ComponentProps<"form">) {
    const[showPassword, setShowPassword] = React.useState(false);
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur"
    });
    const {mutate: login, isPending, error} = useLogin();
    const onSubmit = (data: LoginFormData) => {login(data);};
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-sm text-balance text-muted-foreground">
                        Enter your credentials below.
                    </p>
                </div>
                {error && (<div className="p-3 text-sm text-red-500 bg-red-50 rounded-md text-center"></div>)}
                <Field>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input
                    id="username"
                    placeholder="Username"
                    autoComplete="username"
                        {...register("username")}/>
                    {errors.username && (
                        <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
                    )}
                </Field>
                <Field>
                    <div className="flex items-center justify-between">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <a href="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            Forgot password?
                        </a>
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            autoComplete="current-password"
                            {...register("password")}/>
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            tabIndex={-1}
                        >
                            {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && (<p className="text-xs text-red-500 mt-1">Invalid credentials</p>
                    )}
                </Field>
                <Field>
                    <Button type="submit" disabled={isPending || isSubmitting} className="w-full">
                        {isPending ? (<CircleNotch size={20} weight="bold" className="animate-spin"/>) : ("Login")}
                    </Button>
                </Field>
            </FieldGroup>
        </form>
    )
}