console.log("this is ready");

document.getElementById('json').addEventListener('click',()=>{
    parameterbox.style.display="none";
    document.getElementById('jsonbox').style.display="block"
})

let addparamcount=1;

function getstring(output)
{
let div=document.createElement('div');
div.innerHTML=output;
return div.firstElementChild;
}
let parameterbox=document.getElementById('parametersbox');
parameterbox.style.display="none";

let requestType=document.getElementById('customparam');

requestType.addEventListener('click',()=>{
    document.getElementById('jsonbox').style.display="none";
    parameterbox.style.display="block";

})
document.getElementById('add').addEventListener('click',()=>{
 let output=` <div class="form-row my-2">
 <label for="url" class="col-sm-2 col-form-label">Parameter ${addparamcount+1}</label>
 <div class="col-md-4">
 
   <input type="text" class="form-control" id="Parameterkey ${addparamcount+1}" placeholder="Parameter key ${addparamcount+1}">
 </div>
 <div class="col-md-4">
  
   <input type="text" class="form-control" id=Parametervalue ${addparamcount+1}" placeholder="Parameter value ${addparamcount+1}">
 </div>
 <button class="btn btn-primary delete" >-</button>
</div>`;

addparamcount++;
let addparam=document.getElementById('addparams');

let dom=getstring(output);
// console.log(dom);

addparam.appendChild(dom);

let deleteparam=document.getElementsByClassName('delete')
for(item of deleteparam){
    item.addEventListener('click',(e)=>{
        e.target.parentElement.remove();
    })
    
}


})


let addheadercount=1;

function getheader(output)
{
let div=document.createElement('div');
div.innerHTML=output;
return div.firstElementChild;
}
let headerbox=document.getElementById('headersbox');


document.getElementById('addheader').addEventListener('click',()=>{
 let output=` <div class="form-row my-2">
 <label for="url" class="col-sm-2 col-form-label">Header ${addheadercount+1}</label>
 <div class="col-md-4">
 
   <input type="text" class="form-control" id="headerkey ${addheadercount+1}" placeholder="key ${addheadercount+1}">
 </div>
 <div class="col-md-4">
  
   <input type="text" class="form-control" id=headervalue ${addheadercount+1}" placeholder="value ${addheadercount+1}">
 </div>
 <button class="btn btn-primary deleteheader" >-</button>
</div>`;

addheadercount++;
let addheadermany=document.getElementById('addheaderit');

let dom=getheader(output);
// console.log(dom);

addheadermany.appendChild(dom);

let deleteheader=document.getElementsByClassName('deleteheader')
for(item of deleteheader){
    item.addEventListener('click',(e)=>{
        e.target.parentElement.remove();
    })
    
}


})



let submit=document.getElementById('submit');
submit.addEventListener('click',()=>{
    document.getElementById('json-renderer').value="Please wait....";

    let url=document.getElementById('url').value;
    let request=document.querySelector("input[name=requestType]:checked").value;
    let content=document.querySelector('input[name="params"]').value;
    
    console.log(url,request,content)
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    if(request=='GET')
    {
       
        fetch(proxyurl+url)
        .then(data=>{
    // this convert into json facts 
    return data.json()    
    }).then(res=>{
    // console.log(res)

	$('#json-renderer').jsonViewer(res, {
    // collapsed:true,
    withQuotes:false,
    // withLinks:false,
    rootCollapsable:false

    });   
})
    }

    
  else{
    let json=document.getElementById('jsontext').value; 

    var data= JSON.parse(json)

    fetch(proxyurl+'https://alexander-ritik-task-manager.herokuapp.com/users/login', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    body:JSON.stringify(data)
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
	$('#json-renderer').jsonViewer(data, {
        // collapsed:true,
        withQuotes:false,
        // withLinks:false,
        rootCollapsable:false
    
        });  });
  }


})