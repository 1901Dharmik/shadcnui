// 'use client'

// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Switch } from "@/components/ui/switch"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { PlusCircle, Pencil, Trash, Copy, X } from 'lucide-react'

// const defaultPermissions = {
//   menuDisable: false,
//   // all:false,
//   view: false,
//   add: false,
//   edit: false,
//   delete: false,
//   export: false
// }

// const actions = ['Dashboard', 'Department', 'Designation', 'Role', 'Employee', 'Incentive', 'Leave', 'Help', 'Attendance', 'Salary slip']

// export default function RoleManagement() {
//   const [roles, setRoles] = useState([])
//   const [newRoleName, setNewRoleName] = useState('')
//   const [editingRole, setEditingRole] = useState(null)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [newRolePermissions, setNewRolePermissions] = useState(() => {
//     const initialPermissions = {}
//     actions.forEach(action => {
//       initialPermissions[action] = { ...defaultPermissions }
//     })
//     return initialPermissions
//   })

//   const handleCreateRole = () => {
//     if (newRoleName.trim() === '') return
//     const newRole = {
//       id: Date.now().toString(),
//       name: newRoleName,
//       permissions: newRolePermissions
//     }
//     setRoles([...roles, newRole])
//     setNewRoleName('')
//     setNewRolePermissions(() => {
//       const resetPermissions = {}
//       actions.forEach(action => {
//         resetPermissions[action] = { ...defaultPermissions }
//       })
//       return resetPermissions
//     })
//   }

//   const handleUpdateRole = () => {
//     if (!editingRole) return
//     setRoles(roles.map(role => role.id === editingRole.id ? editingRole : role))
//     setEditingRole(null)
//     setIsEditDialogOpen(false)
//   }

//   const handleDeleteRole = (roleId) => {
//     setRoles(roles.filter(role => role.id !== roleId))
//   }

//   const handleDuplicateRole = (role) => {
//     const duplicatedRole = {
//       ...role,
//       id: Date.now().toString(),
//       name: `${role.name} (Copy)`
//     }
//     setRoles([...roles, duplicatedRole])
//   }

//   const openEditDialog = (role) => {
//     setEditingRole({ ...role })
//     setIsEditDialogOpen(true)
//   }

//   const closeEditDialog = () => {
//     setEditingRole(null)
//     setIsEditDialogOpen(false)
//   }

//   const RolePermissionsTable = ({ permissions, onPermissionChange }) => (
//     <Table>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Action</TableHead>
//           <TableHead>Menu Disable</TableHead>
//           <TableHead>View</TableHead>
//           <TableHead>Add</TableHead>
//           <TableHead>Edit</TableHead>
//           <TableHead>Delete</TableHead>
//           <TableHead>Export</TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {actions.map((action) => (
//           <TableRow key={action}>
//             <TableCell>{action}</TableCell>
//             {Object.keys(defaultPermissions)?.map((permission) => (
//               <TableCell key={permission}>
//                 <Switch
//                   checked={permissions[action][permission]}
//                   onCheckedChange={(checked) => onPermissionChange(action, permission, checked)}
//                 />
//               </TableCell>
//             ))}
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   )

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create Role</h1>
//       <div className="mb-4">
//         <Input
//           type="text"
//           placeholder="Enter Role Name"
//           value={newRoleName}
//           onChange={(e) => setNewRoleName(e.target.value)}
//           className="mb-2"
//         />
//         <RolePermissionsTable 
//           permissions={newRolePermissions}
//           onPermissionChange={(action, permission, checked) => {
//             setNewRolePermissions(prev => ({
//               ...prev,
//               [action]: {
//                 ...prev[action],
//                 [permission]: checked
//               }
//             }))
//           }}
//         />
//         <Button onClick={handleCreateRole} className="mt-4">
//           <PlusCircle className="mr-2 h-4 w-4" /> Create Role
//         </Button>
//       </div>

