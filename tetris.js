// ************************************
// *     EJERCICIO 1                   *
// ************************************

// ============== Point =======================

function Point (x, y) {
	this.x = x;
	this.y = y;
}

// ============== Rectangle ====================
function Rectangle() {}

//recibe los 2 puntos del bloque como parametro
Rectangle.prototype.init = function(p1,p2) {
	this.px = p1.x;
	this.py = p1.y;
	this.width = p2.x - p1.x;
	this.height = p2.y - p1.y;
	this.lineWidth= 1;
	this.color = 'black';
}

Rectangle.prototype.draw = function() {

	// TU CÓDIGO AQUÍ:
	// pinta un rectángulo del color actual en pantalla en la posición px,py, con
	// la anchura y altura actual y una línea de anchura=lineWidth. Ten en cuenta que
	// en este ejemplo la variable ctx es global y que guarda el contexto (context)
	// para pintar en el canvas.

	//comenzar camino
	ctx.beginPath();

	//nos movemos al punto P1(esquina superior derecha), donde se empieza a pintar el rectangulo
	ctx.moveTo(this.px,this.py);

	//nos colocamos en el punto P1(p1.x,p1.y) y dibujamos un rectangulo con la anchura this.width y
	//la altura this.heigth.
	ctx.lineTo(this.px+this.width,this.py);
	ctx.lineTo(this.px+this.width,this.py+this.height);
	ctx.lineTo(this.px,this.py+this.height);

	//cerrar camino
	ctx.closePath();

	//la anchura de la linea=this.lineWidth
	ctx.lineWidth = this.lineWidth;

	//rellenar el rectangulo del color this.color
	ctx.fillStyle = this.color;
	ctx.fill();

	//finalizamos con stroke haciendo el contorno del rectangulo
	ctx.stroke();
}


Rectangle.prototype.setLineWidth = function(width) { this.lineWidth=width}
Rectangle.prototype.setFill = function(color) { this.color = color}

// ============== Block ===============================

function Block (pos, color) {


	// TU CÓDIGO AQUÍ: este es el constructor de la clase Block. Recibe dos parámetros, pos y color.
	// Pos = posición de la celda, por ejemplo, (9,19).
	// color = color que hay que emplear para pintar el bloque.
	// Internamente este método crea dos puntos (empleando las coordenadas del pixel)
	// y llama al método init de la clase Rectangle, pasándole como parámetro,
	// estos dos puntos.
	// Sería interesante que emplearas las constantes Block.BLOCK_SIZE y Block.OUTLINE_WIDTH,
	// para establecer la anchura del bloque y la anchura de la línea.

	//coordenadas (x,y) de la celda. Por ejemplo (1,1)
	this.x = pos.x;
	this.y = pos.y;

	//Se crean internamente 2 puntos empleando las coordenadas del pixel
	//Imaginemos que tenemos la coordenadas pos.x=1, pos.y=1.
	//ese punto1 se convertira en (1*30,1*30)=(30,30) y el rectangulo se empezara a pintar en ese punto.
	//para completar el bloque cuadrado necesitamos que acabe en (60,60). Para ello le sumamos 30 pixeles
	//tanto en altura como en anchura y asi queda (60,60).

	var nuevaposx = pos.x*Block.BLOCK_SIZE;
	var nuevaposy = pos.y*Block.BLOCK_SIZE;

	var punto1 = new Point(nuevaposx,nuevaposy);
	var punto2 = new Point(punto1.x + Block.BLOCK_SIZE, punto1.y + Block.BLOCK_SIZE);

	//se le llama al metodo init de la clase Rectangle y le pasamos los 2 puntos definidos anteriormente
	//el (30,30) y el (60,60).
	this.init(punto1,punto2);
	this.setFill(color);
	this.setLineWidth(Block.OUTLINE_WIDTH);


}

//una casilla es un cuadrado de 30 pixels de ancho. Cada bloque ocupa una única casilla
Block.BLOCK_SIZE = 30;
//anchura de la linea que rodea al bloque
Block.OUTLINE_WIDTH = 2;


// TU CÓDIGO: emplea el patrón de herencia (Block es un Rectangle)
//Block hereda de la clase Rectangle
Block.prototype = new Rectangle();
//el constructor de bloque es bloque
Block.prototype.constructor = Block;


// ************************************
// *      EJERCICIO 2                  *
// ************************************

// ============== Shape ===================================

function Shape() {}


Shape.prototype.init = function(coords, color) {

	// TU CÓDIGO AQUÍ: método de inicialización de una Pieza del tablero
	// Toma como parámetros: coords, un array de posiciones de los bloques
	// que forman la Pieza y color, un string que indica el color de los bloques
	// Post-condición: para cada coordenada, crea un bloque de ese color y lo guarda en un bloque-array.


	this.bloquesArray = [];
	coords.forEach(coordenada => this.bloquesArray.push(new Block(coordenada,color)));


	console.log(this.bloquesArray);

};

