let gifCreate = document.getElementsByClassName("btn_gif")[0]

let gifTxt = document.getElementsByClassName("gif_txt")[0]


console.log("gifCreate = " + gifCreate);

let statusBtn = gifCreate.getAttribute("status");

//
const changeStatus = (status = "") => {
    let options = ["init", "record", "stop", "upload"]
    if (status != "") 
    {   
        let txtBtn = ""
        let gifContent = ""

        if (status.toLowerCase() == "init") {
            txtBtn = "GRABAR" 
            status = options[1]    
            
            gifContent = `<h2>¿Nos das acceso a tu cámara?</h2>
                        <p>El acceso a tu camara será válido sólo
                        por el tiempo en el que estés creando el GIFO.</p>`
        }
        else if(status.toLowerCase() == "record") {
            txtBtn = "FINALIZAR"    
            status = options[2]     
        }
        else if(status.toLowerCase() == "stop") {
            txtBtn = "SUBIR GIFO"  
            status = options[3]  
        }
        
        
        gifCreate.setAttribute("status", status); 
        if (txtBtn != "")
            gifCreate.innerHTML = txtBtn;

        if (gifContent != "")
            gifTxt.innerHTML = gifContent
    }
}


gifCreate.onclick = () => {
    /* console.log("entra click") */
    statusBtn = gifCreate.getAttribute("status");
    changeStatus(statusBtn)
}

