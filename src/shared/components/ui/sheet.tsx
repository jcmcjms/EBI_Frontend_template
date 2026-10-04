"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Dialog } from "radix-ui"

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r max-w-sm data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l max-w-sm data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

type DialogRootProps = Omit<React.ComponentProps<typeof Dialog.Root>, "className">

function Sheet({ ...props }: DialogRootProps) {
  return <Dialog.Root {...props} />
}

function SheetTrigger({
  asChild = false,
  ...props
}: React.ComponentProps<typeof Dialog.Trigger> & {
  asChild?: boolean
}) {
  return <Dialog.Trigger asChild={asChild} {...props} />
}

function SheetClose({
  asChild = false,
  ...props
}: React.ComponentProps<typeof Dialog.Close> & {
  asChild?: boolean
}) {
  return <Dialog.Close asChild={asChild} {...props} />
}

function SheetPortal({
  children,
  container,
  forceMount,
}: React.ComponentProps<typeof Dialog.Portal>) {
  return <Dialog.Portal container={container} forceMount={forceMount}>{children}</Dialog.Portal>
}

function SheetOverlay({
  className,
  forceMount,
  ...props
}: React.ComponentProps<typeof Dialog.Overlay>) {
  return (
    <Dialog.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      forceMount={forceMount}
      {...props}
    />
  )
}

function SheetContent({
  side = "right",
  className,
  children,
  forceMount,
  ...props
}: React.ComponentProps<typeof Dialog.Content> & VariantProps<typeof sheetVariants>) {
  return (
    <>
      <SheetOverlay forceMount={forceMount} />
      <Dialog.Portal forceMount={forceMount}>
        <Dialog.Content
          className={cn(sheetVariants({ side }), className)}
          forceMount={forceMount}
          {...props}
        >
          {children}
          <Dialog.Close className="absolute right-4 top-4 rounded-none opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </>
  )
}

function SheetHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function SheetFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetPortal,
  SheetOverlay,
}