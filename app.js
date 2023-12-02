class ProductManager {
    //desarrolo de la clase constructora - array vacio y id autoincrementable
    constructor() {
        this.products = [];
        this.currentId = 1; // Inicializa el id autoincrementable
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        // Verificar si todos los campos están presentes
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('Todos los campos son obligatorios');
        }

        // Función para verificar si el código ya existe
        if (this.products.some(product => product.code === code)) {
            throw new Error('El código del producto ya existe');
        }

        const newProduct = {
            id: this.currentId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);

        if (!product) {
            console.error('Not found');
            return null;
        }

        return product;
    }
}

// TESTING
const productManager = new ProductManager();

console.log(productManager.getProducts()); // Debería mostrar []

productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25
});

console.log(productManager.getProducts()); // Debería mostrar el producto agregado

try {
    productManager.addProduct({ // Intento de agregar un producto con el mismo código
        title: "producto prueba",
        description: "Este es un producto prueba",
        price: 200,
        thumbnail: "Sin imagen",
        code: "abc123",
        stock: 25
    });
} catch (e) {
    console.error(e.message); // Debería lanzar un error debido al código repetido
}

console.log(productManager.getProductById(1)); // Debería mostrar el producto
console.log(productManager.getProductById(2)); // Debería mostrar 'Not found'
