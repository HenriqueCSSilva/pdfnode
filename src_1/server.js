const express = require('express')
const ejs = require('ejs')
const path = require('path')
const pdf = require('html-pdf')
const app = express()
const passengers  = [
    {
        name: "Joyce",
        flighNumber: 7859,
        time: "18h00"
    },
    {
        name: "Brock",
        flighNumber: 7859,
        time: "18h00"
    },
    {
        name: "Eve",
        flighNumber: 7859,
        time: "18h00"
    },
];

//Isso é uma rota, primeiro entendimento de CallBack
app.get( '/' , (request,response) =>{
    const filePath = path.join(__dirname, "print.ejs" )
    ejs.renderFile(filePath,{passengers}, (err, html) =>{
        if(err){
            return response.send("Erro durante a aplicação")    
        }
        const options = {
            height:"11.25in",
            widht:"8.5in",
            header:{
                height:"20mm"
            },
            footer:{
                height:"20mm"
            }
        }
        pdf.create(html,options).toFile("report.pdf", (err, data) =>{
            if(err){
                return response.send("Erro ao gerar o PDF")
            }
        // envia para o navegador
        return response.send(html)
        })

    })
//return response.send(passengers)
}) 



// Fim rota
app.listen(3000)