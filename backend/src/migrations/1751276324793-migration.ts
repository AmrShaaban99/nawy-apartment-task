import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1751276324793 implements MigrationInterface {
    name = 'Migration1751276324793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "countryId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "countries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "iso" character varying, "phoneCode" character varying, "currency" character varying, "region" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fa1376321185575cf2226b1491d" UNIQUE ("name"), CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "apartment_media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" character varying NOT NULL, "apartment_id" uuid NOT NULL, CONSTRAINT "PK_b9744b58dda8fa58be36a87be8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_media_apartmentId" ON "apartment_media" ("apartment_id") `);
        await queryRunner.query(`CREATE TYPE "public"."apartments_status_enum" AS ENUM('available', 'rented', 'sold')`);
        await queryRunner.query(`CREATE TABLE "apartments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" text NOT NULL, "price" numeric(12,2) NOT NULL, "sizeInSquareMeters" integer NOT NULL, "numberOfRooms" integer NOT NULL, "numberOfBathrooms" integer NOT NULL, "isFurnished" boolean NOT NULL DEFAULT false, "hasBalcony" boolean NOT NULL DEFAULT false, "hasElevator" boolean NOT NULL DEFAULT false, "hasParking" boolean NOT NULL DEFAULT false, "hasSecurity" boolean NOT NULL DEFAULT false, "floorNumber" integer, "totalFloorsInBuilding" integer, "longitude" numeric, "latitude" numeric, "streetName" character varying, "streetNumber" character varying, "status" "public"."apartments_status_enum" NOT NULL DEFAULT 'available', "isActive" boolean NOT NULL DEFAULT true, "areaId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f6058e85d6d715dbe22b72fe722" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_apartment_isActive" ON "apartments" ("isActive") `);
        await queryRunner.query(`CREATE INDEX "IDX_apartment_createdAt" ON "apartments" ("createdAt") `);
        await queryRunner.query(`CREATE INDEX "IDX_apartment_hasParking" ON "apartments" ("hasParking") `);
        await queryRunner.query(`CREATE INDEX "IDX_apartment_isFurnished" ON "apartments" ("isFurnished") `);
        await queryRunner.query(`CREATE INDEX "IDX_apartment_areaId" ON "apartments" ("areaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_apartment_price" ON "apartments" ("price") `);
        await queryRunner.query(`CREATE TABLE "areas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cityId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5110493f6342f34c978c084d0d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cities" ADD CONSTRAINT "FK_b5f9bef6e3609b50aac3e103ab3" FOREIGN KEY ("countryId") REFERENCES "countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apartment_media" ADD CONSTRAINT "FK_b5d554bba5ee7d125e099afdb90" FOREIGN KEY ("apartment_id") REFERENCES "apartments"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "apartments" ADD CONSTRAINT "FK_5bf3455180690e14987b554cc82" FOREIGN KEY ("areaId") REFERENCES "areas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "areas" ADD CONSTRAINT "FK_56145036ce252af4f8e62631ed0" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "areas" DROP CONSTRAINT "FK_56145036ce252af4f8e62631ed0"`);
        await queryRunner.query(`ALTER TABLE "apartments" DROP CONSTRAINT "FK_5bf3455180690e14987b554cc82"`);
        await queryRunner.query(`ALTER TABLE "apartment_media" DROP CONSTRAINT "FK_b5d554bba5ee7d125e099afdb90"`);
        await queryRunner.query(`ALTER TABLE "cities" DROP CONSTRAINT "FK_b5f9bef6e3609b50aac3e103ab3"`);
        await queryRunner.query(`DROP TABLE "areas"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_apartment_price"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_apartment_areaId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_apartment_isFurnished"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_apartment_hasParking"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_apartment_createdAt"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_apartment_isActive"`);
        await queryRunner.query(`DROP TABLE "apartments"`);
        await queryRunner.query(`DROP TYPE "public"."apartments_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_media_apartmentId"`);
        await queryRunner.query(`DROP TABLE "apartment_media"`);
        await queryRunner.query(`DROP TABLE "countries"`);
        await queryRunner.query(`DROP TABLE "cities"`);
    }

}
