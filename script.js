const input = document.querySelector("input");
input.value = '';
const fileName = document.querySelector('.file-name');
const copyButton = document.querySelector('.copy-button');
const textAreas = document.querySelectorAll('textarea');
const downloadBtn = document.querySelector('button');
const reader = new FileReader();
textAreas.forEach(el=>{
    el.value='';
})
function jsonHandler(json) {
    If(input.files[0]){
       fileName.classList.add('active')
       fileName.textContent = input.files[0].name;
    }
    textAreas[0].value=json;
    textAreas[1].value=JSON.stringify(JSON.parse(json),null,2);
    const data = JSON.stringify(JSON.parse(json), null, 2);
    downloadBtn.classList.add('active');
    copyButton.classList.add('active')
    downloadBtn.onclick = function(){
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        if(input.files[0])
            element.setAttribute('download',`${input.files[0].name.replace('.json','')}_formatted.json`);
        else
        element.setAttribute('download',`untitled.json`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };
}
input.onchange = () => {

    reader.readAsText(input.files[0]);

    reader.onload = () => {
        jsonHandler(reader.result);
    };

    reader.onerror = (err) => {
        alert(err);
    };

};

textAreas[0].oninput = function() {
    try{
    textAreas[1].value=JSON.stringify(JSON.parse(this.value.trim()),null,2);
    jsonHandler(this.value.trim());
    copyButton.style.display='initial';
}
    catch(err){
        if(this.value === '') textAreas[1].value=''
        else textAreas[1].value=err;
    }
}
copyButton.onclick = ()=>{
    navigator.clipboard.writeText(textAreas[1].value)
}
