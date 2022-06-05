const express = require('express')
const ejs = require('ejs')
const path = require('path')
//const pdf = require('html-pdf')
const puppeteer = require('puppeteer')
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
app.get('/pdf', async(request,response) =>{
    //const browser = await puppeteer.launch( {headless: true})
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto('http://localhost:3000/', {
        waitUntil:'networkidle0'
    } )
    const pdf = await page.pdf({
        printBackground: true,
        format:"A4",
        margin:{
            top:"20px",
            bottom:"40px",
            left:"20px",
            right:"20px"
        }
    })
    await browser.close()
    response.contentType("application/pdf")
    return response.send(pdf)
})


app.get( '/' , (request,response) =>{
    const filePath = path.join(__dirname, "print.ejs" )
    ejs.renderFile(filePath,{passengers}, (err, html) =>{
        if(err){
            return response.send("Erro durante a aplicação")    
        }

        // envia para o navegador
        return response.send(html)
        })
    })
//return response.send(passengers) 


// Fim rota
app.listen(3000)