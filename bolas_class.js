const palco = document.getElementById("palco")
const numeroObjetos = document.getElementById("num_objetos")
const txtBolas = document.querySelector("#txt_qtde")
const botaoAdicionar = document.querySelector("#btn_add")
const botaoRemover = document.querySelector("#btn_remover")

let larguraPalco = palco.offsetWidth
let alturaPalco = palco.offsetHeight
let bolas = []
let numBola = 0

class Bola{
    constructor(arrayBolas,palco){
        this.tam=Math.floor(Math.random()*15)+10
        this.r=Math.floor(Math.random()*255)
        this.g=Math.floor(Math.random()*255)
        this.b=Math.floor(Math.random()*255)
        this.px=Math.floor(Math.random()*(larguraPalco-this.tam))
        this.py=Math.floor(Math.random()*(alturaPalco-this.tam))
        this.velx=Math.floor(Math.random()*2)+0.5
        this.vely=Math.floor(Math.random()*2)+0.5
        this.dirx=(Math.random()*10)>5?1:-1
        this.diry=(Math.random()*10)>5?1:-1
        this.palco = palco
        this.arrayBolas = arrayBolas
        this.id = Date.now()+"_"+Math.floor(Math.random()*100000000000)
        this.desenhar()
        this.controle=setInterval(this.controlar,10)
        this.eu = document.getElementById(this.id)
        numBola++
           numeroObjetos.innerHTML = numBola
       }
       minhaPos=()=>{
          return this.arrayBolas.indexOf(this)
       }
       removerBolas=()=>{
          clearInterval(this.controle)
          bolas = bolas.filter((b)=>{
            if(b.id!=this.id){
                return b
            }
          })
          this.eu.remove()
          numBola--
          numeroObjetos.innerHTML = numBola
       }
       desenhar=()=>{
          const Div = document.createElement("div")
          Div.setAttribute("id",this.id)
          Div.setAttribute("classe","bola")
          Div.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb${this.r},${this.g},${this.b}`)
          this.palco.appendChild(Div)
       } 
       controle_bordas=()=>{
        if(this.px+this.tam >= larguraPalco){
         this.dirx = -1
        }else if(this.px <= 0){
         this.dirx=1
        }
        if(this.py+this.tam >= larguraPalco){
         this.diry = -1
        }else if(this.py <= 0){
         this.diry=1
        }
       }
       controlar=()=>{
        this.controle_bordas()
        this.px += this.dirx*this.velx
        this.py += this.diry*this.vely
        this.eu.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb${this.r},${this.g},${this.b}`)
        if((this.px > larguraPalco) || (this.py > alturaPalco)){
         this.removerBolas()
        }
       }
      }

window.addEventListener("resize",(evt)=>{
    larguraPalco = palco.offsetWidth
    alturaPalco = palco.offsetHeight

  
})
botaoAdicionar.addEventListener("click",(evt)=>{
  const quantidadeBola = txtBolas.value
  for(let i = 0; i < quantidadeBola; i++){
  bolas.push(new Bola(bolas, palco))
}
})
botaoRemover.addEventListener("click",(evt)=>{
   bolas.map((b)=>{
  b.removerBolas()
   })
})