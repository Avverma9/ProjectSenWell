const express=require("express")
const router=express.Router()
const userController=require("./userController")

router.post("/user",userController.createUser)
router.get("/get",userController.getData)
router.delete("/delete/:id",userController.deleteData)
router.put("/update/:id",userController.updateData)

module.exports=router