const express = require('express');
const mongoose = require('mongoose');
const Purchase = require('./purchaseModel'); // Asegúrate de que la ruta sea correcta

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('Conectado a la base de datos'))
.catch(err => console.error('No se pudo conectar a la base de datos', err));

// Endpoint para crear una nueva compra
app.post('/api/purchases', async (req, res) => {
    try {
        const { purchaseNumber, invoiceNumber, supplier, totalAmount, purchaseDate } = req.body;

        const newPurchase = new Purchase({
            purchaseNumber,
            invoiceNumber,
            supplier,
            totalAmount,
            purchaseDate
        });

        await newPurchase.save();
        res.status(201).json({ message: 'Compra creada exitosamente', purchase: newPurchase });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la compra' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
