import * as React from "react";
import {cn} from "@/lib/utils.ts"
import {
    Field,
    FieldGroup, FieldLabel
} from "@/components/ui/field.tsx"
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

export  function LoginForm({className, ...props}: React.ComponentProps<"form">) {
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <FieldGroup>
                <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">Login to your account</h1>
                    <p className="text-sm text-balance text-muted-foreground">
                        Enter your email below to login to your account.
                    </p>
                </div>
                <Field>
                    <FieldLabel htmlFor="username">Username</FieldLabel>
                    <Input id="username" type="text" placeholder="Username" required/>
                </Field>
                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">Forget password? Contact Support Team.</a>
                    </div>
                    <Input id="password" type="password" required/>
                </Field>
                <Field>
                    <Button type="submit">Login</Button>
                </Field>

            </FieldGroup>
        </form>
    )
}