//       <h2 className="text-xl font-bold mb-4">Existing Roles</h2>
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Role Name</TableHead>
//             <TableHead>Actions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {roles.map((role) => (
//             <TableRow key={role.id}>
//               <TableCell>{role.name}</TableCell>
//               <TableCell>
//                 <Button variant="outline" size="icon" onClick={() => openEditDialog(role)} className="mr-2">
//                   <Pencil className="h-4 w-4" />
//                 </Button>
//                 <Button variant="outline" size="icon" onClick={() => handleDeleteRole(role.id)} className="mr-2">
//                   <Trash className="h-4 w-4" />
//                 </Button>
//                 <Button variant="outline" size="icon" onClick={() => handleDuplicateRole(role)}>
//                   <Copy className="h-4 w-4" />
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
//         <DialogContent className="max-w-4xl">
//           <DialogHeader>
//             <DialogTitle>Edit Role: {editingRole?.name}</DialogTitle>
//           </DialogHeader>
//           <Input
//             type="text"
//             value={editingRole?.name || ''}
//             onChange={(e) => setEditingRole(prev => prev ? { ...prev, name: e.target.value } : null)}
//             className="mb-2"
//           />
//           {editingRole && (
//             <RolePermissionsTable 
//               permissions={editingRole.permissions}
//               onPermissionChange={(action, permission, checked) => {
//                 setEditingRole(prev => prev ? {
//                   ...prev,
//                   permissions: {
//                     ...prev.permissions,
//                     [action]: {
//                       ...prev.permissions[action],
//                       [permission]: checked
//                     }
//                   }
//                 } : null)
//               }}
//             />
//           )}
//           <div className="flex justify-end mt-4">
//             <Button onClick={closeEditDialog} variant="outline" className="mr-2">
//               <X className="mr-2 h-4 w-4" /> Cancel
//             </Button>
//             <Button onClick={handleUpdateRole}>
//               <Pencil className="mr-2 h-4 w-4" /> Update Role
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }
// "use client"

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, Pencil, Trash, Copy, X } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { refreshUserData } from '@/features/auth/authService'
import { base_url } from "../utils/base_url"
const defaultPermissions = {
  // all: false,
 menuVisible:false,
  read: false,
  create: false,
  update: false,
  delete: false,
  export:false,
}

const actions = ['admin-login','enquiry', 'coupon', 'order', 'roles', 'blogcategory', 'blog', 'upload', 'category', 'brands', 'product','color','agents','events','blog-category','blog']

