import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { getErrorMessage } from '@/lib/apiClient'
import { User, CurrencyDollar, FileText, MagnifyingGlass } from '@phosphor-icons/react'

const loanSchema = z.object({
  borrowerName: z.string().min(2, 'Borrower name is required'),
  borrowerId: z.string().min(1, 'Borrower ID is required'),
  amount: z.number().min(10000, 'Minimum loan amount is ₱10,000'),
  term: z.number().min(6, 'Minimum term is 6 months').max(60, 'Maximum term is 60 months'),
  purpose: z.string().min(10, 'Please describe the loan purpose'),
})

type LoanForm = z.infer<typeof loanSchema>

export default function LoanCreatePage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanForm>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      borrowerName: '',
      borrowerId: '',
      amount: 0,
      term: 0,
      purpose: '',
    },
  })

  const onSubmit = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success('Loan application submitted successfully')
      navigate('/loans/monitoring')
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Loan Application</h1>
        <p className="text-muted-foreground">Submit a new loan application for review</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" weight="duotone" />
              Borrower Information
            </CardTitle>
            <CardDescription>CIS lookup and borrower details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="borrowerId">Borrower ID</Label>
              <div className="flex gap-2">
                <Input id="borrowerId" placeholder="Enter borrower ID" {...register('borrowerId')} />
                <Button type="button" variant="outline" size="icon">
                  <MagnifyingGlass className="h-4 w-4" />
                </Button>
              </div>
              {errors.borrowerId && (
                <p className="text-sm text-destructive">{errors.borrowerId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="borrowerName">Full Name</Label>
              <Input id="borrowerName" placeholder="Juan Dela Cruz" {...register('borrowerName')} />
              {errors.borrowerName && (
                <p className="text-sm text-destructive">{errors.borrowerName.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CurrencyDollar className="h-5 w-5" weight="duotone" />
              Loan Parameters
            </CardTitle>
            <CardDescription>Amount, term, and purpose</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Loan Amount (PHP)</Label>
              <Input id="amount" type="number" placeholder="250000" {...register('amount', { valueAsNumber: true })} />
              {errors.amount && (
                <p className="text-sm text-destructive">{errors.amount.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="term">Term (months)</Label>
              <Input id="term" type="number" placeholder="24" {...register('term', { valueAsNumber: true })} />
              {errors.term && (
                <p className="text-sm text-destructive">{errors.term.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Input id="purpose" placeholder="Business expansion" {...register('purpose')} />
              {errors.purpose && (
                <p className="text-sm text-destructive">{errors.purpose.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" weight="duotone" />
              Review & Submit
            </CardTitle>
            <CardDescription>Please verify all information before submitting</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => navigate('/loans/monitoring')}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
