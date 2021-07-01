
const mongoose = require('mongoose');


const ambulatorios = require('../models/ambulatorio_model')


require('dotenv').config()



const getAll = async(req, res)=>{
    
    const Ambulatorios = await ambulatorios.find({}, { criadoPor: 0 })

    res.status(200).json(Ambulatorios)
         
}




const cadastrarAmbulatorio = async (req, res) => {

    const ambulatorio = new ambulatorios({
        _id: new mongoose.Types.ObjectId(),
        'nome': req.body.nome,
        'estado': req.body.estado,
        'cidade': req.body.cidade,
        'bairro': req.body.bairro,
        'logradouro': req.body.logradouro,
        'numero': req.body.numero,
        'horarioFuncionamento': req.body.horarioFuncionamento,
        'telefone': req.body.telefone,
        'especialidades': req.body.especialidades,
        'observacoes': req.body.observacoes,
        'criadoPor': req.body.criadoPor
    }
    )



    const verificacao = await ambulatorios.findOne({ nome: req.body.nome })
    if (verificacao) {


        return res.status(409).json("error: ambulatorio já cadastrado")


    } else {



        try {
            const novoAmbulatorio = await ambulatorio.save()
            res.status(201).json(novoAmbulatorio)


        } catch (err) {

            res.status(500).json({ message: err.message })

        }







    }



}



const buscarEspecialidade = async (req, res) => {






    try {


        const ambulatoriosEstado = await ambulatorios.find({ estado: req.body.estado })
        const cidade = req.body.cidade
        const especialidade = req.body.especialidade.toLowerCase()

        if (ambulatoriosEstado) {

            const ambulatoriosCidade = ambulatoriosEstado.filter(ambulatorio => ambulatorio.cidade == cidade)

            if (cidade) {


                const especialidadeFiltrada  = ambulatoriosCidade.filter(ambulatorios => ambulatorios.especialidadesspecialidades.includes(especialidade))
                  
                if( especialidadeFiltrada){
                    res.status(200).json(especialidadeFiltrada)


                } else { res.status(404).json({ message: 'nenhum ambulatorio encontrado'})}
              

            } else { res.status(404).json({ message: 'nenhum ambulatorio encontrado' }) }



        } else {

            res.status(404).json({ message: 'nenhum ambulatorio encontrado' })


        }






    } catch (err) {




        res.status(500).json(err)
    }









}

const ambulatoriosPorCriador = async (req, res) => {






    try {


        const ambulatorios = await ambulatorios.find({ criadoPor: req.body.criadoPor })
        

        if (ambulatorios) {


                res.status(200).json(ambulatorios)




        } else {

            res.status(401).json({ message: 'nenhum ambulatorio encontrado' })


        }






    } catch (err) {




        res.status(500).json(err)
    }









}


const deletarAmbulatorioPorId = async (req, res)=>{



    try {
        const ambulatorio = await ambulatorios.findById({_id: req.params.id})

                      
        if (ambulatorio == null) {
        return res.status(404).json({ message: 'ambulatorio não encontrado!'})
        }
              
        await ambulatorio.remove()
       
        res.json({ message: 'ambulatorio deletado com sucesso!'})
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }








}


const deletarAmbulatorio = async (req, res)=>{



    try {
        const ambulatorio = await ambulatorios.findOne({nome: req.body.nome})

                      
        if (ambulatorio == null) {
        return res.status(404).json({ message: 'ambulatorio não encontrado!'})
        }
              
        await ambulatorio.remove()
       
        res.json({ message: 'ambulatorio deletado com sucesso!'})
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }








}


const atualizarAmbulatorio = async ( req, res) =>{


         try{
           const ambulatorio = await ambulatorios.findOne({ nome: req.body.nome})

             if( ambulatorio){
                if( req.body.bairro != null){

                    ambulatorio.bairro = req.body.bairro
 
                 }


                if( req.body.lagradouro != null){

                   ambulatorio.lagradouro = req.body.lagradouro

                }

                if( req.body.numero != null){

                       ambulatorio.numero = req.body.numero


                }

                if ( req.body.horarioFuncionamento != null){

                    ambulatorio.horarioFuncionamento = req.body.horarioFuncionamento
                }


                if(  req.body.telefone != null ){



                    ambulatorio.telefone =  req.body.telefone
                }


                if (req.body.observacoes != null ){



                   ambulatorio.observacoes = req.body.observacoes

                }

                if (req.body.especialidades != null ){



                    ambulatorio.especialidades = req.body.especialidades


                }




                const ambulatorioAtualizado = await ambulatorio.save()
                res.status(200).json( {message: 'ambulatorio atualizado'})
    





             }else{


                res.status(404).json( {message: 'ambulatorio não encontrado'})



             }
               












         }catch(err){

            res.status(500).json( {message: err.message})


         }




























}






const atualizarAmbulatorioPorId = async ( req, res) =>{


    try{
      const ambulatorio = await ambulatorios.findById({ _id: req.params.id})

        if( ambulatorio){
           if( req.body.bairro != null){

               ambulatorio.bairro = req.body.bairro

            }


           if( req.body.lagradouro != null){

              ambulatorio.lagradouro = req.body.lagradouro

           }

           if( req.body.numero != null){

                  ambulatorio.numero = req.body.numero


           }

           if ( req.body.horarioFuncionamento != null){

               ambulatorio.horarioFuncionamento = req.body.horarioFuncionamento
           }


           if(  req.body.telefone != null ){



               ambulatorio.telefone =  req.body.telefone
           }


           if (req.body.observacoes != null ){



              ambulatorio.observacoes = req.body.observacoes

           }

           if (req.body.especialidades != null ){



               ambulatorio.especialidades = req.body.especialidades


           }




           const ambulatorioAtualizado = await ambulatorio.save()
           res.status(200).json( {message: 'ambulatorio atualizado'})






        }else{


           res.status(401).json( {message: 'ambulatorio não encontrado'})



        }
          












    }catch(err){

       res.status(500).json( {message: err.message})


    }




























}




















module.exports = {
    getAll,
    cadastrarAmbulatorio,
    buscarEspecialidade,
    deletarAmbulatorio,
    deletarAmbulatorioPorId,
    atualizarAmbulatorio, 
    atualizarAmbulatorioPorId,
    ambulatoriosPorCriador
    


}




