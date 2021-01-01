class LinkedList {
    constructor(head = null) {
        this.head = head;
        this.tail = null;
        this.size = 0;
    }

    insert(data) {
        let node = new Node(data);
        this.size++;

        if (this.head == null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        return node;
    }

    insertAfter(reference, data) {
        if (reference == this.tail) {
            return this.insert(data);
        }

        let node = new Node(data);
        let next = reference.next;

        reference.next = node;
        node.next = next;
        this.size++;
        return node;
    }

    getAt(index) {
        if (this.head == null || index > this.size) {
            return null;
        }

        let node = this.head;
        for (let i = 0; i < index; i++) {
            node = node.next;
        }

        return node;
    }

    deleteAt(index) {
        if (index === 0) {
            let current = this.head;
            let next = this.head.next;
            this.head.next = null;
            this.head = next;
            this.size--;
            if (this.size === 0) {
                this.tail = null;
            }
            return current.data;
        }

        if (index === this.size - 1) {
            let current = this.tail;
            let previous = this.getAt(index - 1);
            previous.next = null;
            this.tail = previous;
            this.size--;
            if (this.size === 0) {
                this.tail = null;
            }
            return current.data;
        }

        let current = this.getAt(index);
        let previous = this.getAt(index - 1);

        if (current == null || previous == null) {
            return;
        }

        previous.next = current.next;
        current.next = null;
        this.size--;
        return current.data;
    }

    print() {
        let tail = this.head;
        while (tail != null) {
            console.log(tail.data);
            tail = tail.next;
        }
    }

    printLine() {
        let arr = []
        let tail = this.head;
        while (tail != null) {
            arr.push(tail.data);
            tail = tail.next;
        }
        console.log(arr.join(','));
    }
}

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

module.exports = LinkedList;