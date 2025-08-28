import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type WarehouseStockDocument = WarehouseStock & Document;

@Schema({
    timestamps: true
})
export class WarehouseStock {
    @Prop({ type: String, required: true })
    warehouseId!: string;

    @Prop({ required: true, default: 0, type: String })
    sku!: string;

    @Prop({ required: true, default: 0, min: 0, type: Number })
    onHand!: number;

    @Prop({ required: true, default: 0, min: 0, type: Number })
    reserved!: number;
}

export const WarehouseStockSchema = SchemaFactory.createForClass(WarehouseStock);