Shape.prototype.draw = function() {

	// TU CÓDIGO AQUÍ: método que debe pintar en pantalla todos los bloques
	// que forman la Pieza
	this.bloquesArray.forEach( bloque => bloque.draw());

};

// ============= I_Shape ================================
function I_Shape(center) {
     var coords = [new Point(center.x - 2, center.y),
               new Point(center.x - 1, center.y),
               new Point(center.x , center.y),
               new Point(center.x + 1, center.y)];
    
     Shape.prototype.init.call(this, coords, "blue");   

}

// TU CÓDIGO AQUÍ: La clase I_Shape hereda de la clase Shape
I_Shape.prototype = new Shape();
I_Shape.prototype.constructor = I_Shape;


// =============== J_Shape =============================
function J_Shape(center) {

	// TU CÓDIGO AQUÍ: Para programar J_Shape toma como ejemplo el código de la clase I_Shape
	var coords = [new Point(center.x - 1, center.y),
		new Point(center.x, center.y),
		new Point(center.x + 1, center.y),
		new Point(center.x + 1, center.y + 1)];

	Shape.prototype.init.call(this, coords, "orange");

}

// TU CÓDIGO AQUÍ: La clase J_Shape hereda de la clase Shape
J_Shape.prototype = new Shape();
J_Shape.prototype.constructor = J_Shape;

// ============ L Shape ===========================
function L_Shape(center) {

	// TU CÓDIGO AQUÍ: Para programar L_Shape toma como ejemplo el código de la clase I_Shape
	var coords = [new Point(center.x - 1, center.y),
		new Point(center.x, center.y),
		new Point(center.x + 1, center.y),
		new Point(center.x - 1, center.y + 1)];

	Shape.prototype.init.call(this, coords, "cyan");
}

// TU CÓDIGO AQUÍ: La clase L_Shape hereda de la clase Shape
L_Shape.prototype = new Shape();
L_Shape.prototype.constructor = L_Shape;


// ============ O Shape ===========================
function O_Shape(center) {

	// TU CÓDIGO AQUÍ: Para programar O_Shape toma como ejemplo el código de la clase I_Shape
	var coords = [new Point(center.x - 1, center.y),
		new Point(center.x - 1, center.y + 1),
		new Point(center.x, center.y),
		new Point(center.x, center.y + 1)];

	Shape.prototype.init.call(this, coords, "red");


}
        
// TU CÓDIGO AQUÍ: La clase O_Shape hereda de la clase Shape
O_Shape.prototype = new Shape();
O_Shape.prototype.constructor = O_Shape;

// ============ S Shape ===========================
function S_Shape(center) {

	// TU CÓDIGO AQUÍ: Para programar S_Shape toma como ejemplo el código de la clase I_Shape
	var coords = [new Point(center.x - 1, center.y + 1),
		new Point(center.x, center.y + 1),
		new Point(center.x, center.y),
		new Point(center.x + 1, center.y)];

	Shape.prototype.init.call(this, coords, "green");

}

// TU CÓDIGO AQUÍ: La clase S_Shape hereda de la clase Shape
S_Shape.prototype = new Shape();
S_Shape.prototype.constructor = S_Shape;

// ============ T Shape ===========================
function T_Shape(center) {

	// TU CÓDIGO AQUÍ: : Para programar T_Shape toma como ejemplo el código de la clase I_Shape
	var coords = [new Point(center.x - 1, center.y),
		new Point(center.x, center.y + 1),
		new Point(center.x, center.y),
		new Point(center.x + 1, center.y)];

	Shape.prototype.init.call(this, coords, "yellow");

}

// TU CÓDIGO AQUÍ: La clase T_Shape hereda de la clase Shape
T_Shape.prototype = new Shape();
T_Shape.prototype.constructor = T_Shape;


// ============ Z Shape ===========================
function Z_Shape(center) {

	// TU CÓDIGO AQUÍ: : Para programar Z_Shape toma como ejemplo el código de la clase I_Shape
	var coords = [new Point(center.x - 1, center.y),
		new Point(center.x, center.y),
		new Point(center.x, center.y + 1),
		new Point(center.x + 1, center.y + 1)];

	Shape.prototype.init.call(this, coords, "magenta");
}

// TU CÓDIGO AQUÍ: La clase Z_Shape hereda de la clase Shape
Z_Shape.prototype = new Shape();
Z_Shape.prototype.constructor = Z_Shape;


