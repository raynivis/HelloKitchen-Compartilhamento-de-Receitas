import { BaseEntity } from "@shared/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Category extends BaseEntity {
    @Column({unique: true})
    name: string;
}
