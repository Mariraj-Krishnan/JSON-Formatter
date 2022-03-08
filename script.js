const input = document.querySelector("input");
input.value = '';

const downloadBtn = document.querySelector('button');
const reader = new FileReader();

input.onchange = () => {

    reader.readAsText(input.files[0]);

    reader.onload = () => {
        const data = JSON.stringify(JSON.parse(reader.result), null, 2);
        downloadBtn.classList.add('active');
        downloadBtn.onclick = function(){
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
            element.setAttribute('download',`${input.files[0].name.replace('.json','')}_formatted.json`);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        };
    };

    reader.onerror = (err) => {
        alert(err);
    };

};
