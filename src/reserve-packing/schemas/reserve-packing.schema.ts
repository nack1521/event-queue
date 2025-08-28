import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ReservePackingDocument = ReservePacking & Document;

@Schema({
    timestamps: true
})
export class ReservePacking {
    @Prop({ type: String, required: true })
    orderId!: string;

    @Prop({ type: String, required: true })
    sku!: string;

    @Prop({ type: String, required: true })
    warehouseId!: string;

    @Prop({ required: true, min: 1, type: Number })
    qty!: number;
}

export const ReservePackingSchema = SchemaFactory.createForClass(ReservePacking);
