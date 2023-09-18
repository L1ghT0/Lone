


//Задача на классы и наследование: создайте базовый класс Shape (фигура),
// который имеет методы для расчета площади и периметра. Затем создайте подклассы,
// представляющие различные фигуры, такие как прямоугольник, круг и треугольник.
// Реализуйте методы расчета площади и периметра для каждой фигуры.


class Shape{
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    calculatePerimeter(){
        return (this.a * 2) + (this.b * 2);
    }
    calculateArea(){
        return this.a * this.b;
    }
}

class Triangle extends Shape{
    constructor(a, b, c, h){ // a,b,c - стороны треугольника, h - высота
        super(a, b);
        this.c = c;
        this.h = h;
    }
    calculateArea(){
        return (this.a * this.h)/2;
    }
    calculatePerimeter(){
        return this.a + this.b + this.c;
    }
}

class Circle extends Shape{
    pi = 3.1415;
    constructor(r){ // r - радиус
        super();
        this.r = r;
    }
    calculatePerimeter(){
        return Math.round((2 * this.pi * this.r) * 100) / 100; // округлим до 2 знаков
    }
    calculateArea(){
        return Math.round((this.pi * (this.r * this.r)) * 100) / 100; // округлим до 2 знаков
    }
}


class Rectangle extends Shape{
    constructor(a, b){
        super(a, b);
    }
}






let circle = new Circle(10);
console.log("Circle: ")
console.log(circle.calculateArea())
console.log(circle.calculatePerimeter())


let rectangle = new Rectangle(10, 20);
console.log("Rectangle: ")
console.log(rectangle.calculateArea())
console.log(rectangle.calculatePerimeter())


// let triangle = new Triangle(3, 4, 5, 4);
// console.log("Triangle: ")
// console.log(triangle.calculateArea())
// console.log(triangle.calculatePerimeter())