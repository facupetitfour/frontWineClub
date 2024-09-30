import User from "../models/userSchema.js";
// import jwt from 'jsonwebtoken';

class UserController {
  // Obtener todos los usuarios
  async handleGetAllItems(req, res) {
    try {
      const users = await User.find()
      // .populate('roles');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
    }
  }

  // Obtener un usuario por ID
  async handleGetItem(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id)
      // .populate('roles');
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
    }
  }


  // Obtener un usuario por username
  async handleGetItembyUsername(req, res) {
    try {
      const { username } = req.body;
      const user = await User.findOne({username:username, rol:"cliente"})
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
    }
  }

  // Crear un nuevo usuario
  async handleCreateItem(req, res) {
    try {
      const { username, email, password, name, subname, rol} = req.body;

      // Verificar si el usuario o el correo ya existen
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: "El usuario o correo ya existen." });
      }
      // Verifica si viene name y subname
      if(rol == "cliente"){
        if(!name){
          throw ("falta nombre")
        }
      }
      // Crear un nuevo usuario con la contraseña encriptada
      const newUser = new User({
        username,
        email,
        name,
        subname,
        rol,
        password: await User.encryptPassword(password),
      });


      // Guardar el nuevo usuario en la base de datos
      const savedUser = await newUser.save();

      res.status(201).json({ message: "Usuario creado exitosamente"});
    } catch (error) {
      res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
    }
  }

  // Eliminar un usuario por ID
  async handleDeleteItem(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el usuario", error: error.message });
    }
  }

  // Actualizar un usuario por ID
  async handleUpdateItem(req, res) {
    try {
      const { id } = req.params;
      const { username, email, password, name, subname } = req.body;

      // Buscar y actualizar el usuario
      const updatedUser = await User.findById(id);
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Actualizar los campos
      if (username) updatedUser.username = username;
      if (email) updatedUser.email = email;
      if (name) updatedUser.name = name;
      if (subname) updatedUser.subname = subname;
      if (password) updatedUser.password = await User.encryptPassword(password);

      // Guardar los cambios
      await updatedUser.save();

      res.status(200).json({ message: "Usuario actualizado exitosamente", user: updatedUser });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
    }
  }
  // Actualizar cargar puntos sumar
  async handleUpdatatePointsItem(req, res) {
    try {
      const { username, points} = req.body;
      let sumPoints = Number(points)
      // Buscar y actualizar el usuario
      const updatedUser = await User.findOne({username:username});
      if (!updatedUser) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Actualizar los campos
      if (username) updatedUser.username = username;
      if (sumPoints) updatedUser.points = (updatedUser.points + sumPoints);

      // Guardar los cambios
      await updatedUser.save();

      res.status(200).json({ message: "Usuario actualizado exitosamente", user: updatedUser });
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
    }
  }
}


export default UserController;
