import cron from "node-cron";
import Offer from "../models/Offer.js";

export default function setupExpiration(io) {
  cron.schedule("*/1 * * * *", async () => {
    const now = new Date();
    const expired = await Offer.updateMany(
      { status: "active", windowEnd: { $lt: now } },
      { status: "expired" }
    );
    // Para Mongoose >= 6, usa expired.modifiedCount
    const modified = expired.modifiedCount || expired.nModified || 0;
    if (modified > 0) {
      io.emit("offersExpired", { count: modified });
    }
  });
}
