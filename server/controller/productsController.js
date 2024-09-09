import Products from "../models/productsSchema.js";
// import jwt from 'jsonwebtoken';

class ProductsController {
  // Obtener todos los Productos
  async handleGetAllItems(req, res) {
    try {
      const productss = await Products.find()
      res.status(200).json(productss);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los Productos", error: error.message });
    }
  }

  // Obtener un producto por ID
  async handleGetItem(req, res) {
    try {
      const { id } = req.params;
      const products = await Products.findById(id)
      if (!products) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el producto", error: error.message });
    }
  }

  // Crear un nuevo producto
  async handleCreateItem(req, res) {
    try {
      const { name, description, price, img, points_required, stock, available, approved} = req.body;

      // Verificar si el producto o el correo ya existen
      const existingProducts = await Products.findOne({name:name});
      if (existingProducts) {
        return res.status(400).json({ message: "El producto ya existen." });
      }

      const newProducts = new Products({name, description, price, img, points_required, stock, available, approved});

      // Guardar el nuevo producto en la base de datos
      const savedProducts = await newProducts.save();

      res.status(201).json({ message: "Producto creado exitosamente", product: savedProducts});
    } catch (error) {
      res.status(500).json({ message: "Error al registrar el producto", error: error.message });
    }
  }

  // Eliminar un producto por ID
  async handleDeleteItem(req, res) {
    try {
      const { id } = req.params;
      const deletedProducts = await Products.findByIdAndDelete(id);
      if (!deletedProducts) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }
      res.status(200).json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el producto", error: error.message });
    }
  }

  // Actualizar un producto por ID
  async handleUpdateItem(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, img, points_required, stock, available, approved} = req.body;

      // Buscar y actualizar el producto
      const updatedProducts = await Products.findById(id);
      if (!updatedProducts) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      // Actualizar los campos
      if (name) updatedProducts.name = name;
      if (description) updatedProducts.description = description;
      if (price) updatedProducts.price = price;
      if (img) updatedProducts.img = img;
      if (points_required) updatedProducts.points_required = points_required;
      if (stock) updatedProducts.stock = stock;
      if (available) updatedProducts.available = available;
      if (approved) updatedProducts.approved = approved;


      // Guardar los cambios
      await updatedProducts.save();

      res.status(200).json({ message: "Producto actualizado exitosamente", products: updatedProducts });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el producto", error: error.message });
    }
  }
}

export default ProductsController;
