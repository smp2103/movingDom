var elementNum = 0
var currentElement = document;
var currentTarget = document;
var resizable = false
var reSizeOption 
var type
var zIndex
var body = document.getElementById('body')
var createButton = document.getElementById('createButton')

createButton.addEventListener('click',function(){
    new Element()
})

function numToPx(num){
    return num + "px"
}
function pxToNum(str){
    return Number(str.split("px")[0])
}

var reset = function(element) {
    console.log("reset")
    element.removeEventListener('mousedown',onMouseMove)
    element.removeEventListener('mousemove',watch)
}

function resizeElement(element,option) {

    let {dx,dy,startWidth,startHeight,top,left,topResize,leftResize,widthResize,heightResize,wm,hm} = option

    if(topResize){
        element.style.top = numToPx(top + dy)
    }
    if(leftResize){
        element.style.left = numToPx(left + dx)
    }
    if(widthResize && !wm){
        element.style.width = numToPx(startWidth + dx)
    }
    if(heightResize && !hm){
        element.style.height = numToPx(startHeight + dy)
    }
    if(widthResize && wm){
        element.style.width = numToPx(startWidth - dx)
    }
    if(heightResize && hm){
        element.style.height = numToPx(startHeight - dy)
    }
}


var reSize = function(e) {
    
    let {startX,startY} = reSizeOption
    let option ={
        ...reSizeOption,
        topResize: false,
        leftResize : false,
        widthResize : false,
        heightResize : false,
        wm : true,
        hm : false,
        dx : e.clientX - startX,
        dy : e.clientY - startY
    }

    if(type === "nw"){
        body.style.cursor = "nw-resize"

        option.topResize = true
        option.leftResize = true 
        option.widthResize = true 
        option.heightResize = true 
        option.wm = true 
        option.hm = true 
        
        resizeElement(currentElement,option)
    }
    else if(type === "ne"){
        body.style.cursor = "ne-resize"

        option.topResize = true
        option.leftResize = false
        option.widthResize = true 
        option.heightResize = true 
        option.wm = false
        option.hm = true 


        resizeElement(currentElement,option)
    }
    else if(type === "sw"){
        body.style.cursor = "sw-resize"

        option.topResize = false
        option.leftResize = true 
        option.widthResize = true 
        option.heightResize = true 
        option.wm = true 
        option.hm = false

        resizeElement(currentElement,option)
    }
    else if(type === "se"){
        body.style.cursor = "se-resize"

        option.topResize = false
        option.leftResize = false 
        option.widthResize = true 
        option.heightResize = true 
        option.wm = false
        option.hm = false

        resizeElement(currentElement,option)

    }
    else if(type === "e"){ 
        body.style.cursor = "e-resize"

        option.topResize = false
        option.leftResize = false 
        option.widthResize = true 
        option.heightResize = false 
        option.wm = false 
        option.hm = false


        resizeElement(currentElement,option)

    }
    else if(type === "s"){ 
        body.style.cursor = "s-resize"

        option.topResize = false
        option.leftResize = false 
        option.widthResize = false 
        option.heightResize = true 
        option.wm = false
        option.hm = false

        resizeElement(currentElement,option)
    }
    else if(type === "w"){ 
        body.style.cursor = "w-resize"

        option.topResize = false
        option.leftResize = true
        option.widthResize = true 
        option.heightResize = false 
        option.wm = true 
        option.hm = false 

        resizeElement(currentElement,option)

    }
    else if(type === "n"){ 
        body.style.cursor = "n-resize"

        option.topResize = true
        option.leftResize = false 
        option.widthResize = false 
        option.heightResize = true 
        option.wm = false 
        option.hm = true 

        resizeElement(currentElement,option)
    }
}

