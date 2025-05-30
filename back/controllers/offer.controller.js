import Offer from "../models/Offer.js";

export const publishOffer = async (req, res) => {
  if (req.user.role !== "seller")
    return res.status(403).json({ error: "Acceso denegado" });
  const { quantityKwh, pricePerKwh, windowStart, windowEnd } = req.body;
  try {
    const offer = await Offer.create({
      seller: req.user.id,
      quantityKwh,
      pricePerKwh,
      windowStart,
      windowEnd,
    });
    await offer.save();

    res.status(201).json(offer);
    // Emitir evento en socket.io
    req.app.get("io").emit("offer:new", offer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creando oferta" });
  }
};
export const getActiveOffers = async (req, res) => {
  const now = new Date();
  try {
    const offers = await Offer.find({
      status: "active",
      windowStart: { $lte: now },
      windowEnd: { $gte: now },
    }).populate("seller", "email");
    console.log("Ofertas activas:", offers);
    res.json(offers);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener ofertas activas", error });
  }
};

export const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id).populate(
      "seller",
      "email"
    );
    if (!offer) return res.status(404).json({ error: "Oferta no encontrada" });
    res.json(offer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la oferta", error });
  }
};

export const buyOffer = async (req, res) => {
  try {
    const offerId = req.params.id;
    const buyerId = req.user.id;
    const now = new Date();

    // Intentar adquirir oferta activa dentro del rango válido
    const offer = await Offer.findOneAndUpdate(
      {
        _id: offerId,
        status: "active",
        windowStart: { $lte: now },
        windowEnd: { $gte: now },
      },
      {
        status: "sold",
        buyer: buyerId,
      },
      { new: true }
    );

    if (!offer) {
      return res
        .status(404)
        .json({ message: "La oferta no está disponible o ya fue comprada." });
    }

    return res.status(200).json({ message: "Compra exitosa", offer });

    await Transaction.create({
      offer: offer._id,
      buyer: req.user.id,
      seller: offer.seller,
      price: offer.pricePerKwh,
      quantity: offer.quantityKwh,
    });

    // emitir evento como antes
    const io = req.app.get("io");
    io.emit("offerBought", offer);

    return res.json({ offer });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al intentar comprar la oferta",
      error,
    });
  }
};
