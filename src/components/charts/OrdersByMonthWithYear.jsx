import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { config } from '../../utils/axiosconfig'
import { base_url } from "../../utils/base_url";



const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

export default function OrdersByMonthWithYear() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}user/getorder/monthandyear`,config)
        setData(response.data)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to fetch data')
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const chartData = data.map(item => ({
    yearMonth: `${monthNames[item._id.month - 1]} ${item._id.year}`,
    totalOrders: item.totalOrders,
    totalRevenue: item.totalRevenue / 1000 // Convert to thousands for better display
  }))

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Orders and Revenue Overview</CardTitle>
        <CardDescription>
          Monthly orders and revenue by year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="yearMonth" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="totalOrders" fill="#8884d8" name="Total Orders" />
            <Bar yAxisId="right" dataKey="totalRevenue" fill="#82ca9d" name="Total Revenue (K)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}