function settingForResize(e){
    let rect = currentElement.getBoundingClientRect()
    currentElement.removeEventListener('mousedown',onMouseMove)
    currentElement.removeEventListener('mousemove',watch)

    if(type === "nw"){
        let startX = rect.x
        let option = {
            rect:rect,
            startX: startX,
            startY: rect.y,
            startWidth: currentElement.offsetWidth,
            startHeight : currentElement.offsetHeight,
            top:rect.top,
            left: rect.left
        }
        reSizeOption = option
        currentElement.addEventListener('mousemove',reSize)
    }
    else if(type === "ne"){
        let startX = rect.right
        let option = {
            rect:rect,
            startX: startX,
            startY: rect.y,
            startWidth: currentElement.offsetWidth,
            startHeight : currentElement.offsetHeight,
            top:rect.top,
            left: rect.left
        }
        reSizeOption = option
        currentElement.addEventListener('mousemove',reSize)
    }
    else if(type === "sw"){
        let startX = rect.x
        let option = {
            rect:rect,
            startX: startX,
            startY: rect.bottom,
            startWidth: currentElement.offsetWidth,
            startHeight : currentElement.offsetHeight,
            top:rect.top,
            left: rect.left
        }
        reSizeOption = option
        currentElement.addEventListener('mousemove',reSize)
    }
    else if(type === "se"){
        let startX = rect.right
        let option = {
            rect:rect,
            startX: startX,
            startY: rect.bottom,
            startWidth: currentElement.offsetWidth,
            startHeight : currentElement.offsetHeight,
            top:rect.top,
            left: rect.left
        }
        reSizeOption = option
        currentElement.addEventListener('mousemove',reSize)
    }
    else if(type === "e"){ // 오른쪽 모서리
        let startX = rect.right
        let option = {
            rect:rect,
            startX: startX,
            startY: rect.y,
            startWidth: currentElement.offsetWidth,
            startHeight : currentElement.offsetHeight,
            top:rect.top,
            left: rect.left
        }
        reSizeOption = option
    }
    else if(type === "s"){ // 아래쪽 모서리
        let startX = rect.right
        let option = {
            rect:rect,
            startX: startX,
            startY: rect.bottom,
            startWidth: currentElement.offsetWidth,
            startHeight : currentElement.offsetHeight,
            top:rect.top,
            left: rect.left
        }
        reSizeOption = option
    }
    else if(type === "w"){ // 왼쪽 모서리
        let startX = rect.x
        let option = {
            rect:rect,
            startX: startX,
            startY: rect.y,
            startWidth: currentElement.offsetWidth,
            startHeight : currentElement.offsetHeight,
            top:rect.top,
            left: rect.left
        }
        reSizeOption = option
    }
    else if(type === "n"){ // 위쪽 모서리
        let startX = rect.x
        let option = {
            rect:rect,
            startX: startX,
            startY: rect.y,
            startWidth: currentElement.offsetWidth,
            startHeight : currentElement.offsetHeight,
            top:rect.top,
            left: rect.left
        }
        reSizeOption = option
        currentElement.addEventListener('mousemove',reSize)
    }
    
    body.addEventListener('mousemove',reSize)
    body.addEventListener('mouseup',function(){
        body.removeEventListener('mousemove',reSize)
        currentElement.removeEventListener('mousemove',reSize)
        currentElement.addEventListener('mousemove',watch)
        body.style.cursor = "default"
        currentElement.style.cursor = "default"
    })
}

var watch = function(e){
    console.log("watch")

    let rect = currentElement.getBoundingClientRect()
    let positionX = e.clientX - rect.left;
    let positionY = e.clientY - rect.top;

    currentElement.addEventListener('mousedown',settingForResize,true)
    currentElement.addEventListener('mouseup',function(e){
    currentElement.removeEventListener('mousedown',settingForResize)
    currentElement.addEventListener('mousemove',watch)
    })


    if(positionX >= -5 && positionX <=5 && positionY >= -5 && positionY <=5 ){
        currentElement.style.cursor = "nw-resize"
        type = "nw"
    }
    else if(positionX >= currentElement.offsetWidth - 5 && positionX <= currentElement.offsetWidth +5 && positionY >= -5 && positionY <=5 ){
        currentElement.style.cursor = "ne-resize"
        type = "ne"
    }
    else if(positionX >= -5 && positionX <=5 && positionY >= currentElement.offsetHeight -5 && positionY <= currentElement.offsetHeight +5){
        currentElement.style.cursor = "sw-resize"
        type = "sw"
    }
    else if(positionY >= currentElement.offsetHeight -5 && positionY <= currentElement.offsetHeight +5 && positionX >= currentElement.offsetWidth - 5 && positionX <= currentElement.offsetWidth +5){
        currentElement.style.cursor = "se-resize"
        type = "se"
    }
    else if(positionX >= currentElement.offsetWidth - 5 && positionX <= currentElement.offsetWidth +5){
        type = "e"
        currentElement.style.cursor = "e-resize"      
    }
    else if(positionY >= currentElement.offsetHeight -5 && positionY <= currentElement.offsetHeight +5){
        currentElement.style.cursor = "s-resize"
        type = "s"
    }
    else if(positionX >= -5 && positionX <=5){
        currentElement.style.cursor = "w-resize"
        type = "w"
    }
    else if(positionY >= -5 && positionY <=5){
        currentElement.style.cursor = "n-resize"
        type = "n"
        
    }else{
        type= "c"
        currentElement.removeEventListener('mousedown',settingForResize,true)
        currentElement.addEventListener('mousedown',onMouseMove)
        currentElement.style.cursor = "default"
    }

}


