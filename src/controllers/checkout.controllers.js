const mercadopago = require("mercadopago");
const { Access_token } = require("../config/config");

// Configuración de Mercado Pago
mercadopago.configurations.configure({
  access_token: Access_token
});

const renderCheckoutPage = (req, res) => {
  res.render('checkout');
};

const createPreference = async (req, res) => {
  let preference = {
    items: [
      {
        title: req.body.title,
        unit_price: parseFloat(req.body.price),
        quantity: 1,
      },
    ],
    back_urls: {
      success: 'http://localhost:3000/checkout/success',
      failure: 'http://localhost:3000/checkout/failure',
      pending: 'http://localhost:3000/checkout/pending',
    },
    auto_return: 'approved',
  };

  try {
    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    res.status(500).send('Error al crear la preferencia');
  }
};

const success = (req, res) => {
  res.send('Pago exitoso');
};

const failure = (req, res) => {
  res.send('Pago fallido');
};

const pending = (req, res) => {
  res.send('Pago pendiente');
};

module.exports= {
    renderCheckoutPage,
    createPreference,
    success,
    failure,
    pending,
  };
