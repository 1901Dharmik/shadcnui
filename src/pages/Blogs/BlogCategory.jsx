import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Pencil, Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  deleteABlogCat,
  getCategories,
  resetState,
} from "../../features/bcategory/bcategorySlice"

const Blogcatlist = () => {
  const [open, setOpen] = useState(false)
  const [blogCatId, setBlogCatId] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetState())
    dispatch(getCategories())
  }, [dispatch])

  const bCatState = useSelector((state) => state.bCategory.bCategories)

  const showModal = (id) => {
    setOpen(true)
    setBlogCatId(id)
  }

  const hideModal = () => {
    setOpen(false)
  }

  const deleteBlogCategory = async () => {
    await dispatch(deleteABlogCat(blogCatId))
    dispatch(getCategories())
    setOpen(false)
  }

  const columns = [
    {
      accessorKey: "key",
      header: "SNo",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      header: "Action",
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link to={`/admin/addblogcat/${row._id}`}>
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => showModal(row._id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]

  const data = bCatState?.map((category, index) => ({
    key: index + 1,
    name: category.title,
    _id: category._id,
  }))

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Blog Categories</h3>
      <Table className="border">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessorKey || column.id}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow  key={row._id}>
              {columns.map((column) => (
                <TableCell key={column.accessorKey || column.id}>
                  {column.accessorKey
                    ? row[column.accessorKey]
                    : column.cell({ row })}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog category?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={hideModal}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteBlogCategory}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Blogcatlist
