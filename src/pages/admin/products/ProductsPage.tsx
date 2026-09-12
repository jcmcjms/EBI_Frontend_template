import { useQuery } from '@tanstack/react-query'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Gate } from '@/components/auth/Gate'
import { formatCurrency } from '@/lib/utils'
import type { LoanProduct } from '@/lib/types'
import { Plus, PencilSimple, Package } from '@phosphor-icons/react'

const dummyProducts: LoanProduct[] = [
  { id: '1', name: 'Personal Loan', description: 'Unsecured personal loan for various purposes', minAmount: 50000, maxAmount: 500000, minTerm: 12, maxTerm: 36, interestRate: 12.5, isActive: true },
  { id: '2', name: 'Salary Loan', description: 'Short-term loan for salaried employees', minAmount: 20000, maxAmount: 200000, minTerm: 6, maxTerm: 24, interestRate: 10.5, isActive: true },
  { id: '3', name: 'Business Loan', description: 'Working capital for SMEs', minAmount: 100000, maxAmount: 2000000, minTerm: 12, maxTerm: 60, interestRate: 14.0, isActive: true },
  { id: '4', name: 'Auto Loan', description: 'Financing for new and used vehicles', minAmount: 200000, maxAmount: 3000000, minTerm: 12, maxTerm: 60, interestRate: 8.5, isActive: true },
  { id: '5', name: 'Home Improvement Loan', description: 'Financing for home renovations', minAmount: 100000, maxAmount: 1000000, minTerm: 12, maxTerm: 48, interestRate: 11.0, isActive: false },
]

async function fetchProducts(): Promise<LoanProduct[]> {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return dummyProducts
}

export default function ProductsPage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['loan-products'],
    queryFn: fetchProducts,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Loan Products</h1>
          <p className="text-muted-foreground">Manage available loan products and their terms</p>
        </div>
        <Gate permission="loan_product.manage">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </Gate>
      </div>

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Amount Range</TableHead>
                  <TableHead>Term Range</TableHead>
                  <TableHead>Interest Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" weight="duotone" />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-muted-foreground max-w-xs truncate">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatCurrency(product.minAmount)} - {formatCurrency(product.maxAmount)}
                    </TableCell>
                    <TableCell>{product.minTerm} - {product.maxTerm} months</TableCell>
                    <TableCell>{product.interestRate}% p.a.</TableCell>
                    <TableCell>
                      <Badge variant={product.isActive ? 'success' : 'secondary'}>
                        {product.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Gate permission="loan_product.manage">
                        <Button size="sm" variant="ghost">
                          <PencilSimple className="h-4 w-4" />
                        </Button>
                      </Gate>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
