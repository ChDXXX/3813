export const permission = {
    member:["Home"],
    admin:["Home" ,"Notify"],
    super_admin:["Home" ,"Notify","Manage"]
}
export const rolePermission = () => {  
    filterRouter(router, roleRouter);   router.addRoutes(router); }
  