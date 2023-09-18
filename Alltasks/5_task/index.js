'use strict'

//Разработайте функцию преобразования JSON в связный список.
// На входе функция должна получать JSON, содержащий список объектов,
// на выходе объект, представляющий из себя односвязный список.


//initial data
let Users = [
    {
    name: 'John',
    age: 30,
    },
    {
    name: 'Viktor',
    age: 29,
    },
    {
    name: 'Andrew',
    age: 28,
    },
    {
    name: 'Sasha',
    age: 34,
    },
    {
    name: 'Anna',
    age: 55,
    },
    {
    name: 'Noname',
    age: 19,
    }];




let list = getLinkedList(Users);

console.log('size: ' + list.size());
console.log('isEmpty: ' + list.isEmpty());

for(let i = 0; i < list.size(); i++){
    console.log(list.elementAt(i));
}



function getLinkedList(data){

    const list = new LinkedList(); // создаем новый список
    for(let i = 0; i < data.length; i++){
        list.push(data[i]); // заполняем список данными из json
    }
    return list; // возвращаем список

    function Node(element) {
        this.element = element; // данные
        this.next = null; // указатель на следующий узел
    }

    function LinkedList() {
        let length = 0;
        let head = null;

        this.size = function () {
            return length;
        }

        this.isEmpty = function () {
            return length === 0;
        }

        this.push = function (element) {
            let node = new Node(element)
            if (head === null) {
                head = node;
            } else {
                let currentNode = head;
                while (currentNode.next) {
                    currentNode = currentNode.next;
                }
                currentNode.next = node;
            }
            length++;
        }

        this.pop = function () {
            if(head === null) return false;
            let prevNode;
            let currentNode = head;

            while(currentNode.next){
                prevNode = currentNode;
                currentNode = currentNode.next;
            }
            currentNode = null;
            prevNode.next = null;

            length--;
        }

        this.shift = function (){
            if(head === null) return false;

            let newHead = head.next;
            head = null;
            head = newHead;
            length--;
        }

        this.unshift = function (element){
            let node = new Node(element)
            node.next = head;
            head = node;
            length++;
        }

        this.elementAt = function (index) {
            if(index >= length || index < 0) return undefined; // индекс выходит за пределы списка или отрицательный индекс
            let currentNode = head;
            let count = 0;
            while (count < index) { // начиная с головы, двигаемся к след. элементу index раз
                count++;
                currentNode = currentNode.next;
            }
            return currentNode.element
        }
    }
}