var onMouseMove = function (e) {

    currentElement = e.target.parentNode
    let rect = currentElement.getBoundingClientRect()
    let positionX = e.clientX - rect.left;
    let positionY = e.clientY - rect.top;
    if(!zIndex){
        zIndex = 99
    }
    
    currentElement.style.position = "absolute"
    currentElement.style.zIndex = `${zIndex + 1}`
    zIndex++

    function moveAt(pageX,pageY) {
        currentElement.style.left = pageX - positionX + 'px'
        currentElement.style.top = pageY - positionY + 'px'
    }

    function move(e){
        moveAt(e.pageX,e.pageY)
    }

    body.addEventListener('mousemove',move)
    body.addEventListener('mouseup',function(){
        body.removeEventListener('mousemove',move)
    })
    
}


class Element{
    constructor(){
        elementNum+=1
        const wrapper = document.createElement("span")
        const element = document.createElement("div")
        const mover = document.createElement("div")
        this.mover = mover
        mover.id = `mover${elementNum}`
        wrapper.id = `wrapper${elementNum}`
        mover.style.width = "100%"
        mover.style.height = "20%"
        mover.style.backgroundColor = "skyblue"
        
        wrapper.style.display = "inline-block"
        this.wrapper = wrapper 
        this.element = element
        this.backgroundColor = "skyblue"

        this.styles = {
            width: 200,
            height:200,
            backgroundColor : this.backgroundColor,
            draggable : true
            
        }

        this.isReSizing = false
        element.id = `browser${elementNum}`
        mover.style.border = this.styles.border
        wrapper.style.width = this.styles.width + "px"
        wrapper.style.height = this.styles.height + "px"
        wrapper.style.postiion = "absolute"
        wrapper.style.border = "1px solid black"
        element.style.backgroundColor = this.styles.backgroundColor
        element.style.width = "100%"
        element.style.height = "80%"
        element.draggable = true
        wrapper.style.zIndex = "99"
        wrapper.style.minWidth = "20px"
        wrapper.style.minHeight = "20px"
        
        document.getElementById("body").appendChild(this.wrapper)
        document.getElementById(wrapper.id).appendChild(this.mover)
        document.getElementById(wrapper.id).appendChild(this.element)
        
        this.element.ondragstart = function(){
            return false
        }


        
        // 창 이동 /////////////////////////////////////////////////////////////////
        this.wrapper.addEventListener('mousedown',onMouseMove)
        this.wrapper.addEventListener('mouseup', function(e){
            e.target.removeEventListener('mousedown',onMouseMove)
        })
        ///////////////////////////////////////////////////////////////////////////////////
        

        
        //// 현재 창 ///////////////////////////////////////////////////////////////////////
        this.wrapper.addEventListener('mousedown',function(e){
            currentElement = this
            currentTarget = e.target
            currentElement.addEventListener('mousemove',watch)
        })

        this.element.addEventListener('mousedown',function(e){
            currentTarget = this
            currentElement = this.parentNode
            currentElement.style.zIndex = `${zIndex + 1}`
            zIndex ++
            e.stopPropagation()
        })

        this.element.addEventListener('mouseup',function(e){

            currentElement.addEventListener('mousemove',watch)
            
        })
    }
}





