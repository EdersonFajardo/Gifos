let gifCreate = document.getElementsByClassName("btn_gif")[0]

let gifTxt = document.getElementsByClassName("gif_txt")[0]

let recorder = null
console.log("gifCreate = " + gifCreate);

function getMediaRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
    }).then(async function(stream) {
        let video = document.getElementById("myRecord")
        video.srcObject = stream;
        video.play()

        recorder = RecordRTC(stream,{
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
            onGifRecordingStarted: function() {
                console.log('started')
            },
        });

        recorder.startRecording();
    });
}

function stopRecord() {
    if (recorder != null) {

        recorder.stopRecording(function() {
            let blob = recorder.getBlob();
            //invokeSaveAsDialog(blob);
            console.log ("blob = " + blob)
            let urlCreator = window.URL || window.webkitURL;
            let videoUrl = urlCreator.createObjectURL(blob);
            document.getElementById("myRecord").src = videoUrl;
            console.log ("video = " + videoUrl)
            
            let img = `<img src="${videoUrl}">`
            
            gifTxt.innerHTML = img
        });
        
    }   
}


let statusBtn = gifCreate.getAttribute("status");

// 
const changeStatus = (status = "") => {
    let options = ["init", "record", "stop", "upload"]
    if (status != "") 
    {   
        let stepContent = "0" 
        let txtBtn = ""
        let gifContent = ""

        if (status.toLowerCase() == "init") {
            txtBtn = "GRABAR" 
            status = options[1]    
            
            gifContent = `<h2>¿Nos das acceso a tu cámara?</h2>
                        <p>El acceso a tu camara será válido sólo <br>
                        por el tiempo en el que estés creando el GIFO.</p>`

            stepContent = "1"
        }
        else if(status.toLowerCase() == "record") {
            txtBtn = "FINALIZAR"    
            status = options[2]    
            
            gifContent = `<video src="" id="myRecord"></video>`

            stepContent = "2"
            
            getMediaRecord();
            
        }
        else if(status.toLowerCase() == "stop") {
            txtBtn = "SUBIR GIFO"  
            status = options[3]  

            stopRecord();
        }
        
        
        gifCreate.setAttribute("status", status); 
        if (txtBtn != "")
            gifCreate.innerHTML = txtBtn;

        if (gifContent != "")
            gifTxt.innerHTML = gifContent


        let steps = document.getElementsByClassName("step");
        for (var i = 0; i<steps.length; i++) {
            steps[i].classList.remove("step_active");
            //prueba[i].classList.add("step_active")
        }

        if (stepContent != "0"){
            document.querySelector(`.step[numStep='${stepContent}']`).classList.add("step_active");
            //console.log(document.querySelector(`.step[numStep='${stepContent}']`))
        }  

        
    }
}


gifCreate.onclick = () => {
    /* console.log("entra click") */
    statusBtn = gifCreate.getAttribute("status");
    changeStatus(statusBtn)
}