export default function RoleManagement() {
  const { toast } = useToast()
  const [roles, setRoles] = useState([])
  const [newRoleName, setNewRoleName] = useState('')
  const [editingRole, setEditingRole] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [newRolePermissions, setNewRolePermissions] = useState(() => {
    const initialPermissions = {}
    actions.forEach(action => {
      initialPermissions[action] = { ...defaultPermissions }
    })
    return initialPermissions
  })

  useEffect(() => {
    fetchRoles()
  }, [])


  const handleCreateRole = async () => {
    if (newRoleName.trim() === '') return
    const newRole = {
      name: newRoleName,
      permissions: Object.entries(newRolePermissions).map(([resource, actions]) => ({
        resource,
        actions: Object.entries(actions).filter(([_, value]) => value).map(([key]) => key)
      }))
    }
    try {
      await axios.post(`${base_url}roles`, newRole, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      toast({ title: "Success", description: "Role created successfully" })
      await fetchRoles()
      await handleUserDataRefresh()
      setNewRoleName('')
      setNewRolePermissions(() => {
        const resetPermissions = {}
        actions.forEach(action => {
          resetPermissions[action] = { ...defaultPermissions }
        })
        return resetPermissions
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create role",
        variant: "destructive",
      })
    }
  }

  const handleUpdateRole = async () => {
    if (!editingRole) return
    const updatedRole = {
      name: editingRole?.name,
      permissions: Object.entries(editingRole.permissions)?.map(([resource, actions]) => ({
        resource,
        actions: Object.entries(actions).filter(([_, value]) => value).map(([key]) => key)
      }))
    }
    try {
      await axios.patch(`${base_url}roles/${editingRole._id}`, updatedRole, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      toast({ title: "Success", description: "Role updated successfully" })
      await fetchRoles()
      await handleUserDataRefresh()
      setEditingRole(null)
      setIsEditDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update role",
        variant: "destructive",
      })
    }
  }

  const handleDeleteRole = async (roleId) => {
    try {
      await axios.delete(`${base_url}roles/${roleId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      toast({ title: "Success", description: "Role deleted successfully" })
      await fetchRoles()
      await handleUserDataRefresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete role",
        variant: "destructive",
      })
    }
  }

  const handleDuplicateRole = async (role) => {
    const duplicatedRole = {
      name: `${role.name} (Copy)`,
      permissions: role.permissions
    }
    try {
      await axios.post(`${base_url}roles`, duplicatedRole, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      toast({ title: "Success", description: "Role duplicated successfully" })
      await fetchRoles()
      await handleUserDataRefresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate role",
        variant: "destructive",
      })
    }
  }
  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${base_url}roles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the auth token in localStorage
        }
      })
      setRoles(response.data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch roles",
        variant: "destructive",
      })
    }
  }
  // const openEditDialog = (role) => {
  //   setEditingRole({ ...role })
  //   setIsEditDialogOpen(true)
  // }
    // Function to refresh user data after role changes
    const handleUserDataRefresh = async () => {
      try {
        await refreshUserData()
      } catch (error) {
        console.error('Failed to refresh user data:', error)
        toast({
          title: "Warning",
          description: "Unable to refresh user data. Please log in again.",
          variant: "destructive",
        })
      }
    }
  const openEditDialog = (role) => {
    // Transform the permissions array into the expected format
    const formattedPermissions = {}
    actions.forEach(action => {
      formattedPermissions[action] = { ...defaultPermissions }
      // Find the permission for this action in role.permissions
      const permission = role.permissions.find(p => p.resource === action)
      if (permission) {
        // Set each permission type to true if it exists in the actions array
        permission.actions.forEach(actionType => {
          formattedPermissions[action][actionType] = true
        })
      }
    })
  
    setEditingRole({
      ...role,
      permissions: formattedPermissions
    })
    setIsEditDialogOpen(true)
  }
  const closeEditDialog = () => {
    setEditingRole(null)
    setIsEditDialogOpen(false)
  }

  const RolePermissionsTable = ({ permissions, onPermissionChange }) => (
    <Table className="border mt-12">
      <TableHeader>
        <TableRow>
          <TableHead>Action</TableHead>
          <TableHead>MenuVisible</TableHead>
          <TableHead>READ</TableHead>
          <TableHead>CREATE</TableHead>
          <TableHead>UPDATE</TableHead>
          <TableHead>DELETE</TableHead>
          <TableHead>EXPORT</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {actions.map((action) => (
          <TableRow key={action}>
            <TableCell className="capitalize">{action}</TableCell>
            {Object.keys(defaultPermissions)?.map((permission) => (
              <TableCell key={permission}>
                <Switch
                  checked={permissions[action][permission]}
                  onCheckedChange={(checked) => onPermissionChange(action, permission, checked)}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Role</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Enter Role Name"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          className="mb-2"
        />
        <RolePermissionsTable 
          permissions={newRolePermissions}
          onPermissionChange={(action, permission, checked) => {
            setNewRolePermissions(prev => ({
              ...prev,
              [action]: {
                ...prev[action],
                [permission]: checked
              }
            }))
          }}
        />
        <Button onClick={handleCreateRole} className="mt-4">
          <PlusCircle className="mr-2 h-4 w-4" /> Create Role
        </Button>
      </div>

      <h2 className="text-xl mt-6 font-bold my-4">Existing Roles</h2>
      <Table className="border ">
        <TableHeader>
          <TableRow>
            <TableHead>Role Name</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {roles.map((role) => (
            <TableRow key={role._id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.name}</TableCell>
              <TableCell className="text-right flex">
                <Button variant="outline" size="icon" onClick={() => openEditDialog(role)} className="mr-2">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleDeleteRole(role._id)} className="mr-2">
                  <Trash className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleDuplicateRole(role)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-dvh overflow-auto" >
          <DialogHeader>
            <DialogTitle>Edit Role: {editingRole?.name}</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={editingRole?.name || ''}
            onChange={(e) => setEditingRole(prev => prev ? { ...prev, name: e.target.value } : null)}
            className="mb-2"
          />
          {editingRole && (
            <RolePermissionsTable 
              permissions={editingRole.permissions}
              onPermissionChange={(action, permission, checked) => {
                setEditingRole(prev => prev ? {
                  ...prev,
                  permissions: {
                    ...prev.permissions,
                    [action]: {
                      ...prev.permissions[action],
                      [permission]: checked
                    }
                  }
                } : null)
              }}
            />
          )}
          <div className="flex justify-end mt-4">
            <Button onClick={closeEditDialog} variant="outline" className="mr-2">
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button onClick={handleUpdateRole}>
              <Pencil className="mr-2 h-4 w-4" /> Update Role
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}