import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createBrand, getABrand, resetState, updateABrand } from '../features/brand/brandSlice'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  title: z.string().min(1, 'Brand name is required'),
})

export default function AddBrand() {
  const dispatch = useDispatch()
  const router = useNavigate()
  const params = useParams()
  const brandId = params?.id

  const newBrand = useSelector((state) => state.brand)
  const {
    isSuccess,
    isLoading,
    isError,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })

  useEffect(() => {
    if (brandId) {
      dispatch(getABrand(brandId))
    } else {
      dispatch(resetState())
    }
  }, [brandId, dispatch])

  useEffect(() => {
    if (brandName) {
      form.setValue('title', brandName)
    }
  }, [brandName, form])

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success('Brand Added Successfully!')
      form.reset()
    }
    if (isSuccess && updatedBrand) {
      toast.success('Brand Updated Successfully!')
      router.push('/admin/list-brand')
    }
    if (isError) {
      toast.error('Something Went Wrong!')
    }
  }, [isSuccess, isLoading, isError, createdBrand, updatedBrand, router, form])

  function onSubmit(values) {
    if (brandId) {
      dispatch(updateABrand({ id: brandId, brandData: values }))
    } else {
      dispatch(createBrand(values))
    }
    setTimeout(() => {
      dispatch(resetState())
    }, 300)
  }

  return (
    <Card className="w-full max-w-full mx-auto">
      <CardHeader>
        <CardTitle>{brandId ? 'Edit' : 'Add'} Brand</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter brand name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name that will be displayed for the brand.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Submitting...' : brandId ? 'Update' : 'Add'} Brand
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}