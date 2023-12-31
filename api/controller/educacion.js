import { educacionModel } from "../model/educacion.js";
import { cvModel } from "../model/cv.js";
import { validationResult } from "express-validator";

export class educacionController{
    static async getAll(req,res){
        if(req.query.id){
            const errors = validationResult(req)
            if(!errors.isEmpty()) return res.status(400).send({status:400, message:errors.errors[0].msg})
    
            const result = await educacionModel.getId(req.query.id);
            return res.status(result.status).send(result)
        }

        const result = await educacionModel.getAll();
        res.status(result.status).send(result)
    }

    
    static async getCvId(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).send({status:400, message:errors.errors[0].msg})

        const {id} = req.query;
        const result = await educacionModel.getCvId(id);
        res.status(result.status).send(result)
    }

    static async postEducacion(req,res){
        //validar si hay errores
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).send({status:400, message:errors.errors[0].msg})
        //validar si el usuario que queremos agregar ya existe

        if(req.data.payload.rol == "usuario"){
            const dataValidate = await cvModel.validateCv(req.data.payload.idUsuario)

            if(req.data.payload.rol == "usuario" && dataValidate.message[0].accesoEditar == 0) return {status:400, message:"no tienes acceso a editar informacion de la CV"}
        }
        
        if(!req.body.idCv){
            if(req.data.payload.rol == "admin") return res.status(400).send({status:400, message:"la propiedad 'idCv' es obligatoria"})
            const dataValidate = await cvModel.validateCv(req.data.payload.idUsuario)
            req.body.idCv = dataValidate.message[0].id
        }
        req.body.fecha = new Date(req.body.fecha)
        console.log(req.body.fecha);

        const keys = Object.keys(req.body);
        const values = Object.values(req.body)
        const result = await educacionModel.postEducacion(keys, values);
        res.status(result.status).send(result)
    }

    static async putEducacion(req,res){
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).send({status:400, message:errors.errors[0].msg})
        //Validar si exite el usuario que queremos modificar
        
        if(req.data.payload.rol == "usuario"){
            const dataValidate = await cvModel.validateCv(req.data.payload.idUsuario)

            if(req.data.payload.rol == "usuario" && dataValidate.message[0].accesoEditar == 0) return {status:400, message:"no tienes acceso a editar informacion de la CVr"}
        }
        
        const {id} =  req.query;

        const result = await educacionModel.putEducacion(req.body, id);
        res.status(result.status).send(result)
    }
    static async deleteEducacion(req,res){

        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).send({status:400, message:errors.errors[0].msg})

        if(req.data.payload.rol == "usuario"){
            const dataValidate = await cvModel.validateCv(req.data.payload.idUsuario)

            if(req.data.payload.rol == "usuario" && dataValidate.message[0].accesoEditar == 0) return {status:400, message:"no tienes acceso a editar informacion de la CV"}
        }
        

        const {id} =  req.query;
        
        const result = await educacionModel.deleteEducacion(id);
        res.status(result.status).send(result)
    }
}



