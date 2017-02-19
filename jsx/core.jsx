
//replaceColorString("{color:4000001}", 255, 150, 50, "color", "#FF0000");
//replaceImageString("{image:5000001}", "raster", "C:/Users/Avenser/AppData/Roaming/Adobe/CEP/extensions/DragAndDrop/resources/jpg_example_1.jpg");

function replaceImageString(targetCode, imageType, src){
    var doc = app.activeDocument;
    if(!doc)
        return;
    for(var lIndex=0; lIndex< doc.layers.length; lIndex++){
        var cLayer = doc.layers[lIndex];
        for(var i=0; i< cLayer.textFrames.length; i++){
            var tFr = cLayer.textFrames[i];
            if(tFr.contents == targetCode){
                var x = tFr.left;
                var y = tFr.top;
                
                if(imageType == "raster"){
                    var rasterFile = File(src);
                    var newPlacedItem = doc.placedItems.add();
                    newPlacedItem.file = rasterFile;
                    newPlacedItem.position = Array( x, y );
                    newPlacedItem.embed();
                }
                if(imageType == "vector"){
                    var embedDoc = new File(src);
                    var placed = doc.groupItems.createFromFile( embedDoc );
                }
                
                tFr.remove();
                return;
            }
        }
    }
}



function replaceColorString(targetCode, r, g, b, text1, text2, offsetX, offsetY){
    var doc = app.activeDocument;
    if(!doc)
        return;
    for(var lIndex=0; lIndex< doc.layers.length; lIndex++){
        var cLayer = doc.layers[lIndex];
        for(var i=0; i< cLayer.textFrames.length; i++){
            var tFr = cLayer.textFrames[i];
            if(tFr.contents == targetCode){
				//alert(tFr.width)
                var x = tFr.left+tFr.width/2-offsetX;
                var y = tFr.top-tFr.height/2+offsetY;
                
                var group = doc.groupItems.add();                
                
                var r1, r2, r3, t1, t2;
                try{
                    r1 = addRect(y,x,100,36,        RGB(255, 255, 255), RGB(0, 0, 0), group);              
                    r2 = addRect(y,x,36,36,          RGB(255, 255, 255), RGB(0, 0, 0), group);              
                    r3 = addRect(y-2,x+2,32,32,  RGB(r, g, b),             null, group);
                    t1 = addTextFrame(doc, y-3,x+40,0,0,  text1, RGB(255, 255, 0), group);
                    t2 = addTextFrame(doc, y-19,x+40,0,0,  text2, RGB(255, 255, 0), group);
                }catch(e){
                     if(r1)r1.remove();
                     if(r2)r2.remove();
                     if(r3)r3.remove();
                     if(t1)t1.remove();
                     if(t2)t2.remove();
                }

                tFr.remove();
                return;
            }
        }
    }
}


function RGB(r, g, b){
    var c = new RGBColor;
    c.red= r;
    c.green = g;
    c.blue = b;
    return c;
}

function addRect(y,x,w,h,fillColor,strokeCollor, group){
    var rect = app.activeDocument.pathItems.rectangle(y,x,w,h);      
    if(fillColor)
        rect.fillColor = fillColor;
    if(strokeCollor)
        rect.strokeColor = strokeCollor;
    if(group)
        rect.moveToBeginning( group );
    return rect;
}

function addTextFrame(doc,y,x,w,h,content,color, group){
    var tf = doc.textFrames.add(); 
    tf.contents = content;
    tf.left = x;
    tf.top = y;
    if(color)
        tf.fillColor = color;
    if(group)
        tf.moveToBeginning( group );
    return tf;
}