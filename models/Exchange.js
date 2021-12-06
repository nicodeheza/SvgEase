import mongoose from "mongoose";

const ExchangeSchema = new mongoose.Schema({
	exchange: {type: Number, required: true},
	expires: {type: Date, required: true}
});

export default mongoose.models.Exchange || mongoose.model("Exchange", ExchangeSchema);
