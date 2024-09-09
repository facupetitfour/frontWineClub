import Coupon from "../models/couponSchema.js";

class CouponController {
  // Obtener todos los Cupones
  async handleGetAllItems(req, res) {
    try {
      const coupons = await Coupon.find()
      res.status(200).json(coupons);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los Cupones", error: error.message });
    }
  }

  // Obtener un cupon por ID
  async handleGetItem(req, res) {
    try {
      const { id } = req.params;
      const coupon = await Coupon.findById(id)
      if (!coupon) {
        return res.status(404).json({ message: "Cupon no encontrado" });
      }
      res.status(200).json(coupon);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el cupon", error: error.message });
    }
  }

  // Crear un nuevo cupon
  async handleCreateItem(req, res) {
    try {
      const { name, description, expiration_date, points_required, available, approved, bodega_id} = req.body;

      // Verificar si el cupon ya existen
      const existingCoupon = await Coupon.findOne({name:name});
      if (existingCoupon) {
        return res.status(400).json({ message: "El cupon ya existen." });
      }

      const newCoupon = new Coupon({name, description, expiration_date, points_required, available, approved, bodega_id});

      // Guardar el nuevo cupon en la base de datos
      const savedCoupon = await newCoupon.save();

      res.status(201).json({ message: "Cupon creado exitosamente", product: savedCoupon});
    } catch (error) {
      res.status(500).json({ message: "Error al registrar el cupon", error: error.message });
    }
  }

  // Eliminar un cupon por ID
  async handleDeleteItem(req, res) {
    try {
      const { id } = req.params;
      const deletedCoupon = await Coupon.findByIdAndDelete(id);
      if (!deletedCoupon) {
        return res.status(404).json({ message: "Cupon no encontrado" });
      }
      res.status(200).json({ message: "Cupon eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el cupon", error: error.message });
    }
  }

  // Actualizar un cupon por ID
  async handleUpdateItem(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, img, points_required, stock, available, approved} = req.body;

      // Buscar y actualizar el cupon
      const updatedCoupon = await Coupon.findById(id);
      if (!updatedCoupon) {
        return res.status(404).json({ message: "Cupon no encontrado" });
      }

      // Actualizar los campos
      if (name) updatedCoupon.name = name;
      if (description) updatedCoupon.description = description;
      if (price) updatedCoupon.price = price;
      if (img) updatedCoupon.img = img;
      if (points_required) updatedCoupon.points_required = points_required;
      if (stock) updatedCoupon.stock = stock;
      if (available) updatedCoupon.available = available;
      if (approved) updatedCoupon.approved = approved;


      // Guardar los cambios
      await updatedCoupon.save();

      res.status(200).json({ message: "Cupon actualizado exitosamente", coupon: updatedCoupon });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el cupon", error: error.message });
    }
  }
}

export default CouponController;
